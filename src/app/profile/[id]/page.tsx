"use client";

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { clerkClient } from "@clerk/nextjs";
import { users } from "@clerk/nextjs/api";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

export const dynamic = "force-dynamic";

const ProfileFeed = async (props: { userId: string }) => {
  const id = props.userId;
  const userInterface = await prisma.interface.findMany({
    where: { authorId: id },
  });

  if (!userInterface) notFound();

  return (
    <>
      <div>
        {userInterface.map((ui) => (
          <div key={ui.id}>
            <h1>Interface</h1>
            <p>Interface: {ui.query}</p>
            <p>Author: {ui.authorId}</p>
            <p>Image: {ui.imageUrl}</p>
          </div>
        ))}
      </div>
    </>
  );
};

const ProfilePage: NextPage<{ username: string }> = async ({ username }) => {
  const [user] = await clerkClient.users.getUserList({
    username: [username],
  });

  if (!user) {
    // if we hit here we need a unsantized username so hit api once more and find the user.
    const users = await clerkClient.users.getUserList({
      limit: 200,
    });
    const user = users.find((user) =>
      user.externalAccounts.find((account) => account.username === username)
    );
    if (!user) {
      return notFound();
    }
  }

  return (
    <>
      <Head>
        <title>{user.username ?? user.externalAccounts[0].username}</title>
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