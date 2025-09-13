import "./globals.css";
import { DefaultSeo } from "next-seo";
import defaultSEOConfig from "@/next-seo.config";
import { Layout } from "@/components/layout/Layout";

export const metadata = {
  title: "Technocrats – Custom Software & AI Development",
  description:
    "Trusted software development company since 2014. We deliver custom solutions, mobile apps, AI/ML, and enterprise software for corporates & governments.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <DefaultSeo {...defaultSEOConfig} />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
