'use client';
import { useSession, signOut } from 'next-auth/react';

export default function Dashboard() {
    const { data: session } = useSession();
    if (!session) return <div className="p-4">Вы не авторизованы</div>;
    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Привет, {session.user?.name}</h1>
            <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded">Выйти</button>
        </div>
    );
}