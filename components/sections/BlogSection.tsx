import { Calendar, ArrowRight } from "lucide-react";

export function BlogSection() {
  const posts = [
    {
      title: "The Future of AI in Software Development",
      excerpt: "Exploring how artificial intelligence is revolutionizing the way we build and maintain software applications.",
      date: "2024-01-15",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "AI & Technology",
    },
    {
      title: "Building Scalable Enterprise Applications",
      excerpt: "Best practices and architectural patterns for developing enterprise-grade software that can scale with your business.",
      date: "2024-01-10",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Enterprise",
    },
    {
      title: "Mobile App Security: A Complete Guide",
      excerpt: "Essential security measures every mobile app developer should implement to protect user data and prevent breaches.",
      date: "2024-01-05",
      image: "https://images.pexels.com/photos/4386433/pexels-photo-4386433.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Mobile Security",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends, best practices, and insights from the world of software development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-blue-600 font-medium mb-2">
                  {post.category}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar size={16} className="mr-2" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                    Read More
                    <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}