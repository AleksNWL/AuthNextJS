'use client';
import Link from 'next/link';
import { SessionProvider, useSession, signOut } from 'next-auth/react';
import { ReactNode } from 'react';
import Loader from "@/components/loader";

function AuthStatus() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <Loader/>;
    }

    if (session?.user) {
        return (
            <div className="flex items-center space-x-4 p-4 rounded">
                <img
                    src={session.user.image || '/default-avatar.png'}
                    alt="Аватар"
                    className="w-10 h-10 rounded-full"
                />
                <span>{session.user.name || session.user.email}</span>
                <button
                    onClick={() => signOut()}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                >
                    Выйти
                </button>
            </div>
        );
    }

    return (
        <Link href="/signin">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Войти</button>
        </Link>
    );
}

export default function SessionWrapper({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <div>
                <AuthStatus />
                {children}
            </div>
        </SessionProvider>
    );
}
