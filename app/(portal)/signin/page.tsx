"use client"
import React from "react";
import { login } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import { Input, Button } from "@nextui-org/react";

export default function SignIn() {
    const router = useRouter();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function handleSignIn() {
        try {
            await login(email ?? "", password ?? "");
            router.push('/home');
        } catch(error) {
            console.log(error);
        }
    }

    function handleSignUp() {
        try {
            router.push('./signup');
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <main className="p-10 flex h-full">
            <div className='w-screen flex justify-center items-center'>
            <div className='basis-1/3'>
            <p className="mt-20"></p>
            <h1 className="mb-5 text-3xl font-extrabold">Welcome back!</h1>
            <p className="mb-5"></p>
            <Input type="email" label="email" value={email} onValueChange={setEmail} />
            <p className="mb-3"></p>
            <Input type="password" label="password" value={password} onValueChange={setPassword} />
            <p className="mb-7"></p>
            <Button className="w-full p-2 border mb-5" color="primary" onClick={handleSignIn}>SignIn</Button>
            <Button className="w-full p-2 border mb-5" color="default" onClick={handleSignUp}>SignUp</Button>
            </div>
            </div>
        </main>
    )
}