import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

const tagColors: Record<string, string> = {
  News: 'bg-yokomo-blue/15 text-yokomo-blue',
  Review: 'bg-racing-yellow/15 text-racing-yellow',
  'Race Report': 'bg-racing-red/15 text-racing-red',
};

function renderMarkdown(content: string): string {
  return content
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';

      // Handle links within text
      const withLinks = trimmed.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      );

      return `<p>${withLinks}</p>`;
    })
    .join('\n');
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-[#0A0A0A]">
      <div className="container max-w-3xl py-12">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <article>
          <div className="mb-6 flex items-center gap-3">
            {post.tag && (
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tagColors[post.tag] || 'bg-white/10 text-gray-400'}`}
              >
                {post.tag}
              </span>
            )}
            <time className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          <h1 className="mb-8 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {post.title}
          </h1>

          {post.image && (
            <div className="relative mb-10 aspect-video overflow-hidden rounded-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </article>
      </div>
    </div>
  );
}
