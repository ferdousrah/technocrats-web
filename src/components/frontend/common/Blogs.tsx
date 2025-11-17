import Link from "next/link";
import Image from "next/image";
import { getFeaturedBlogPosts } from "@/lib/api";
import { BlogPost, Media } from "@/types/payload";
import RevealText from "../animation/RevealText";
import BackgroundParallax from "../animation/BackgroundParallax";
import AnimatedButton from "../animation/AnimatedButton";

const defaultDesc = `Inspiring ideas, creative insights, and the latest in design and tech. Fueling innovation for your digital journey.`;

export default async function Blogs({
  title = "Recent insights",
  desc = defaultDesc,
}) {
  const blogs = await getFeaturedBlogPosts<BlogPost>(3);

  return (
    <div className="mxd-section padding-blog">
      <div className="mxd-container grid-container">
        {/* Block - Section Title Start */}
        <div className="mxd-block">
          <div className="mxd-section-title pre-grid">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-5 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrtitle">
                    <RevealText as="h2" className="reveal-type anim-uni-in-up">
                      {title}
                    </RevealText>
                  </div>
                </div>
                <div className="col-12 col-xl-4 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrdescr">
                    <p className="anim-uni-in-up">{desc}</p>
                  </div>
                </div>
                <div className="col-12 col-xl-3 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrcontrols anim-uni-in-up">
                    <AnimatedButton
                      text="All Articles"
                      className="btn btn-anim btn-default btn-outline slide-right-up"
                      href={`/blog`}
                    >
                      <i className="ph-bold ph-arrow-up-right" />
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Block - Section Title End */}
        {/* Block - Blog Preview Cards Start */}
        <div className="mxd-block">
          <div className="mxd-blog-preview">
            <div className="container-fluid p-0">
              <div className="row g-0">
                {blogs.length === 0 ? (
                  <div className="col-12" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '1rem' }}>
                      No blog posts yet. Create your first blog post in the admin panel.
                    </p>
                    <AnimatedButton
                      text="Go to Admin"
                      className="btn btn-anim btn-default btn-outline slide-right-up"
                      href="/admin/collections/blog"
                    >
                      <i className="ph-bold ph-arrow-right" />
                    </AnimatedButton>
                  </div>
                ) : (
                  blogs.map((blog, idx) => {
                    const featuredImage =
                      typeof blog.featuredImage === "object"
                        ? (blog.featuredImage as Media)?.url
                        : blog.featuredImage;

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
                        <Link
                          className="anim-uni-in-up"
                          href={`/blog/${blog.slug}`}
                        >
                          {blog.title}
                        </Link>
                      </div>
                    </div>
                  );
                })
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Block - Blog Preview Cards End */}
      </div>
    </div>
  );
}
