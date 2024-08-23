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
import {Loader2} from 'lucide-react';
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
    const [loadingStates, setLoadingStates] = useState<boolean[]>([]);
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

    const handleImageLoad = (index: number) => {
        setLoadingStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = false;
            return newStates;
        });
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
            <div className='flex'>
                {s3Url.map((url, i) => (
                    <div key={i} style={{position: 'relative', width: '400px', height: '400px'}}>
                        {loadingStates[i] && (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#f0f0f0',
                                zIndex: 1,
                            }}>
                                <Loader2 className="animate-spin text-muted-foreground"></Loader2>
                            </div>
                        )}
                        <Image
                            src={url}
                            width={400}
                            height={400}
                            alt="uploaded image"
                            onLoadingComplete={() => handleImageLoad(i)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUpload;
