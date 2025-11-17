import Hero from '@/components/frontend/other-pages/about/Hero'
import About from '@/components/frontend/homes/home-software-development-company/About'
import Team from '@/components/frontend/other-pages/about/Team'
import Facts from '@/components/frontend/homes/home-software-development-company/Facts'
import Techstack from '@/components/frontend/other-pages/about/Techstack'
import MarqueeSlider from '@/components/frontend/other-pages/about/MarqueeSlider'
import Testimonials from '@/components/frontend/common/Testimonials'
import Cta from '@/components/frontend/common/Cta'
import Footer2 from '@/components/frontend/footers/Footer2'

export const metadata = {
  title: 'About Us - Technocrats',
  description: 'Learn about Technocrats, our team, our values, and our commitment to delivering exceptional technology solutions.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Facts/Stats Section */}
      <Facts />

      {/* Team Section */}
      <Team />

      {/* Tech Stack Section */}
      <Techstack />

      {/* Brands Marquee */}
      <MarqueeSlider />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <Cta />

      {/* Footer */}
      <Footer2 />
    </>
  )
}
