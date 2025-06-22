'use client';

import { ReactNode } from "react";
import Link from 'next/link';
import Image from 'next/image';
import bgImage from '../resources/images/bg_home.png';

const Main = ({ href = '/', hrefName = 'HOME', children }: { href?: string, hrefName?: string, children: ReactNode }) => {
    return (
        <main className="flex justify-center bg-gray-600">
            <Image
                src={bgImage}
                alt="Task Manager"
                className="blur-xl"
            />
            <div className='flex absolute flex-col'>
                <div className="flex-col justify-center border border-red-300 rounded-lg bg-clear shadow-lg p-8 px-40 mt-5">
                    <h1 className="text-4xl font-bold mb-2 text-red-300">Welcome to ETGBA</h1>
                    <p className="text-lg text-center text-blue-300 justify-center">Your personal task management application.</p>
                </div>
                {children}
            </div>
            <div className="m-4 md:m-6 w-full sm:w-auto min-w-[150px]">
                <Link href={href}
                    className="bg-clear border border-green-300 font-bold text-green-300 rounded p-2 md:p-3 block text-center sm:inline-block w-full sm:w-auto hover:bg-green-300 hover:text-white transition-colors">
                    {hrefName}
                </Link>
            </div>
        </main>
    );
};

export default Main;

