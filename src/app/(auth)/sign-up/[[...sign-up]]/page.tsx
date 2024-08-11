import {SignUp, ClerkLoaded, ClerkLoading} from "@clerk/nextjs";
import {Loader2} from 'lucide-react';
import Image from 'next/image'

export default function Page() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="h-full lg:flex flex-col items-center justify-center gap-5">
                <div className="text-center space-y-4 pt-16">
                    <h1 className="font-bold text-3xl text-[#2E2A47]">
                        Create new account
                    </h1>
                </div>
                <div className="flex items-center justify-center mt-8">
                    <ClerkLoaded>
                        <SignUp path="/sign-up"/>
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className="animate-spin text-muted-foreground"></Loader2>
                    </ClerkLoading>
                </div>
            </div>
            <div>
                <div className="h-full hidden lg:flex items-center justify-center bg-[#dee1dc]">
                    <Image src="/logo.webp" height={200} width={200} alt="Login Image"/>
                </div>
            </div>
        </div>
    )
}