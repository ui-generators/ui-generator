

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { auth, currentUser } from "@clerk/nextjs/server";
import { use, useEffect, useState } from "react";
import { Router, useRouter } from "next/router";

const ProfileFeed = async (props: { userId: string }) => {
  const id = props.userId;
  const userInterfaces = await prisma.interface.findMany({
    where: { authorId: id },
  });

  if (!userInterfaces) notFound();

  return (
    <>
      <div>
        {userInterfaces.map((ui) => (
          <div key={ui.id}>
            <h1>Interface</h1>
            <p>Interface: {ui.query}</p>
            <p>Author: {ui.authorId}</p>
            <p>Image: {ui.code}</p>
          </div>
        ))}
      </div>
    </>
  );
};

const ProfilePage: NextPage<{ username: string }> = async ({ username }) => {
  
    const user = await currentUser();


//   useEffect(() => {
//     fetchUser().then((fetchedUser) => {
//       setUser(fetchedUser);
//     });
//   }, [username]);

//   const fetchUser = async () => {
//     if (!clerkClient) {
//       throw new Error("clerkClient is undefined");
//     }

//     if (!clerkClient.users) {
//       throw new Error("users is undefined on clerkClient");
//     }

//     if (!clerkClient.users.getUser) {
//       throw new Error("getUser is undefined on clerkClient.users");
//     }

//     const user = await clerkClient.users.getUser(username);
//     return user;
//   };

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
