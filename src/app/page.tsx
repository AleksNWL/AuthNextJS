'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Post } from '@/types/types';
import Loader from '@/components/loader';

export default function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <main className="p-6 max-w-3xl mx-auto flex justify-center items-center min-h-[200px]">
                <Loader />
            </main>
        );
    }

    return (
        <main className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-extrabold mb-6 text-white">Посты</h1>
            <ul className="space-y-6">
                {posts.map(post => (
                    <li
                        key={post.id}
                        className="border border-gray-700 rounded-lg p-5 hover:shadow-lg transition-shadow duration-300"
                    >
                        <Link
                            href={`/posts/${post.id}`}
                            className="text-2xl font-semibold text-blue-400 hover:underline"
                        >
                            {post.title}
                        </Link>
                        <p className="mt-2 text-gray-300 line-clamp-3">{post.content}</p>

                        <div className="mt-3 flex flex-wrap items-center justify-between text-sm text-gray-400">
                            <div>
                                <span>
                                    Автор: <span className="font-medium text-white">{post.author}</span>
                                </span>
                                <span className="mx-2">|</span>
                                <time dateTime={post.date}>{formatDate(post.date)}</time>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="bg-blue-900 text-blue-300 px-3 py-0.5 rounded-full text-xs font-semibold select-none"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}
