'use client'
import React, {useState, ChangeEvent, FormEvent} from 'react';
import {AppType} from '../api/[[...route]]/route'
const FileUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleFileUpload = async (event: FormEvent) => {
        event.preventDefault();
        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        setUploading(true);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fileName: selectedFile.name }),
            });

            const data = await response.json();
            console.log(data)
            if (response.ok && data.url) {
                const uploadResponse = await fetch(data.url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': selectedFile.type,
                    },
                    body: selectedFile,
                });

                if (uploadResponse.ok) {
                    console.log('File uploaded successfully');
                } else {
                    console.error('File upload failed');
                }
            } else {
                console.error('Failed to get upload URL:', data.error);
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
        </div>
    );
};

export default FileUpload;
