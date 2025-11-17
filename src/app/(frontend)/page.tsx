import Hero from '@/components/frontend/homes/home-software-development-company/Hero'
import About from '@/components/frontend/homes/home-software-development-company/About'
import Services from '@/components/frontend/homes/home-software-development-company/Services'
import TechStacks from '@/components/frontend/homes/home-software-development-company/TechStacks'
import Projects from '@/components/frontend/homes/home-software-development-company/Projects'
import Capabilities from '@/components/frontend/homes/home-software-development-company/Capabilities'
import Facts from '@/components/frontend/homes/home-software-development-company/Facts'
import MarqueeSlider from '@/components/frontend/homes/home-software-development-company/MarqueeSlider'
import MarqueeSlider2 from '@/components/frontend/homes/home-software-development-company/MarqueeSlider2'
import ParallaxBanner from '@/components/frontend/homes/home-software-development-company/ParallaxBanner'
import ParallaxDivider from '@/components/frontend/homes/home-software-development-company/ParallaxDivider'
import Testimonials from '@/components/frontend/common/Testimonials'
import Blogs from '@/components/frontend/common/Blogs'
import Cta from '@/components/frontend/common/Cta'
import Footer2 from '@/components/frontend/footers/Footer2'

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeSlider />
      <About />
      <Services />
      <ParallaxDivider />
      <TechStacks />
      <Projects />
      <MarqueeSlider2 />
      <Capabilities />
      <Facts />
      <ParallaxBanner />
      <Testimonials />
      <Blogs />
      <Cta />
      <Footer2 />
    </>
  )
}
