export function SolutionsSection() {
  const solutions = [
    {
      title: "Healthcare Solutions",
      description: "HIPAA-compliant healthcare software, telemedicine platforms, and patient management systems.",
      image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Financial Technology",
      description: "Secure fintech applications, payment processing systems, and blockchain solutions.",
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "E-commerce Platforms",
      description: "Scalable e-commerce solutions with advanced features and seamless user experiences.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Government Solutions",
      description: "Secure, compliant software solutions for government agencies and public sector organizations.",
      image: "https://images.pexels.com/photos/8112198/pexels-photo-8112198.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Industry Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We specialize in delivering tailored solutions across various industries with deep domain expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity"></div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {solution.title}
              </h3>
              <p className="text-gray-600">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}