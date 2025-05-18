export interface Comment {
    text: string;
    user: string;
    date: string;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    date: string;
    tags: string[];
    comments: Comment[];
}
