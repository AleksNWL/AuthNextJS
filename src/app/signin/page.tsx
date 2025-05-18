'use client';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Вход</h1>
            <button
                onClick={() => signIn('github', { callbackUrl: '/' })}
                className="bg-black text-white px-4 py-2 rounded"
            >
                Войти через GitHub
            </button>
        </div>
    );
}
