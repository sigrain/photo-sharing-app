"use client"
import React, { useState, useEffect } from 'react';
import { getPosts } from "@/app/lib/firebase";
import 'firebase/storage';
import { Card, Image, Avatar, CardFooter, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Feed({ posts }: { posts: any }) {
    return(
        <main className="p-10 flex justify-center">
        <div className="content-center gap-3 columns-5">
        <p className="mb-5"></p>
        {
            posts.map((item: any) => {
                return (
                    <React.Fragment key={item.id}>
                    <p className="mt-3"></p>
                    <Card className="border-none shadow-none" radius="none">
                        <Image src={item.url} width={300} className="object-cover rounded-xl basis-1/3" />
                        <p className="ml-1 mt-2 text-md text-align-center font-bold">{item.title}</p>
                        <li className="ml-2 mt-2 flex items-center">
                            <Avatar src={item.icon} className="w-7 h-7" />
                            <p className="ml-3 text-sm text-align-center">{item.username}</p>
                        </li>
                    </Card>
                    <p className="mb-7"></p>
                    </React.Fragment>
                )
            })
        }
        </div>
        </main>
    )
}