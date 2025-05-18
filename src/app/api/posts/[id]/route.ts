import { NextResponse } from 'next/server';
import { posts } from '@/lib/posts';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const post = posts.find(p => p.id === params.id);
    return NextResponse.json(post);
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const { text, user }: { text: string; user: string } = await req.json();
    const post = posts.find(p => p.id === params.id);
    if (post) {
        post.comments.push({ text, user, date: new Date().toISOString() });
        return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false }, { status: 404 });
}
