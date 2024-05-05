

import React from "react";
import StoreProvider from "./StoreProvider";
import Landing from "../pages/landing";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";

const Home: React.FC = async () => {
   

    const user = await currentUser();

    if (!user) {
        return (
            <>
                <SignInButton/>
            </>
        );
    }

    return (
        <StoreProvider>
            <div className="pr-2 w-10 h-auto relative inline-block cursor-pointer">
                <Link href={`../profile/${user.id}`}>
                    <Image
                        src={user.imageUrl}
                        alt={`@${user.firstName}'s profile picture`}
                        className="h-14 w-14 rounded-full"
                        width={56}
                        height={56}
                    />
                </Link>
                {/* <div className="">
          <SignOutButton>
            <button className="" >
              Sign out
            </button>
          </SignOutButton>
        </div> */}
            </div>
            <Landing />
        </StoreProvider>
    );
};

export default Home;
