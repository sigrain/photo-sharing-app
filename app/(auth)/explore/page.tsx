"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@nextui-org/react";

export default function Explore() {

    return (
        <div>
        <h1 className="mt-20 mb-10 text-3xl font-semibold flex justify-center">Are you looking for</h1>
        <main className="p-10 flex justify-center">
        <div className="content-center gap-3 ml-5">
        <Button className="ml-3 mt-3 w-80 h-48 bg-[url('/images/Interia.jpg')] bg-center brightness-95">
            <h1 className="text-xl text-white font-semibold">Interia</h1>
        </Button>
        <Button className="ml-3 mt-3 w-80 h-48 bg-[url('/images/Fashion.jpg')] bg-center brightness-95">
            <h1 className="text-xl text-white font-semibold">Fashion</h1>
        </Button>
        <Button className="ml-3 mt-3 w-80 h-48 bg-[url('/images/Lofi.jpeg')] bg-center brightness-95">
            <h1 className="text-xl text-white font-semibold">Lofi</h1>
        </Button>
        <Button className="ml-3 mt-3 w-80 h-48 bg-[url('/images/Gourmet.jpg')] bg-center brightness-95">
            <h1 className="text-xl text-white font-semibold">Gourmet</h1>
        </Button>
        <Button className="ml-3 mt-3 w-80 h-48 bg-[url('/images/Nature.jpg')] bg-center brightness-95">
            <h1 className="text-xl text-white font-semibold">Nature</h1>
        </Button>
        <Button className="ml-3 mt-3 w-80 h-48 bg-[url('/images/Spring.jpg')] bg-center brightness-95">
            <h1 className="text-xl text-white font-semibold">Spring</h1>
        </Button>
        </div>
        </main>
        </div>
    )
}