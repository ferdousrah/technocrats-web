import Link from "next/link";
import Image from "next/image";
import { getAllServices } from "@/lib/api";
import { Service, Media } from "@/types/payload";
import RevealText from "@/components/frontend/animation/RevealText";
import Footer2 from "@/components/frontend/footers/Footer2";

export const metadata = {
  title: "Services - Technocrats",
  description:
    "Comprehensive AI, ML, and software development services to transform your business",
};

// Dynamic page generation - pages are generated on-demand
export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await getAllServices<Service>();

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
                      Our Services
                    </RevealText>
                  </div>
                </div>
                <div className="col-12 col-xl-6 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrdescr">
                    <p className="anim-uni-in-up">
                      Comprehensive solutions across AI, ML, and custom software
                      development to transform your business
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mxd-block">
          <div className="container-fluid p-0">
            <div className="row g-4">
              {services.map((service) => {
                const featuredImage =
                  typeof service.featuredImage === "object"
                    ? (service.featuredImage as Media)?.url
                    : service.featuredImage;

                return (
                  <div
                    key={service.id}
                    className="col-12 col-md-6 col-lg-4 mxd-grid-item"
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      className="mxd-service-card"
                    >
                      <div className="mxd-service-card__inner bg-base-tint radius-l padding-4">
                        {featuredImage && (
                          <div className="mxd-service-card__image">
                            <Image
                              src={featuredImage}
                              alt={service.title}
                              width={400}
                              height={300}
                              className="radius-m"
                            />
                          </div>
                        )}
                        <div className="mxd-service-card__content">
                          {service.serviceType && (
                            <div className="mxd-service-card__category">
                              <span className="tag tag-default tag-outline anim-uni-in-up">
                                {service.serviceType.name}
                              </span>
                            </div>
                          )}
                          <h3 className="mxd-service-card__title anim-uni-in-up">
                            {service.title}
                          </h3>
                          <p className="mxd-service-card__description anim-uni-in-up">
                            {service.description}
                          </p>
                          <div className="mxd-service-card__link anim-uni-in-up">
                            <span className="link-underline">Learn More</span>
                            <i className="ph-bold ph-arrow-up-right" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
      <Footer2 />
    </>
  );
}
