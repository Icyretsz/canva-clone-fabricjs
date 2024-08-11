'use client'
import React, {useEffect, useState} from 'react';
import {ImagesType} from "@/app/api/[[...route]]/images";

const Page = () => {
    const [data, setData] = useState<ImagesType[]>([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/images')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])

    return (
        <div>
            {isLoading ? <div>Loading...</div> :
            data?.map((item) => (
                <img key={item.id} src={item.url} alt="image"/>
            ))}
        </div>
    );
};

export default Page;