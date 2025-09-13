import { ArrowRight, Mail, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section id="contact" className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let's discuss your project and explore how we can help you achieve your goals with cutting-edge technology solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
              Start Your Project
              <ArrowRight className="ml-2" size={20} />
            </button>
            <button className="border border-blue-300 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Schedule a Call
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center text-blue-100">
              <Mail className="mr-3" size={24} />
              <span className="text-lg">info@technocrats.com</span>
            </div>
            <div className="flex items-center justify-center text-blue-100">
              <Phone className="mr-3" size={24} />
              <span className="text-lg">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}