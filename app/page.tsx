'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Film } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
export default function Home() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-500 to-gray-800 text-white flex flex-col">
            <div className="relative w-full h-[450px]">
                <Image
                    src="/images/movie1.jpg"
                    alt="MoviePulse Banner"
                    fill
                    priority
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
            </div>

            <div className="text-center max-w-2xl mx-auto mt-10">
                <Film className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h1 className="text-4xl font-bold mb-6">Welcome to MoviePulse</h1>
                <p className="text-lg mb-8 text-gray-300">
                    Keep your favorite films in one place.
                </p>
                <div className="space-x-4">
                    <Button
                        onClick={() => router.push('/auth/login')}
                        variant="default"
                        size="lg"
                        className="bg-black text-white border-2 border-white px-6 py-3 rounded-lg hover:bg-gray-900"
                    >
                        Sign In
                    </Button>
                    <Button
                        onClick={() => router.push('/auth/register')}
                        variant="outline"
                        size="lg"
                        className="bg-[#800020] hover:bg-[#9b2242] text-white border-white px-6 py-3 rounded-lg"
                    >
                        Register
                    </Button>
                </div>
            </div>

        </div>
    );
}
