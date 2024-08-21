'use client'
import React, {useState, ChangeEvent, FormEvent} from 'react';
import  Image  from 'next/image'
// @ts-ignore
import {v4} from 'uuid';

const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

const FileUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false)
    const [fileURL, setFileURL] = useState('')

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const fileList = event.target.files;
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                if (!allowedTypes.includes(file.type)) {
                    alert('Invalid file type. Please upload a JPEG, PNG, or GIF image.');
                    event.target.value = ''
                    return;
                }
            }
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleFileUpload = async (event: FormEvent) => {
        event.preventDefault();
        if (uploading) {
            console.error('File upload is in process, please wait')
            return;
        }
        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        setUploading(true);
        const fileName = `${v4()}-${selectedFile.name}`

        try {
            const PUTURLResponse = await fetch('/api/upload/put', {
                method: 'POST',
                headers: {
                    'Content-Type': selectedFile.type,
                },
                body: JSON.stringify({ fileName: fileName }),
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
                    const GETURLResponse = await fetch(`/api/upload/get?fileName=${fileName}`, {
                        method: 'GET',
                    });
                    const GETResponseURL = await GETURLResponse.json();
                    if (GETURLResponse.ok && GETResponseURL.url) {
                        setFileURL(GETResponseURL.url);
                    } else {
                        console.error('Failed to retrieve signed URL:', GETResponseURL.error || GETURLResponse.statusText);
                    }
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
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h1>Upload a File</h1>
            <form onSubmit={handleFileUpload}>
                <div>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div>
                    <button className="bg-blue-200 text-black border border-black" type="submit">Upload</button>
                </div>
            </form>
            {selectedFile && <p>Selected file: {selectedFile.name}</p>}
            {uploading && <div>Uploading...</div> }
            {fileURL !== "" && <Image src={fileURL} width={400} height={400} alt='uploaded image'/>}
        </div>
    );
};

export default FileUpload;
