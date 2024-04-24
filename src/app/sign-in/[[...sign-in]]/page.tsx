import { SignIn } from "@clerk/nextjs";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-full max-w-md">
        <SignIn
          
        />
      </div>
    </div>
  );
}