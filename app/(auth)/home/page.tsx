"use client"
import React, { useState, useEffect } from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button} from "@nextui-org/react";
import {NotificationIcon} from "./NotificationIcon";
import { Badge } from "@nextui-org/react";
import CreatePost from "./create-post";
import Feed from "./feed";
import Explore from "@/app/(auth)/explore/page";
import { getProfileIcon, getPosts } from "@/app/lib/firebase";

export default function Home() {
    const [image, setImage] = useState<string>();
    const [posts, setPosts] = useState<any[]>([]);
    const [showItems, setShowItems] = useState<any[]>([]);
    const [screen, setScreen] = useState('Home');

    useEffect(() => {
        const fetchImage = async() => {
            const icon = await getProfileIcon();
            setImage(icon);
            const data = await getPosts();
            setPosts(data);
        }

        fetchImage();
    })

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const result = posts.filter((item) => {
            return item.title.toLowerCase().match(e.target.value.toLowerCase());
        });
        setShowItems(result);
        setScreen('Search');
    }

    const clickHome = () => {
        setScreen('Home');
    }

    const clickExplore = () => {
        setScreen('Explore');
    }

    return (
        <div>
        <Navbar isBordered>
            <NavbarContent className="hidden sm:flex" justify="start">
                <NavbarItem>
                    <Button onPress={clickHome} variant="ghost" className="border-none">
                        {screen !== 'Home' && <h1 className="font-semibold">Home</h1>}
                        {screen === 'Home' && <h1 className="font-semibold underline underline-offset-8">Home</h1>}
                    </Button>
                </NavbarItem>
                <p className="ml-2"></p>
                <NavbarItem>
                    <Button onPress={clickExplore} variant="ghost" className="border-none">
                        {screen !== 'Explore' && <h1 className="font-semibold">Explore</h1>}
                        {screen === 'Explore' && <h1 className="font-semibold underline underline-offset-8">Explore</h1>}
                    </Button>
                </NavbarItem>
                <p className="ml-3"></p>
                <NavbarItem>
                    <CreatePost />
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="center">
                <Input radius="full" size="md" placeholder=" search.." labelPlacement="outside" className="max-w-xs" onChange={handleSearch}/>
            </NavbarContent>
            <NavbarContent as="div" className="items-center" justify="end">
                <NavbarItem>
                    <Badge color="danger" content={5} shape="circle">
                    <Button
                    radius="full"
                    isIconOnly
                    aria-label="more than 99 notifications"
                    variant="light"
                    >
                    <NotificationIcon size={25} width={25} height={25} />
                    </Button>
                    </Badge>
                </NavbarItem>
                <p className="ml-5"></p>
                <NavbarItem>
                    <div className="flex gap-4 items-center">
                    <Avatar isBordered color="danger" src={image} />
                    </div>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
        <div>
            {screen === 'Home' && <Feed posts={posts} />}
            {screen === 'Search' && <Feed posts={showItems}/>}
            {screen === 'Explore' && <Explore />}
        </div>
        </div>
    )
}