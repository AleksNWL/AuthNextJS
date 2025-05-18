'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');
    const { data: session } = useSession();

    useEffect(() => {
        fetch(`/api/posts/${id}`).then(res => res.json()).then(setPost);
    }, [id]);

    const submitComment = async () => {
        await fetch(`/api/posts/${id}`, {
            method: 'POST',
            body: JSON.stringify({ text: comment, user: session.user.name }),
        });
        setComment('');
        fetch(`/api/posts/${id}`).then(res => res.json()).then(setPost);
    };

    if (!post) return <div>Загрузка...</div>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">{post.title}</h1>
            <p>{post.content}</p>
            <div className="mt-4">
                <h2 className="font-semibold">Комментарии:</h2>
                <ul>
                    {post.comments.map((c, i) => (
                        <li key={i}><strong>{c.user}:</strong> {c.text}</li>
                    ))}
                </ul>
                {session ? (
                    <div className="mt-2">
                        <textarea value={comment} onChange={e => setComment(e.target.value)} className="border p-2 w-full" />
                        <button onClick={submitComment} className="bg-blue-500 text-white px-4 py-2 mt-2">Отправить</button>
                    </div>
                ) : (
                    <p>Войдите, чтобы оставить комментарий.</p>
                )}
            </div>
        </div>
    );
}