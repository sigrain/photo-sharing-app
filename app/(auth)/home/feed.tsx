"use client"
import React, { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { displayImages } from "@/app/lib/firebase";
import 'firebase/storage';
import {Card, CardHeader, CardBody, Image, CardFooter} from "@nextui-org/react";
import {Avatar} from "@nextui-org/react";

export default function Feed() {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            const urls = await displayImages();
            setImages(urls);
        }

        fetchImages();
    })

    return(
        <main className="p-10 flex justify-center">
        <div className="content-center gap-3 columns-5">
        <p className="mb-5"></p>
        {
            images.map((item: string) => {
                return (
                    <div className="basis-1/3">
                    <p className="mt-3"></p>
                    <Card>
                    <Image src={item} width={300} className="object-cover rounded-md basis-1/3" />
                    <CardFooter>
                    <li className="flex items-center">
                        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="sm" />
                        <p className="ml-3 text-md text-align-center">Title</p>
                    </li>
                    </CardFooter>
                    </Card>
                    <p className="mb-7"></p>
                    </div>
                )
            })
        }
        </div>
        </main>
    )
}