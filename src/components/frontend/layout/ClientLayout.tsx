"use client";

import MobileMenu from "@/components/frontend/headers/MobileMenu";
import Header1 from "@/components/frontend/headers/Header1";
import InitScroll from "@/components/frontend/scroll/InitScroll";
import LenisSmoothScroll from "@/components/frontend/scroll/LenisSmoothScroll";
import ScrollTop from "@/components/frontend/scroll/ScrollTop";
import type { MenuItem } from "@/utils/getMenus";

interface ClientLayoutProps {
  children: React.ReactNode;
  headerMenuItems?: MenuItem[];
  mobileMenuItems?: MenuItem[];
}

export default function ClientLayout({
  children,
  headerMenuItems = [],
  mobileMenuItems = []
}: ClientLayoutProps) {
  return (
    <>
      <MobileMenu menuItems={mobileMenuItems} />
      <Header1 menuItems={headerMenuItems} />
      {children}
      <InitScroll />
      <ScrollTop />
      <LenisSmoothScroll />
    </>
  );
}
