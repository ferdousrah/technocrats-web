import { DefaultSeoProps } from "next-seo";

const defaultSEOConfig: DefaultSeoProps = {
  titleTemplate: "%s | Technocrats",
  defaultTitle: "Technocrats – Custom Software & AI Development Company",
  description:
    "Technocrats is a leading software development company since 2014. We build custom software, mobile apps, e-commerce, and AI/ML solutions for corporates and governments.",
  canonical: "https://technocrats.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://technocrats.com",
    site_name: "Technocrats",
    images: [
      {
        url: "https://technocrats.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Technocrats Software Development Company",
      },
    ],
  },
  twitter: {
    handle: "@technocrats",
    site: "@technocrats",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
