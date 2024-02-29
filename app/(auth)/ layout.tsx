"use client"
import { useRouter } from "next/navigation"
import { UserAuth } from "../context/AuthContext"
import { useEffect, useState } from 'react'

export default function HomescreenLayout({
    children
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const { user, loading } = UserAuth();

    useEffect(() => {
        if (user == null && !loading) {
            router.push('/signin')
        }
    })

    return user == null ? null : (
        <div className="flex h-full">
            <nav className="w-60 bg-white shadow-lg h-screen absolute top-0 left-0 fixed">
                <li className="w-screen h-14 flex bg-black shadow-sm absolute top-0 left-0 fixed"></li>
                <ul className="w-56 ml-4 flex flex-col h-full">
                <li className="w-52 h-10 flex justify-center items-center rounded">
                    <p>Create</p>
                </li>
                </ul>
            </nav>
            <div className="flex-grow absolute left-60 right-0">
                <div className="absolute left-10 right-10">
                    {children}
                </div>
            </div>
        </div>
    )
}