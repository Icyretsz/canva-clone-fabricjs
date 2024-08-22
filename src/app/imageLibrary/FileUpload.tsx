'use client'
import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import Image from 'next/image'
// @ts-ignore
import {v4} from 'uuid';
import {useUser} from '@clerk/nextjs';
import {useMutation, useQueryClient, useQuery} from "@tanstack/react-query";
import addMedia from "@/app/db/addMedia";
import FetchMediaUrl from "@/app/db/fetch-media-url";
import {MediaType} from "@/app/db/type"
const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

interface DataType {
    data : MediaType[]
}

const FileUpload: React.FC = () => {
    const queryClient = useQueryClient()
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false)
    const [fileDbURLs, setFileDbURLs] = useState<string[]>([])
    const [s3Url, setS3Url] = useState<string[]>([]);
    const {user} = useUser();

    const { isPending, isError, data, error, refetch } = useQuery<DataType>({
        queryKey: ['media', user?.id],
        queryFn: () => FetchMediaUrl(user!.id),
        enabled: !!user,
    })

    useEffect(() => {
        if (data && JSON.stringify(data) !== JSON.stringify(fileDbURLs)) {
            console.log(data)
            const dbUrls = data.data.map((media: MediaType) => media.url)
            setFileDbURLs(dbUrls)
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

                        // const GETURLResponse = await fetch(`/api/upload/get?fileName=${fileName}`, {
                        //     method: 'GET',
                        // });
                        // const GETResponseURL = await GETURLResponse.json();
                        // if (GETURLResponse.ok && GETResponseURL.url) {
                        //     setFileURLs((prevURLs) => [
                        //         ...prevURLs,
                        //         GETResponseURL.url
                        //     ]);
                        // } else {
                        //     console.error('Failed to retrieve GET signed URL:', GETResponseURL.error || GETURLResponse.statusText);
                        // }
                        // console.log('File uploaded successfully');
                        // const s3Region = process.env.NEXT_PUBLIC_S3_BUCKET_REGION as string;
                        // const s3BucketName = process.env.NEXT_PUBLIC_S3_BUCKET as string;
                        // const url = `https://${s3BucketName}.s3.${s3Region}.amazonaws.com/${fileName}`
                        // setFileURL(url)
                    } else {
                        console.error('File upload failed');
                    }
                } else {
                    console.error('Failed to get upload URL:', PUTSignedURL.error);
                }
            } catch (error) {
                console.error('An error occurred during the upload:', error);
            }
        }
        setUploading(false)
        refetch()
    };

    return (
        <div>
            <h1>Upload a File</h1>
            <form onSubmit={handleFileUpload}>
                <div>
                    <input type="file" multiple onChange={handleFileChange}/>
                </div>
                <div>
                    <button className="bg-blue-200 text-black border border-black" type="submit">Upload</button>
                </div>
            </form>
            {uploading && <div>Uploading...</div>}
            {s3Url.length !== 0 &&
                s3Url.map((s3Url, i) => {
                    return <Image key={i} src={s3Url} width={400} height={400} alt='uploaded image'/>
                })
            }
        </div>
    );
};

export default FileUpload;
