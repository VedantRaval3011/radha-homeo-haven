
export function FeaturedBlogs() {
  const blogs = [
    {
      id: 1,
      title: "5 Myths About Homeopathy Debunked",
      excerpt: "Explore common misconceptions about homeopathy and discover the scientific facts behind this holistic healing system.",
      image: "bg-homeo-softBlue",
      date: "Apr 12, 2025",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "How Homeopathy Helped My Child's Allergies",
      excerpt: "A mother's journey of treating her child's persistent allergies with homeopathic remedies and the surprising results.",
      image: "bg-homeo-softPink",
      date: "Apr 5, 2025",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Understanding Constitutional Treatment in Homeopathy",
      excerpt: "Learn how homeopaths assess your entire constitution to create a personalized treatment approach for lasting health.",
      image: "bg-homeo-softPurple",
      date: "Mar 28, 2025",
      readTime: "6 min read"
    }
  ];

  return (
    <section id="blog" className="homeo-section pl-0 md:pl-64 bg-gradient-to-br from-homeo-softBlue/20 to-homeo-softPurple/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="homeo-heading">Featured Blogs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed with our latest articles on homeopathy, natural healing, and holistic wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div 
              key={blog.id} 
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`${blog.image} h-48 relative`}>
                {/* Blog image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg">
                  Blog Image
                </div>
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-medium text-homeo-primary">
                  Homeopathy
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                  <span>{blog.date}</span>
                  <span>{blog.readTime}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-homeo-primary transition-colors duration-300">
                  {blog.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {blog.excerpt}
                </p>
                
                <a 
                  href="#" 
                  className="inline-flex items-center text-homeo-primary font-medium text-sm group-hover:translate-x-1 transition-transform duration-300"
                >
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10 animate-fade-in">
          <a 
            href="#" 
            className="inline-block px-6 py-3 border-2 border-homeo-primary text-homeo-primary rounded-full font-medium hover:bg-homeo-softPurple transition-colors duration-300"
          >
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
}
