"use client";



import { clerkClient } from "@clerk/nextjs";
import { users } from "@clerk/nextjs/api";
import { NextPage } from "next";

export const dynamic = "force-dynamic";


const ProfileFeed = (props: {userId: string}) => {
    
    return (
        <>
        </>
     );
}


const ProfilePage: NextPage<{username: string}> = ({username}) => {

   

    return (
    <>
    </>);
    
}

async function getData() {
    const users = (
                await clerkClient.users.getUserList({
                limit: 200,
                })
            )
    return { users };
}

export default async function Page() {
    const { users } = await getData();

    return (
        <main className="flex min-h-screen flex-col justify-between p-10">
            <div>
                {users.map((user) => (
                    <div key={user.id} className="flex items-center space-x-4">
                        Name: {user.firstName} {user.lastName}
                    </div>
                ))}
            </div>

        </main>
    );
}