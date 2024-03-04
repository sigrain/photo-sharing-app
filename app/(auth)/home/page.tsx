"use client"
import React, { useState, useEffect } from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button} from "@nextui-org/react";
import {NotificationIcon} from "./NotificationIcon";
import { Badge } from "@nextui-org/react";
import CreatePost from "./create-post";
import Feed from "./feed";
import Explore from "@/app/(auth)/explore/page";
import { getProfileIcon, getPosts, logout, getUserEmail } from "@/app/lib/firebase";
import { useRouter } from "next/navigation"

export default function Home() {
    const router = useRouter();

    const [image, setImage] = useState<string>();
    const [posts, setPosts] = useState<any[]>([]);
    const [showItems, setShowItems] = useState<any[]>([]);
    const [screen, setScreen] = useState('Home');
    const [email, setEmail] = useState();

    useEffect(() => {
        const fetchData = async() => {
            const icon = await getProfileIcon();
            setImage(icon);
            const email = await getUserEmail();
            setEmail(email);
            const data = await getPosts();
            setPosts(data);
        }

        fetchData();
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

    const handleLogout = async() => {
        await logout();
        router.push('/signin');
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
                    <Dropdown placement="top-end">
                        <DropdownTrigger>
                            <Avatar isBordered color="danger" src={image} />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{email}</p>
                            </DropdownItem>
                            <DropdownItem key="settings">Settings</DropdownItem>
                            <DropdownItem key="help_and_feedback">
                                Help & Feedback
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
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