import Link from "next/link";
import Image from "next/image";
import { fetchDocs } from "@/lib/api";
import { BlogPost, Media } from "@/types/payload";
import RevealText from "@/components/frontend/animation/RevealText";
import BackgroundParallax from "@/components/frontend/animation/BackgroundParallax";
import Footer2 from "@/components/frontend/footers/Footer2";

export const metadata = {
  title: "Blog - Technocrats",
  description: "Latest insights, articles, and news from Technocrats",
};

// Dynamic page generation - pages are generated on-demand
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const { docs: blogs } = await fetchDocs<BlogPost>("blog", {
    limit: 12,
    sort: "-publishedDate",
    where: {
      status: { equals: "published" },
    },
    depth: 2,
  });

  return (
    <>
      <div className="mxd-section padding-default">
      <div className="mxd-container grid-container">
        {/* Section Title */}
        <div className="mxd-block">
          <div className="mxd-section-title pre-grid">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrtitle">
                    <RevealText as="h1" className="reveal-type">
                      Blog & Insights
                    </RevealText>
                  </div>
                </div>
                <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrdescr">
                    <p className="anim-uni-in-up">
                      Explore our latest articles on AI, ML, software
                      development, and technology trends
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="mxd-block">
          <div className="mxd-blog-preview">
            <div className="container-fluid p-0">
              <div className="row g-0">
                {blogs.map((blog) => {
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

                  return (
                    <div
                      key={blog.id}
                      className="col-12 col-xl-4 mxd-blog-preview__item mxd-grid-item animate-card-3"
                    >
                      <Link
                        className="mxd-blog-preview__media"
                        href={`/blog/${blog.slug}`}
                      >
                        {featuredImage ? (
                          <div
                            className="mxd-blog-preview__image parallax-img-small"
                            style={{
                              backgroundImage: `url(${featuredImage})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          />
                        ) : (
                          <BackgroundParallax className="mxd-blog-preview__image parallax-img-small" />
                        )}
                        <div className="mxd-preview-hover">
                          <i className="mxd-preview-hover__icon">
                            <Image
                              alt="Eye Icon"
                              src="/img/icons/icon-eye.svg"
                              width={38}
                              height={21}
                            />
                          </i>
                        </div>
                        {blog.categories && blog.categories.length > 0 && (
                          <div className="mxd-blog-preview__tags">
                            {blog.categories.slice(0, 2).map((category) => (
                              <span
                                key={category.id}
                                className="tag tag-default tag-permanent"
                              >
                                {category.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </Link>

                      <div className="mxd-blog-preview__data">
                        {publishDate && (
                          <div className="mxd-blog-preview__meta">
                            <span className="meta-date">{publishDate}</span>
                          </div>
                        )}
                        <Link
                          className="anim-uni-in-up"
                          href={`/blog/${blog.slug}`}
                        >
                          {blog.title}
                        </Link>
                        {blog.excerpt && (
                          <p className="mxd-blog-preview__excerpt">
                            {blog.excerpt}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Footer2 />
    </>
  );
}
