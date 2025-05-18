import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const post = posts.find(p => p.id === params.id);
    return NextResponse.json(post);
}

export async function POST(req, { params }) {
    const { text, user } = await req.json();
    const post = posts.find(p => p.id === params.id);
    if (post) {
        post.comments.push({ text, user });
        return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false }, { status: 404 });
}