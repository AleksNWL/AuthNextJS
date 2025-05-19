import { NextResponse } from 'next/server';
import { posts } from '@/lib/posts';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = posts.find((p) => p.id === id);
    if (post) {
        return NextResponse.json(post);
    }
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { text, user }: { text: string; user: string } = await req.json();

    const post = posts.find((p) => p.id === id);
    if (post) {
        post.comments.push({ text, user, date: new Date().toISOString() });
        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
}
