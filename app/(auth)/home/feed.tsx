"use client"
import React, { useState, useEffect } from 'react';
import { getPosts } from "@/app/lib/firebase";
import 'firebase/storage';
import {Card, CardHeader, CardBody, Image, CardFooter} from "@nextui-org/react";
import {Avatar} from "@nextui-org/react";

export default function Feed() {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            const data = await getPosts();
            setPosts(data);
        }

        fetchImages();
    })

    return(
        <main className="p-10 flex justify-center">
        <div className="content-center gap-3 columns-5">
        <p className="mb-5"></p>
        {
            posts.map((item: any) => {
                return (
                    <div className="basis-1/3">
                    <p className="mt-3"></p>
                    <Card>
                    <Image src={item.url} width={300} className="object-cover rounded-md basis-1/3" />
                    <CardFooter>
                    <li className="flex items-center">
                        <Avatar src={item.icon} size="sm" />
                        <p className="ml-3 text-md text-align-center">{item.title}</p>
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