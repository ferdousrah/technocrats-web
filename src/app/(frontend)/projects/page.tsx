import Link from "next/link";
import { fetchDocs } from "@/lib/api";
import { Project, Media } from "@/types/payload";
import RevealText from "@/components/frontend/animation/RevealText";
import BackgroundParallax from "@/components/frontend/animation/BackgroundParallax";

export const metadata = {
  title: "Projects - Technocrats",
  description: "Explore our portfolio of successful AI, ML, and software development projects",
};

// Dynamic page generation - pages are generated on-demand
export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const { docs: projects } = await fetchDocs<Project>("projects", {
    limit: 50,
    sort: "-createdAt",
    depth: 2,
  });

  return (
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
                      Our Projects
                    </RevealText>
                  </div>
                </div>
                <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrdescr">
                    <p className="anim-uni-in-up">
                      Discover our innovative solutions across AI, ML, and
                      custom software development
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mxd-block">
          <div className="mxd-pinned-projects">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                <div className="col-12">
                  <div className="mxd-pinned-projects__scroll-inner mxd-grid-item no-margin">
                    {projects.map((project) => {
                      const featuredImage =
                        typeof project.featuredImage === "object"
                          ? (project.featuredImage as Media)?.url
                          : project.featuredImage;

                      return (
                        <div key={project.id} className="mxd-project-item">
                          <Link
                            className="mxd-project-item__media anim-img-scale-in"
                            href={`/projects/${project.slug}`}
                          >
                            {featuredImage ? (
                              <div
                                className="mxd-project-item__preview parallax-img-small"
                                style={{
                                  backgroundImage: `url(${featuredImage})`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                }}
                              />
                            ) : (
                              <BackgroundParallax className="mxd-project-item__preview parallax-img-small" />
                            )}
                            {project.technologies &&
                              project.technologies.length > 0 && (
                                <div className="mxd-project-item__tags">
                                  {project.technologies
                                    .slice(0, 3)
                                    .map((tech, i) => (
                                      <span
                                        key={i}
                                        className="tag tag-default tag-permanent"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                </div>
                              )}
                          </Link>
                          <div className="mxd-project-item__promo">
                            <div className="mxd-project-item__name">
                              <Link
                                className="anim-img-scale-in"
                                href={`/projects/${project.slug}`}
                              >
                                <span>{project.title}</span>{" "}
                                {project.description}
                              </Link>
                            </div>
                            {project.client && (
                              <div className="mxd-project-item__client">
                                <span className="t-small">
                                  Client: {project.client}
                                </span>
                              </div>
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
      </div>
    </div>
  );
}
