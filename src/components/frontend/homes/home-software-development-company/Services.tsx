import Image from "next/image";
import { getAllServices } from "@/lib/api";
import { Service, Media } from "@/types/payload";

// Style variations for service cards
const cardStyles = [
  {
    colClass: "col-12 col-xl-8",
    animClass: "anim-uni-scale-in-right",
    bgClass: "bg-base-tint",
    justifyClass: "justify-between",
    widthClass: "width-50",
    titleClass: "",
    tagClass: "tag-outline",
    textClass: "",
    imageClass: "image-right",
    imageEffect: "",
  },
  {
    colClass: "col-12 col-xl-4",
    animClass: "anim-uni-scale-in-left",
    bgClass: "bg-accent",
    justifyClass: "justify-end",
    widthClass: "",
    titleClass: "opposite",
    tagClass: "tag-outline-opposite",
    textClass: "t-opposite",
    imageClass: "image-top-right",
    imageEffect: "mxd-move",
  },
  {
    colClass: "col-12 col-xl-4",
    animClass: "anim-uni-scale-in-right",
    bgClass: "bg-additional",
    justifyClass: "",
    widthClass: "",
    titleClass: "",
    tagClass: "tag-outline",
    textClass: "t-bright",
    imageClass: "image-bottom",
    imageEffect: "mxd-rotate-slow",
  },
  {
    colClass: "col-12 col-xl-4",
    animClass: "anim-uni-scale-in",
    bgClass: "bg-base-opp",
    justifyClass: "",
    widthClass: "",
    titleClass: "opposite",
    tagClass: "tag-outline-opposite",
    textClass: "t-opposite",
    imageClass: "image-bottom image-bottom-2",
    imageEffect: "",
  },
  {
    colClass: "col-12 col-xl-4",
    animClass: "anim-uni-scale-in-left",
    bgClass: "bg-base-tint",
    justifyClass: "justify-end",
    widthClass: "",
    titleClass: "",
    tagClass: "tag-outline",
    textClass: "",
    imageClass: "image-top",
    imageEffect: "",
  },
];

export default async function Services() {
  const services = await getAllServices<Service>();

  // Show up to 5 services on homepage
  const displayServices = services.slice(0, 5);

  return (
    <div className="mxd-section overflow-hidden padding-pre-title">
      <div className="mxd-container grid-container">
        {/* Block - Services Cards #02 Start */}
        <div className="mxd-block">
          <div className="mxd-services-cards-s">
            <div className="container-fluid px-0">
              <div className="row gx-0">
                {displayServices.map((service, index) => {
                  const style = cardStyles[index % cardStyles.length];
                  const featuredImage =
                    typeof service.featuredImage === "object"
                      ? (service.featuredImage as Media)?.url
                      : service.featuredImage;

                  return (
                    <div
                      key={service.id}
                      className={`${style.colClass} mxd-services-cards-s__item mxd-grid-item ${style.animClass}`}
                    >
                      <div
                        className={`mxd-services-cards-s__inner ${style.justifyClass} ${style.bgClass} radius-l padding-4`}
                      >
                        <div className="mxd-services-cards-s__title">
                          <h3 className={`${style.titleClass} anim-uni-in-up`}>
                            {service.title}
                          </h3>
                        </div>
                        <div
                          className={`mxd-services-cards-s__info ${style.widthClass}`}
                        >
                          {service.serviceType && (
                            <div className="mxd-services-cards-s__tags">
                              <span
                                className={`tag tag-default ${style.tagClass} anim-uni-in-up`}
                              >
                                {service.serviceType.name}
                              </span>
                            </div>
                          )}
                          <p className={`${style.textClass} anim-uni-in-up`}>
                            {service.description}
                          </p>
                        </div>
                        {featuredImage && (
                          <div
                            className={`mxd-services-cards-s__image ${style.imageClass}`}
                          >
                            <Image
                              className={style.imageEffect}
                              alt={service.title}
                              src={featuredImage}
                              width={1200}
                              height={1200}
                            />
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
        {/* Block - Services Cards #02 End */}
      </div>
    </div>
  );
}
