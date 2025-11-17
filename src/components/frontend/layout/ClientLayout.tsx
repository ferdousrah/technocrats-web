"use client";

import MobileMenu from "@/components/frontend/headers/MobileMenu";
import Header1 from "@/components/frontend/headers/Header1";
import InitScroll from "@/components/frontend/scroll/InitScroll";
import LenisSmoothScroll from "@/components/frontend/scroll/LenisSmoothScroll";
import ScrollTop from "@/components/frontend/scroll/ScrollTop";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <MobileMenu />
      <Header1 />
      {children}
      <InitScroll />
      <ScrollTop />
      <LenisSmoothScroll />
    </>
  );
}
