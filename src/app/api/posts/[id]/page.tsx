'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import type { Post } from '@/types/types';

export default function PostPage() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comment, setComment] = useState('');
    const { data: session } = useSession();

    useEffect(() => {
        fetch(`/api/posts/${id}`).then(res => res.json()).then(setPost);
    }, [id]);

    const submitComment = async () => {
        await fetch(`/api/posts/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: comment, user: session?.user?.name }),
        });
        setComment('');
        fetch(`/api/posts/${id}`).then(res => res.json()).then(setPost);
    };

    if (!post) return <div className="p-4">Загрузка...</div>;

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="mb-4">{post.content}</p>
            <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Комментарии:</h2>
                <ul className="space-y-2">
                    {post.comments.map((c, i) => (
                        <li key={i} className="border p-2 rounded"><strong>{c.user}:</strong> {c.text}</li>
                    ))}
                </ul>
                {session ? (
                    <div className="mt-4">
                        <textarea value={comment} onChange={e => setComment(e.target.value)} className="border p-2 w-full rounded" />
                        <button onClick={submitComment} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Отправить</button>
                    </div>
                ) : (
                    <p className="mt-2 text-gray-600">Войдите, чтобы оставить комментарий.</p>
                )}
            </div>
        </div>
    );
}