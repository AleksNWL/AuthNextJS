import { NextResponse } from 'next/server';
import { posts } from '@/lib/posts';
import type { Post } from '@/types/types';

export async function GET() {
    return NextResponse.json(posts);
}

export async function POST(req: Request) {
    const newPost: Post = await req.json();
    posts.push({ ...newPost, comments: [] });
    return NextResponse.json({ success: true });
}
