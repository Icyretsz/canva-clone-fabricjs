'use client'
import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
// @ts-ignore
import {v4} from 'uuid';
import {useUser} from '@clerk/nextjs';
import {useMutation, useQueryClient, useQuery} from "@tanstack/react-query";
import addMedia from "@/app/db/addMedia";
import FetchMediaUrl from "@/app/db/fetch-media-url";
import {MediaType} from "@/app/db/type"
import {Button} from "@/components/ui/button"
import DisplayImage from "@/features/editor/sidebar/components/display-image";
import {Editor} from "@/features/editor/sidebar/types";
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
        queryFn: () => FetchMediaUrl(user!.id),
        enabled: !!user,
    })

    useEffect(() => {
        if (data) {
            const dbUrls = data.data.map((media: MediaType) => media.url)
            dbUrls.map((url : string) => {
                getImgFromUrl(url)
            })
        }
    }, [data])

    const mutation = useMutation({
        mutationFn: addMedia,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['media']})
        },
    })

    const getImgFromUrl = async (fileName : string) => {
        const GETURLResponse = await fetch(`/api/upload/get?fileName=${fileName}`, {
            method: 'GET',
        });
        const GETResponseURL = await GETURLResponse.json();
        if (GETURLResponse.ok && GETResponseURL.url) {
            setS3Url((prevURLs) => [
                ...prevURLs,
                GETResponseURL.url
            ]);
            setLoadingStates((prevStates) => [...prevStates, true]);
        } else {
            console.error('Failed to retrieve GET signed URL:', GETResponseURL.error || GETURLResponse.statusText);
        }
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const fileList = event.target.files;
            const fileArray = Array.from(fileList)
            for (let i = 0; i < fileArray.length; i++) {
                const file = fileArray[i];
                if (!allowedTypes.includes(file.type)) {
                    alert('Invalid file type. Please upload a JPEG, PNG, or GIF image.');
                    event.target.value = ''
                    return;
                }
            }
            setSelectedFiles(fileArray);
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
        for (const selectedFile of selectedFiles) {

            const fileName = `${v4()}-${selectedFile.name}`

            try {
                const PUTURLResponse = await fetch('/api/upload/put', {
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
                        mutation.mutate({
                            user_id: user!.id,
                            url: fileName,
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
        }
        setUploading(false)
        refetch()
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
                    <Button className="bg-blue-200 text-black border border-black" type="submit">Upload</Button>
                </div>
            </form>
            {uploading && <div>Uploading...</div>}
            <div className='flex flex-wrap gap-[5px]'>
                <DisplayImage s3Url={s3Url} loadingStates={loadingStates} handleImageLoad={handleImageLoad} editor={editor}/>
            </div>
        </div>
    );
};

export default FileUpload;
