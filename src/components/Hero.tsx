
import { Star, Calendar } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="min-h-screen pt-8 pl-0 md:pl-64 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-3/4 h-full bg-homeo-softBlue opacity-20 rounded-bl-[200px] -z-10"></div>
      
      <div className="homeo-section h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-start space-y-6 animate-fade-in">
            <div className="bg-homeo-softPurple text-homeo-primary px-4 py-2 rounded-full text-sm font-medium inline-flex items-center">
              <span className="mr-2">★</span>
              <span>Trusted Homeopathy Care</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-homeo-dark leading-tight">
              Welcome to <span className="text-homeo-primary">DR. Radha's</span> Homeopathy
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl">
              Gentle, holistic, sustainable health for you and your children through all stages of life
            </p>
            
            <h2 className="text-2xl font-semibold text-homeo-secondary">
              Your Online Homeopathy
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a href="#bookings" className="homeo-button flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Book an Appointment
              </a>
              
              <a href="#about" className="px-6 py-3 rounded-full border-2 border-homeo-primary text-homeo-primary font-medium hover:bg-homeo-softPurple transition-all duration-300">
                Learn More
              </a>
            </div>
            
            <div className="mt-8">
              <div className="text-sm font-medium text-homeo-secondary mb-2">
                Trusted by hundreds of patients
              </div>
              <div className="flex flex-col space-y-4">
                {[
                  { name: "Sarah M.", comment: "Dr. Radha's treatments changed my life!", rating: 5 },
                  { name: "David K.", comment: "Exceptional care and compassion.", rating: 5 },
                  { name: "Priya S.", comment: "Helped my child's chronic condition.", rating: 4 },
                ].map((testimonial, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 animate-scale-in" style={{ animationDelay: `${index * 150}ms` }}>
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-homeo-dark">{testimonial.name}</div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{testimonial.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-center items-center relative animate-scale-in">
            <div className="absolute w-80 h-80 bg-homeo-softPeach rounded-full -z-10 transform translate-x-4 translate-y-4"></div>
            <div className="w-80 h-96 bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
              {/* Placeholder for Dr. Radha's image */}
              <div className="w-full h-full bg-gradient-to-br from-homeo-softBlue to-homeo-softPurple flex items-center justify-center">
                <span className="text-homeo-primary font-semibold text-lg">Dr. Radha Dangi</span>
              </div>
            </div>
            
            <div className="absolute bottom-4 right-4 bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="text-3xl font-bold text-homeo-primary">10+</div>
                  <div className="text-xs text-gray-500">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-homeo-primary">500+</div>
                  <div className="text-xs text-gray-500">Happy Patients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
            <div className="mb-4 sm:mb-0">
              <span className="font-medium text-homeo-dark">Dr. Radha Dangi</span>
              <div className="flex items-center mt-1">
                <span className="mr-2">📍</span>
                <span>Address: Lorem, Lorem Ipsum 12</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-homeo-softBlue text-homeo-primary transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-homeo-softPink text-homeo-primary transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-homeo-softGreen text-homeo-primary transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-homeo-softYellow text-homeo-primary transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.7 3H4.3C3.582 3 3 3.582 3 4.3v15.4c0 .718.582 1.3 1.3 1.3h15.4c.718 0 1.3-.582 1.3-1.3V4.3c0-.718-.582-1.3-1.3-1.3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
