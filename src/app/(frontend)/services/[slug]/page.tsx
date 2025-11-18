import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchDocBySlug, fetchDocs } from "@/lib/api";
import { Service, Media } from "@/types/payload";
import LexicalRenderer from "@/components/frontend/blogs/LexicalRenderer";
import { extractTextFromLexical } from "@/utils/lexical";
import type { Metadata } from "next";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Dynamic page generation - pages are generated on-demand
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await fetchDocBySlug<Service>("services", slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const description = service.seo?.description || extractTextFromLexical(service.description);

  return {
    title: service.seo?.title || service.title,
    description,
    openGraph: {
      title: service.seo?.title || service.title,
      description,
      images:
        service.seo?.ogImage &&
        typeof service.seo.ogImage === "object" &&
        "url" in service.seo.ogImage
          ? [service.seo.ogImage.url]
          : [],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await fetchDocBySlug<Service>("services", slug, 2);

  if (!service) {
    notFound();
  }

  const featuredImage =
    typeof service.featuredImage === "object"
      ? (service.featuredImage as Media)?.url
      : service.featuredImage;

  return (
    <div className="mxd-section padding-pre-title">
      <div className="mxd-container grid-container">
        <div className="mxd-article-area loading-wrap">
          {/* Service Container Start */}
          <div className="mxd-article-container mxd-grid-item no-margin">
            {/* Service Start */}
            <article className="mxd-article">
              {/* Service Headline Start */}
              <div className="mxd-article__headline">
                <div className="mxd-article__meta">
                  <div className="mxd-article__breadcrumbs loading__item">
                    <span>
                      <Link href="/">Home</Link>
                    </span>
                    <span>
                      <Link href="/services">Services</Link>
                    </span>
                    <span className="current-item">{service.title}</span>
                  </div>
                  {service.serviceType && (
                    <div className="mxd-article__data loading__item">
                      <span className="meta-category">
                        {service.serviceType.name}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mxd-article__title loading__item">
                  <h1 className="h1-small">{service.title}</h1>
                </div>
                {service.description && (
                  <div className="mxd-article__subtitle loading__item">
                    <p className="t-large">{extractTextFromLexical(service.description)}</p>
                  </div>
                )}
              </div>
              {/* Service Headline End */}

              {/* Service Thumb Start */}
              {featuredImage && (
                <div className="mxd-article__thumb loading__fade">
                  <Image
                    alt={service.title}
                    src={featuredImage}
                    width={1920}
                    height={1280}
                    priority
                  />
                </div>
              )}
              {/* Service Thumb End */}

              {/* Service Content */}
              {service.content && <LexicalRenderer content={service.content} />}

              {/* CTA Section */}
              <div className="mxd-article__footer">
                <div className="mxd-article__cta bg-accent radius-l padding-4">
                  <h3 className="opposite">Interested in this service?</h3>
                  <p className="t-opposite">
                    Get in touch with us to discuss how we can help transform
                    your business
                  </p>
                  <Link
                    href="/contact"
                    className="btn btn-anim btn-default btn-outline-opposite slide-right-up"
                  >
                    Contact Us
                    <i className="ph-bold ph-arrow-up-right" />
                  </Link>
                </div>
              </div>
            </article>
            {/* Service End */}
          </div>
          {/* Service Container End */}
        </div>
      </div>
    </div>
  );
}
