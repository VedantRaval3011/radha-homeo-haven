
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Priyanka Sharma",
    location: "Delhi",
    image: "bg-homeo-softPink",
    rating: 5,
    text: "Dr. Radha's treatment for my chronic migraines has been life-changing. After years of dependency on painkillers, I'm now almost migraine-free with her homeopathic approach."
  },
  {
    id: 2,
    name: "Ankit Patel",
    location: "Mumbai",
    image: "bg-homeo-softBlue",
    rating: 5,
    text: "My 5-year-old son's recurring ear infections completely resolved after three months of Dr. Radha's treatment. We're so grateful for her gentle approach to children's health."
  },
  {
    id: 3,
    name: "Sarah Johnson",
    location: "Bangalore",
    image: "bg-homeo-softPurple",
    rating: 4,
    text: "The online consultation process was seamless and Dr. Radha spent nearly an hour understanding my health history. The remedies for my anxiety have been remarkably effective."
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    location: "Pune",
    image: "bg-homeo-softGreen",
    rating: 5,
    text: "After struggling with skin issues for decades, Dr. Radha's constitutional treatment approach has not only cleared my skin but improved my overall health and energy levels."
  },
  {
    id: 5,
    name: "Meera Desai",
    location: "Chennai",
    image: "bg-homeo-softYellow",
    rating: 5,
    text: "Dr. Radha's approach to women's health issues is exceptional. She treats the whole person, not just symptoms. My hormonal imbalances have improved dramatically under her care."
  }
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Display 3 testimonials at a time (current, previous, and next)
  const displayTestimonials = [
    testimonials[activeIndex],
    testimonials[(activeIndex + 1) % testimonials.length],
    testimonials[(activeIndex + 2) % testimonials.length]
  ];

  return (
    <section id="testimonials" className="homeo-section pl-0 md:pl-64">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="homeo-heading">What Our Patients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our patients who have experienced the transformative benefits of Dr. Radha's homeopathic care.
          </p>
        </div>

        <div className="relative">
          <div className="flex flex-wrap justify-center gap-6">
            {displayTestimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`homeo-card max-w-md ${index === 0 ? 'lg:scale-110 z-10 border-homeo-primary/30' : 'opacity-80'} animate-scale-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start mb-4">
                  <div className={`${testimonial.image} w-12 h-12 rounded-full flex items-center justify-center mr-4`}>
                    {/* User avatar placeholder */}
                    <span className="text-lg font-bold text-homeo-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-homeo-dark">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                    <div className="flex mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full border border-gray-200 hover:bg-homeo-softPurple hover:border-homeo-primary text-homeo-dark transition-colors duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full border border-gray-200 hover:bg-homeo-softPurple hover:border-homeo-primary text-homeo-dark transition-colors duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
