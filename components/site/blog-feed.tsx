'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/blog';

const POSTS_PER_PAGE = 6;

const tagColors: Record<string, string> = {
  News: 'bg-yokomo-blue/15 text-yokomo-blue',
  Review: 'bg-racing-yellow/15 text-racing-yellow',
  'Race Report': 'bg-racing-red/15 text-racing-red',
};

export function BlogFeed({ posts }: { posts: BlogPost[] }) {
  const [visible, setVisible] = useState(POSTS_PER_PAGE);

  if (posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-gray-500">No posts yet. Check back soon.</p>
      </div>
    );
  }

  const shownPosts = posts.slice(0, visible);
  const hasMore = visible < posts.length;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shownPosts.map((post) => (
          <article
            key={post.slug}
            className="group overflow-hidden rounded-lg border border-white/10 bg-[#111] transition-colors hover:border-white/20"
          >
            {post.image && (
              <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
                <div className="relative aspect-video bg-gray-900">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
            )}
            <div className="p-5">
              <div className="mb-3 flex items-center gap-3">
                {post.tag && (
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tagColors[post.tag] || 'bg-white/10 text-gray-400'}`}
                  >
                    {post.tag}
                  </span>
                )}
                <time className="text-xs text-gray-500">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-yokomo-blue">
                  {post.title}
                </h2>
              </Link>
              <p className="mb-4 text-sm leading-relaxed text-gray-400">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-sm font-medium text-yokomo-blue hover:underline"
              >
                Read More
                <span className="ml-1">&rarr;</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisible((v) => v + POSTS_PER_PAGE)}
            className="rounded-lg bg-yokomo-blue px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-yokomo-blue/90"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}
