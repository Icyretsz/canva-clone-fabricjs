'use client'
import React, {useState} from 'react';
import {AppType} from '@/app/api/[[...route]]/route'

const Page = () => {

    const [textContent, setTextContent] = useState<string>('')
    const [AIResponse, setAIResponse] = useState<string>('')

    const saveText = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextContent(e.currentTarget.value)
    }

    const callOpenAI = async () => {
        if (textContent === '') {
            return;
        }

        try {
            const response = await fetch('/api/magic-write/default', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ textContent }),
            });

            const responseJSON = await response.json();

            if (response.ok) {
                setAIResponse(responseJSON.AIResponse);
                console.log(responseJSON);
            } else {
                console.error('Failed to retrieve response:', responseJSON.message || response.statusText);
            }
        } catch (error) {
            console.error('Error while calling the API:', error);
        }
    };

    return (
        <div className='flex flex-col gap-5'>
            <textarea onChange={(e) => saveText(e)} className='border border-black'></textarea>
            <button onClick={callOpenAI}>Submit</button>
            {AIResponse !== "" && <div>{AIResponse}</div>}
        </div>
    );
};

export default Page;