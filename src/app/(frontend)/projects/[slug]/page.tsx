import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchDocBySlug, fetchDocs } from "@/lib/api";
import { Project, Media } from "@/types/payload";
import LexicalRenderer from "@/components/frontend/blogs/LexicalRenderer";
import { extractTextFromLexical } from "@/utils/lexical";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Dynamic page generation - pages are generated on-demand
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchDocBySlug<Project>("projects", slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const description = project.seo?.description || extractTextFromLexical(project.description);

  return {
    title: project.seo?.title || project.title,
    description,
    openGraph: {
      title: project.seo?.title || project.title,
      description,
      images:
        project.seo?.ogImage &&
        typeof project.seo.ogImage === "object" &&
        "url" in project.seo.ogImage
          ? [project.seo.ogImage.url]
          : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await fetchDocBySlug<Project>("projects", slug, 2);

  if (!project) {
    notFound();
  }

  const featuredImage =
    typeof project.featuredImage === "object"
      ? (project.featuredImage as Media)?.url
      : project.featuredImage;

  const projectDate = project.projectDate
    ? new Date(project.projectDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "";

  return (
    <div className="mxd-section padding-pre-title">
      <div className="mxd-container grid-container">
        <div className="mxd-article-area loading-wrap">
          {/* Project Container Start */}
          <div className="mxd-article-container mxd-grid-item no-margin">
            {/* Project Start */}
            <article className="mxd-article">
              {/* Project Headline Start */}
              <div className="mxd-article__headline">
                <div className="mxd-article__meta">
                  <div className="mxd-article__breadcrumbs loading__item">
                    <span>
                      <Link href="/">Home</Link>
                    </span>
                    <span>
                      <Link href="/projects">Projects</Link>
                    </span>
                    <span className="current-item">{project.title}</span>
                  </div>
                  <div className="mxd-article__data loading__item">
                    {projectDate && (
                      <span className="meta-date">{projectDate}</span>
                    )}
                    {project.client && (
                      <span className="meta-client">Client: {project.client}</span>
                    )}
                  </div>
                </div>
                <div className="mxd-article__title loading__item">
                  <h1 className="h1-small">{project.title}</h1>
                </div>
                {project.description && (
                  <div className="mxd-article__subtitle loading__item">
                    <p className="t-large">{extractTextFromLexical(project.description)}</p>
                  </div>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mxd-article__tags loading__item">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="tag tag-default tag-outline"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {/* Project Headline End */}

              {/* Project Thumb Start */}
              {featuredImage && (
                <div className="mxd-article__thumb loading__fade">
                  <Image
                    alt={project.title}
                    src={featuredImage}
                    width={1920}
                    height={1280}
                    priority
                  />
                </div>
              )}
              {/* Project Thumb End */}

              {/* Project Details Grid */}
              <div className="mxd-article__content">
                <div className="mxd-article__block">
                  <div className="container-fluid p-0">
                    <div className="row">
                      {project.client && (
                        <div className="col-12 col-md-6">
                          <h5>Client</h5>
                          <p>{project.client}</p>
                        </div>
                      )}
                      {projectDate && (
                        <div className="col-12 col-md-6">
                          <h5>Date</h5>
                          <p>{projectDate}</p>
                        </div>
                      )}
                      {project.projectUrl && (
                        <div className="col-12 col-md-6">
                          <h5>Website</h5>
                          <p>
                            <a
                              href={project.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link-underline"
                            >
                              View Project
                            </a>
                          </p>
                        </div>
                      )}
                      {project.githubUrl && (
                        <div className="col-12 col-md-6">
                          <h5>GitHub</h5>
                          <p>
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link-underline"
                            >
                              View Repository
                            </a>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              {project.content && <LexicalRenderer content={project.content} />}

              {/* Project Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="mxd-article__gallery">
                  <div className="container-fluid p-0">
                    <div className="row g-4">
                      {project.gallery.map((item, index) => {
                        const imageUrl =
                          typeof item.image === "object"
                            ? (item.image as Media)?.url
                            : item.image;

                        return (
                          <div key={index} className="col-12 col-md-6">
                            {imageUrl && (
                              <div className="mxd-article__gallery-item">
                                <Image
                                  src={imageUrl}
                                  alt={item.caption || `Gallery image ${index + 1}`}
                                  width={1200}
                                  height={800}
                                  className="radius-l"
                                />
                                {item.caption && (
                                  <p className="t-small mxd-article__caption">
                                    {item.caption}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </article>
            {/* Project End */}
          </div>
          {/* Project Container End */}
        </div>
      </div>
    </div>
  );
}
