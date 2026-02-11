import { getAllPosts } from '@/lib/blog';
import { BlogFeed } from '@/components/site/blog-feed';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-white/10 bg-[#0A0A0A]">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              SO <span className="text-yokomo-blue">RC</span>
            </h1>
            <p className="mt-3 text-sm font-medium uppercase tracking-widest text-gray-500">
              News &bull; Setups &bull; Reviews &bull; Resources
            </p>
            <p className="mt-6 text-lg text-gray-400 md:text-xl">
              Latest Yokomo SO News &amp; Setups
            </p>
          </div>
        </div>
      </section>

      {/* Blog Feed */}
      <section className="bg-[#0A0A0A]">
        <div className="container py-12">
          <BlogFeed posts={posts} />
        </div>
      </section>
    </>
  );
}
