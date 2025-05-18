import './globals.css';
import type { ReactNode } from 'react';
import SessionWrapper from '@/components/SessionWrapper';

export const metadata = {
    title: 'Блог с комментариями',
    description: 'Демо блог на Next.js с комментариями',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
        <body className="bg-gray-50 text-gray-900">
        <SessionWrapper>{children}</SessionWrapper>
        </body>
        </html>
    );
}
