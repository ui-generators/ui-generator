

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";

interface Interface {
  id: string;
  query: string;
  code: string;
  // Add other properties if necessary
}

const ProfileFeed = async (props: { userId: string }) => {
    const id = props.userId;
    const userInterfaces = await prisma.interface.findMany({
        where: { authorId: id },
    });

    if (!userInterfaces) notFound();
  
    return (
        <>
            <div>
                {userInterfaces.map((ui: Interface) => (
                    <div key={ui.id}>
                        <h2>Interface: {ui.query}</h2>
                        <p>Code: </p>
                        <pre className="language-javascript">
                            <code>{ui.code}</code>
                        </pre>
                    </div>
                ))}
            </div>
        </>
    );
};

const ProfilePage: NextPage = async () => {
  
    const user = await currentUser();

    if (!user) {

        return <div>Loading...</div>;
    }

    return (
        <>
            <Head>
                <title>
                    {user
                        ? user.username ?? user.externalAccounts[0].username
                        : "Loading..."}
                </title>
            </Head>
            <>
                {/* If we want to have a background image, we would set it here */}
                <div className="relative h-48 bg-blue-850">
                    <Image
                        src={user.imageUrl}
                        alt={`${
                            user.username ?? user.externalAccounts[0].username ?? "unknown"
                        }'s profile pic`}
                        width={120}
                        height={120}
                        className="absolute bottom-0 left-0 -mb-[60px] ml-8 rounded-full border-4 border-black"
                    />
                </div>
                <div className="h-[80px]"></div>
                <div className="p-4 text-2xl font-bold">{`@${
                    user.username ?? user.externalAccounts[0].username ?? "unknown"
                }`}</div>
                <div className="border-b border-slate-400 w-full" />
                <ProfileFeed userId={user.id} />
            </>
        </>
    );
};

export default ProfilePage;
