import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchDocBySlug, fetchDocs } from "@/lib/api";
import { BlogPost, Media } from "@/types/payload";
import LexicalRenderer from "@/components/frontend/blogs/LexicalRenderer";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Dynamic page generation - pages are generated on-demand
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchDocBySlug<BlogPost>("blog", slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: blog.seo?.title || blog.title,
    description: blog.seo?.description || blog.excerpt,
    openGraph: {
      title: blog.seo?.title || blog.title,
      description: blog.seo?.description || blog.excerpt,
      images:
        blog.seo?.ogImage &&
        typeof blog.seo.ogImage === "object" &&
        "url" in blog.seo.ogImage
          ? [blog.seo.ogImage.url]
          : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = await fetchDocBySlug<BlogPost>("blog", slug, 2);

  if (!blog || blog.status !== "published") {
    notFound();
  }

  const featuredImage =
    typeof blog.featuredImage === "object"
      ? (blog.featuredImage as Media)?.url
      : blog.featuredImage;

  const publishDate = blog.publishedDate
    ? new Date(blog.publishedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const authorName =
    typeof blog.author === "object" ? blog.author?.name : "Technocrats";

  return (
    <div className="mxd-section padding-pre-title">
      <div className="mxd-container grid-container">
        <div className="mxd-article-area loading-wrap">
          {/* Article Container Start */}
          <div className="mxd-article-container mxd-grid-item no-margin">
            {/* Article Start */}
            <article className="mxd-article">
              {/* Article Headline Start */}
              <div className="mxd-article__headline">
                <div className="mxd-article__meta">
                  <div className="mxd-article__breadcrumbs loading__item">
                    <span>
                      <Link href="/">Home</Link>
                    </span>
                    <span>
                      <Link href="/blog">Blog</Link>
                    </span>
                    <span className="current-item">{blog.title}</span>
                  </div>
                  <div className="mxd-article__data loading__item">
                    {publishDate && (
                      <span className="meta-date">
                        {publishDate}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 20 20"
                        >
                          <path d="M19.6,9.6h-3.9c-.4,0-1.8-.2-1.8-.2-.6,0-1.1-.2-1.6-.6-.5-.3-.9-.8-1.2-1.2-.3-.4-.4-.9-.5-1.4,0,0,0-1.1-.2-1.5V.4c0-.2-.2-.4-.4-.4s-.4.2-.4.4v4.4c0,.4-.2,1.5-.2,1.5,0,.5-.2,1-.5,1.4-.3.5-.7.9-1.2,1.2s-1,.5-1.6.6c0,0-1.2,0-1.7.2H.4c-.2,0-.4.2-.4.4s.2.4.4.4h4.1c.4,0,1.7.2,1.7.2.6,0,1.1.2,1.6.6.4.3.8.7,1.1,1.1.3.5.5,1,.6,1.6,0,0,0,1.3.2,1.7v4.1c0,.2.2.4.4.4s.4-.2.4-.4v-4.1c0-.4.2-1.7.2-1.7,0-.6.2-1.1.6-1.6.3-.4.7-.8,1.1-1.1.5-.3,1-.5,1.6-.6,0,0,1.3,0,1.8-.2h3.9c.2,0,.4-.2.4-.4s-.2-.4-.4-.4h0Z" />
                        </svg>
                      </span>
                    )}
                    {authorName && (
                      <span className="meta-author">By {authorName}</span>
                    )}
                  </div>
                </div>
                <div className="mxd-article__title loading__item">
                  <h1 className="h1-small">{blog.title}</h1>
                </div>
                {blog.categories && blog.categories.length > 0 && (
                  <div className="mxd-article__tags loading__item">
                    {blog.categories.map((category) => (
                      <span
                        key={category.id}
                        className="tag tag-default tag-outline tag-link-outline"
                      >
                        <Link href="/blog">{category.name}</Link>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {/* Article Headline End */}

              {/* Article Thumb Start */}
              {featuredImage && (
                <div className="mxd-article__thumb loading__fade">
                  <Image
                    alt={blog.title}
                    src={featuredImage}
                    width={1920}
                    height={1280}
                    priority
                  />
                </div>
              )}
              {/* Article Thumb End */}

              {/* Article Content Start */}
              {blog.excerpt && (
                <div className="mxd-article__content">
                  <div className="mxd-article__block">
                    <p className="t-large mxd-article__excerpt">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>
              )}

              {blog.content && <LexicalRenderer content={blog.content} />}
              {/* Article Content End */}

              {/* Article Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mxd-article__footer">
                  <div className="mxd-article__tags-group">
                    <span className="label">Tags:</span>
                    {blog.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="tag tag-default tag-outline"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
            {/* Article End */}
          </div>
          {/* Article Container End */}
        </div>
      </div>
    </div>
  );
}
