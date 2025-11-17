import PageTitle from '@/components/frontend/other-pages/contact/PageTitle'
import ContactForm from '@/components/frontend/other-pages/contact/ContactForm'
import Locations from '@/components/frontend/other-pages/contact/Locations'
import Socials from '@/components/frontend/other-pages/contact/Socials'
import Footer2 from '@/components/frontend/footers/Footer2'

export const metadata = {
  title: 'Contact Us - Technocrats',
  description: 'Get in touch with Technocrats. We\'re here to help with your technology needs and answer any questions you may have.',
}

export default function ContactPage() {
  return (
    <>
      {/* Page Title */}
      <PageTitle />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Locations Section */}
      <Locations />

      {/* Social Media Links */}
      <Socials />

      {/* Footer */}
      <Footer2 />
    </>
  )
}
