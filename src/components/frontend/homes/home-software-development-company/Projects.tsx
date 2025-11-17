import Link from "next/link";
import { getLatestProjects } from "@/lib/api";
import { Project, Media } from "@/types/payload";
import RevealText from "@/components/frontend/animation/RevealText";
import BackgroundParallax from "@/components/frontend/animation/BackgroundParallax";
import AnimatedButton from "@/components/frontend/animation/AnimatedButton";

export default async function Projects() {
  const projects = await getLatestProjects<Project>(5);

  return (
    <div className="mxd-section padding-pre-grid mobile-grid-title">
      <div className="mxd-container grid-container">
        {/* Block - Projects Pinned #01 with Section Title Start */}
        <div className="mxd-block">
          <div className="mxd-pinned-projects">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                <div className="col-12 col-xl-5 mxd-pinned-projects__static">
                  <div className="mxd-pinned-projects__static-inner no-margin">
                    {/* Section Title Start */}
                    <div className="mxd-section-title no-margin-desktop">
                      <div className="container-fluid p-0">
                        <div className="row g-0">
                          <div className="col-12 mxd-grid-item no-margin">
                            <div className="mxd-section-title__title">
                              <RevealText as="h2" className="reveal-type">
                                Case studies
                              </RevealText>
                            </div>
                          </div>
                          <div className="col-12 mxd-grid-item no-margin">
                            <div className="mxd-section-title__descr">
                              <p className="anim-uni-in-up">
                                Explore a selection of projects blending
                                <br />
                                creativity with practical design
                              </p>
                            </div>
                          </div>
                          <div className="col-12 mxd-grid-item no-margin">
                            <div className="mxd-section-title__controls anim-uni-in-up">
                              <AnimatedButton
                                text="All Works"
                                className="btn btn-anim btn-default btn-outline slide-right-up"
                                href={`/projects`}
                              >
                                <i className="ph-bold ph-arrow-up-right" />
                              </AnimatedButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Section Title Start */}
                  </div>
                </div>
                <div className="col-12 col-xl-7 mxd-pinned-projects__scroll">
                  <div className="mxd-pinned-projects__scroll-inner mxd-grid-item no-margin">
                    {projects.length === 0 ? (
                      <div className="mxd-project-item" style={{ padding: '3rem', textAlign: 'center' }}>
                        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '1rem' }}>
                          No projects yet. Create your first project in the admin panel.
                        </p>
                        <AnimatedButton
                          text="Go to Admin"
                          className="btn btn-anim btn-default btn-outline slide-right-up"
                          href="/admin/collections/projects"
                        >
                          <i className="ph-bold ph-arrow-right" />
                        </AnimatedButton>
                      </div>
                    ) : (
                      projects.map((project, index) => {
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
                                <span>{project.title}</span> {project.description}
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Block - Projects Pinned #01 with Section Title Start */}
      </div>
    </div>
  );
}
