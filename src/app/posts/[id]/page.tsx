'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import type { Post } from '@/types/types';
import Loader from "@/components/loader";

function formatDate(dateStr: string) {
    if (!dateStr) return 'не указана';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'неизвестно';
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function PostPage() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comment, setComment] = useState('');
    const { data: session } = useSession();

    useEffect(() => {
        if (!id) return;
        fetch(`/api/posts/${id}`)
            .then(res => res.json())
            .then(setPost);
    }, [id]);

    const submitComment = async () => {
        if (!comment.trim()) return;
        await fetch(`/api/posts/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: comment, user: session?.user?.name }),
        });
        setComment('');
        fetch(`/api/posts/${id}`).then(res => res.json()).then(setPost);
    };

    if (!post) return <Loader/>;

    return (
        <div className="p-6 max-w-3xl mx-auto rounded shadow-md">
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <div className="flex text-white text-sm mb-4 space-x-6">
                <div>Автор: <strong>{post.author}</strong></div>
                <div>Дата: {formatDate(post.date)}</div>
                <div>
                    Теги:{' '}
                    {post.tags.length > 0
                        ? post.tags.map(tag => (
                            <span
                                key={tag}
                                className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2 text-xs font-medium"
                            >
                                #{tag}
                            </span>
                        ))
                        : 'нет тегов'}
                </div>
            </div>
            <p className="mb-6 whitespace-pre-line text-white">{post.content}</p>

            <div>
                <h2 className="text-xl font-semibold mb-4">Комментарии</h2>
                {post.comments.length === 0 && <p className="text-white mb-4">Пока нет комментариев.</p>}
                <ul className="space-y-3 mb-6">
                    {post.comments.map((c, i) => (
                        <li key={i} className="border p-3 rounded shadow-sm">
                            <strong>{c.user}</strong>: {c.text}
                        </li>
                    ))}
                </ul>

                {session ? (
                    <div>
                        <textarea
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                            placeholder="Напишите комментарий..."
                        />
                        <button
                            onClick={submitComment}
                            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded transition"
                        >
                            Отправить
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-600">Войдите, чтобы оставить комментарий.</p>
                )}
            </div>
        </div>
    );
}
