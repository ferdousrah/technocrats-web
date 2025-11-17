// Home Page Components - Organized Layout
// Header and Hero from home-web-agency
import Hero from '@/components/frontend/homes/home-web-agency/Hero'

// About Us from home-software-development-company
import About from '@/components/frontend/homes/home-software-development-company/About'

// Stats from home-software-development-company
import Facts from '@/components/frontend/homes/home-software-development-company/Facts'

// Services (Our Capabilities) from home-software-development-company
import Capabilities from '@/components/frontend/homes/home-software-development-company/Capabilities'

// Tech Stack from home-software-development-company
import TechStacks from '@/components/frontend/homes/home-software-development-company/TechStacks'

// Case Studies/Projects from home-software-development-company
import Projects from '@/components/frontend/homes/home-software-development-company/Projects'

// Client Logos from home-digital-agency
import Partners from '@/components/frontend/homes/home-digital-agency/Partners'

// Recent Insights (Blogs) from home-software-development-company
import Blogs from '@/components/frontend/common/Blogs'

// Let's talk about your project! CTA
import Cta from '@/components/frontend/common/Cta'

// Footer
import Footer2 from '@/components/frontend/footers/Footer2'

// Dynamic page generation - pages are generated on-demand
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      {/* 1. Header and Hero Section */}
      <Hero />

      {/* 2. About Us */}
      <About />

      {/* 3. Stats/Facts */}
      <Facts />

      {/* 4. Services (Our Capabilities) */}
      <Capabilities />

      {/* 5. Tech Stack */}
      <TechStacks />

      {/* 6. Case Studies/Projects */}
      <Projects />

      {/* 7. Client Logos */}
      <Partners />

      {/* 8. Recent Insights (Blog) */}
      <Blogs />

      {/* 9. Let's Talk About Your Project! */}
      <Cta />

      {/* 10. Footer */}
      <Footer2 />
    </>
  )
}
