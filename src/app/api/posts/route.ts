import { NextResponse } from 'next/server';

let posts = [
    { id: '1', title: 'Первый пост', content: 'Это контент первого поста', comments: [] },
    { id: '2', title: 'Второй пост', content: 'Контент второго поста', comments: [] },
];

export async function GET() {
    return NextResponse.json(posts);
}

export async function POST(req) {
    const newPost = await req.json();
    posts.push({ ...newPost, comments: [] });
    return NextResponse.json({ success: true });
}