'use client'
import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
// @ts-ignore
import {v4} from 'uuid';
import {useUser} from '@clerk/nextjs';
import {useMutation, useQueryClient, useQuery} from "@tanstack/react-query";
import {insertMediaToDb, fetchMediaFromDb, deleteMediaFromDb} from "@/app/db/mediaDbManipulate";
import {MediaType} from "@/app/db/type"
import {Button} from "@/components/ui/button"
import DisplayImage from "@/features/editor/sidebar/components/display-image";
import {Editor} from "@/features/editor/sidebar/types";
import {Loader2} from "lucide-react";
import Resizer from "react-image-file-resizer";

const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

interface DataType {
    data : MediaType[]
}

interface UploadProps {
    editor : Editor | undefined
}


const FileUpload = ({ editor } : UploadProps) => {
    const queryClient = useQueryClient()
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false)
    const [s3Url, setS3Url] = useState<string[]>([]);
    const [loadingStates, setLoadingStates] = useState<boolean[]>([]);
    const {user} = useUser();

    const { isPending, isError, data, error, refetch } = useQuery<DataType>({
        queryKey: ['media', user?.id],
        queryFn: () => fetchMediaFromDb(),
        enabled: !!user,
    })

    useEffect(() => {
        if (data) {
            const dbUrls = data.data.map((media: MediaType) => media.fileName)
            dbUrls.map((fileName : string) => {
                getImgUrlFromName(fileName)
            })
        }
    }, [data])

    const mutationAddMediaDb = useMutation({
        mutationFn: insertMediaToDb,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['media']})
        },
    })

    const mutationDelMediaDb = useMutation({
        mutationFn: deleteMediaFromDb,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['media']})
        },
    })

    const resizeFile = (file : File) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                1280,
                720,
                "JPEG",
                90,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });

    const getImgUrlFromName = async (fileName : string) => {
        // const GETURLResponse = await fetch(`/api/upload/get?fileName=${fileName}`, {
        //     method: 'GET',
        // });
        // const GETResponseURL = await GETURLResponse.json();
        // if (GETURLResponse.ok && GETResponseURL.url) {
        //     setS3Url((prevURLs) => [
        //         ...prevURLs,
        //         GETResponseURL.url
        //     ]);
        //     setLoadingStates((prevStates) => [...prevStates, true]);
        // } else {
        //     console.error('Failed to retrieve GET signed URL:', GETResponseURL.error || GETURLResponse.statusText);
        // }
         const s3Region = process.env.NEXT_PUBLIC_S3_BUCKET_REGION as string;
         const s3BucketName = process.env.NEXT_PUBLIC_S3_BUCKET as string;
         const url = `https://${s3BucketName}.s3.${s3Region}.amazonaws.com/${fileName}`
        setS3Url((prevURLs) => [
            ...prevURLs,
            url
        ]);
        setLoadingStates((prevStates) => [...prevStates, true]);
    }

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const fileList = event.target.files;
            const fileArray = Array.from(fileList)
            const resizedFileArray: File[] = []
            for (let i = 0; i < fileArray.length; i++) {
                const file = fileArray[i];
                if (!allowedTypes.includes(file.type)) {
                    alert('Invalid file type. Please upload a JPEG, PNG, or GIF image.');
                    event.target.value = ''
                    return;
                }
                const resizedFile : File = await resizeFile(file) as File
                resizedFileArray.push(resizedFile)
            }
            setSelectedFiles(resizedFileArray);
        }
    };

    const handleFileUpload = async (event: FormEvent) => {
        event.preventDefault();
        if (uploading) {
            console.error('File upload is in process, please wait')
            return;
        }
        if (selectedFiles.length === 0) {
            console.error('No file selected');
            return;
        }

        setUploading(true);
        const uploadPromises = selectedFiles.map(async (selectedFile) => {

            const fileName = `${v4()}-${selectedFile.name}`

            try {
                const PUTURLResponse = await fetch('/api/media/put', {
                    method: 'POST',
                    headers: {
                        'Content-Type': selectedFile.type,
                    },
                    body: JSON.stringify({fileName: fileName}),
                });

                const PUTSignedURL = await PUTURLResponse.json();
                if (PUTURLResponse.ok && PUTSignedURL.url) {
                    const uploadResponse = await fetch(PUTSignedURL.url, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': selectedFile.type,
                        },
                        body: selectedFile,
                    });

                    if (uploadResponse.ok) {
                        mutationAddMediaDb.mutate({
                            user_id: user!.id,
                            fileName: fileName,
                        })
                        setS3Url([])
                    } else {
                        console.error('Add to database failed');
                    }
                } else {
                    console.error('Failed to upload ', PUTSignedURL.error);
                }
            } catch (error) {
                console.error('An error occurred during the upload:', error);
            }
        })
            try {
                await Promise.all(uploadPromises);
                console.log('All files have been uploaded successfully');
            } catch (error) {
                console.error('An error occurred during one of the uploads:', error);
            }
        setUploading(false)
        setTimeout(() => {
            refetch();
        }, 500);

    };

    const deleteOnS3 = async (fileSelected : string[]) => {

        await Promise.all(fileSelected.map(async (fileName) => {
            try {
                const DELURLResponse = await fetch(`/api/media/delete?fileName=${encodeURIComponent(fileName)}`, {
                    method: 'POST',
                });

                const DELSignedURL = await DELURLResponse.json();
                if (DELURLResponse.ok && DELSignedURL.url) {
                    const deleteResponse = await fetch(DELSignedURL.url, {
                        method: 'DELETE',
                    });
                    if (deleteResponse.ok) {
                        console.log('delete successful')
                        mutationDelMediaDb.mutate(fileName)
                    } else {
                        console.log('error on deletetion')
                    }
                } else {
                    console.error('Failed to delete, something wrong with delete presigned URL', DELSignedURL.error);
                }
            } catch (error) {
                console.error('An error occurred during the deletion:', error);
            }
        }))
    };

    const handleImageLoad = (index: number) => {
        setLoadingStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = false;
            return newStates;
        });
    };

    return (
        <div>
            <h1>Upload a Media</h1>
            <form onSubmit={handleFileUpload}>
                <div>
                    <input type="file" multiple onChange={handleFileChange}/>
                </div>
                <div>
                    {uploading ? <Button className="bg-blue-200 text-black border border-black" type="submit">Uploading... <Loader2 className="animate-spin text-muted-foreground" /></Button>
                     : <Button className="bg-blue-200 text-black border border-black" type="submit">Upload</Button>}
                </div>
            </form>
            <div>
                <DisplayImage s3Url={s3Url} setS3Url={setS3Url} deleteOnS3={deleteOnS3} loadingStates={loadingStates} handleImageLoad={handleImageLoad} editor={editor}/>
            </div>
        </div>
    );
};

export default FileUpload;
