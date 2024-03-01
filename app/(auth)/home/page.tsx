"use client"
import React, { useState, useEffect } from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button} from "@nextui-org/react";
import {NotificationIcon} from "./NotificationIcon";
import { Badge } from "@nextui-org/react";
import CreatePost from "./create-post";
import Feed from "./feed";
import { getIcon } from "@/app/lib/firebase";

export default function Home() {
    const [image, setImage] = useState<string>();

    useEffect(() => {
        const fetchImage = async() => {
            const icon = await getIcon();
            setImage(icon);
        }

        fetchImage();
    })

    return (
        <div>
        <Navbar isBordered>
            <NavbarContent className="hidden sm:flex" justify="start">
                <NavbarItem>
                    <Link color="foreground" href="#" size="md">
                        Home
                    </Link>
                </NavbarItem>
                <p className="ml-5"></p>
                <NavbarItem>
                    <Link color="foreground" href="#" aria-current="page" size="md">
                        Explore
                    </Link>
                </NavbarItem>
                <p className="ml-3"></p>
                <NavbarItem>
                    <CreatePost />
                </NavbarItem>
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
        <Feed />
        </div>
    )
}