import { getAllTestimonials } from "@/lib/api";
import { Testimonial } from "@/types/payload";
import TestimonialsClient from "./TestimonialsClient";

export default async function Testimonials() {
  const testimonials = await getAllTestimonials<Testimonial>();

  // Filter for featured testimonials or show all
  const displayTestimonials = testimonials.filter((t) => t.featured) || testimonials;

  return <TestimonialsClient testimonials={displayTestimonials.slice(0, 5)} />;
}
