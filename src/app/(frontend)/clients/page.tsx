import PageTitle from '@/components/frontend/other-pages/contact/PageTitle'
import Partners from '@/components/frontend/homes/home-digital-agency/Partners'
import Testimonials from '@/components/frontend/common/Testimonials'
import Facts from '@/components/frontend/homes/home-software-development-company/Facts'
import Cta from '@/components/frontend/common/Cta'
import Footer2 from '@/components/frontend/footers/Footer2'

export const metadata = {
  title: 'Our Clients - Technocrats',
  description: 'Trusted by leading companies worldwide. See who we\'ve worked with and what they say about us.',
}

export default function ClientsPage() {
  return (
    <>
      {/* Page Title */}
      <div className="mxd-section padding-single-small">
        <div className="mxd-container grid-container">
          <div className="mxd-block">
            <div className="mxd-section-title text-center">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12">
                    <h1 className="mxd-section-title__title">
                      <span className="reveal-type anim-uni-in-up">Our Clients & Partners</span>
                    </h1>
                  </div>
                  <div className="col-12">
                    <p className="mxd-section-title__descr anim-uni-in-up">
                      Trusted by industry leaders and innovative startups worldwide.
                      <br />
                      Here are some of the amazing companies we've had the pleasure to work with.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Logos */}
      <Partners />

      {/* Stats */}
      <Facts />

      {/* Client Testimonials */}
      <Testimonials />

      {/* CTA */}
      <Cta />

      {/* Footer */}
      <Footer2 />
    </>
  )
}
