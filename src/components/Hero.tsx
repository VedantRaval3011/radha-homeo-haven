
import { Star, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="home" className="min-h-screen pt-0 pl-0 md:pl-20 lg:pl-64 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-br from-homeo-softBlue to-homeo-softPurple dark:from-blue-900/20 dark:to-purple-900/20 opacity-20 rounded-bl-[200px] -z-10"></div>

      {/* Animated background particles */}
      <div className="absolute inset-0 -z-10 opacity-30">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-homeo-primary dark:bg-homeo-light"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      <div className="homeo-section h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="flex flex-col items-start space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="bg-homeo-softPurple dark:bg-homeo-tertiary/30 text-homeo-primary dark:text-homeo-light px-4 py-2 rounded-full text-sm font-medium inline-flex items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="mr-2">★</span>
              <span>Trusted Homeopathy Care</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Welcome to <span className="gradient-text">DR. Radha's</span> Homeopathy
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Gentle, holistic, sustainable health for you and your children through all stages of life
            </motion.p>
            
            <motion.h2 
              className="text-2xl font-semibold text-homeo-secondary dark:text-homeo-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Your Online Homeopathy
            </motion.h2>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <a href="#bookings" className="bg-gradient-to-r from-homeo-primary to-homeo-secondary hover:from-homeo-secondary hover:to-homeo-primary text-white font-medium rounded-full px-6 py-3 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Book an Appointment
              </a>
              
              <a href="#about" className="relative group px-6 py-3 rounded-full border-2 border-homeo-primary dark:border-homeo-light text-homeo-primary dark:text-homeo-light font-medium hover:bg-homeo-softPurple dark:hover:bg-homeo-tertiary/30 transition-all duration-300 flex items-center gap-2">
                Learn More
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
            
            <motion.div 
              className="mt-8 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <div className="text-sm font-medium text-homeo-secondary dark:text-homeo-light mb-2">
                Trusted by hundreds of patients
              </div>
              <div className="flex flex-col space-y-4">
                {[
                  { name: "Sarah M.", comment: "Dr. Radha's treatments changed my life!", rating: 5 },
                  { name: "David K.", comment: "Exceptional care and compassion.", rating: 5 },
                  { name: "Priya S.", comment: "Helped my child's chronic condition.", rating: 4 },
                ].map((testimonial, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-white dark:bg-card rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.5 + (index * 0.2) }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-homeo-dark dark:text-white">{testimonial.name}</div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{testimonial.comment}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="hidden lg:flex justify-center items-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="absolute w-80 h-80 bg-gradient-to-br from-homeo-softPeach to-homeo-softPink dark:from-pink-900/30 dark:to-purple-900/30 rounded-full -z-10 transform translate-x-4 translate-y-4"></div>
            <motion.div 
              className="w-80 h-96 bg-gradient-to-br from-homeo-softBlue via-homeo-softPurple to-homeo-softPink dark:from-green-700/40 dark:via-green-900/40 dark:to-green-900/40 rounded-2xl overflow-hidden shadow-xl relative floating-animation"
            >
              {/* Placeholder for Dr. Radha's image */}
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-homeo-primary dark:text-white font-semibold text-lg">Dr. Radha Dangi</span>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-homeo-softGreen dark:bg-green-900/30 opacity-60"></div>
              <div className="absolute bottom-4 -left-4 w-16 h-16 rounded-full bg-homeo-softYellow dark:bg-yellow-900/30 opacity-60"></div>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-4 right-4 bg-white dark:bg-card rounded-xl p-4 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="text-3xl font-bold text-homeo-primary dark:text-homeo-light">10+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-homeo-primary dark:text-homeo-light">500+</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Happy Patients</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="mb-4 sm:mb-0">
              <span className="font-medium text-homeo-dark dark:text-white">Dr. Radha Dangi</span>
              <div className="flex items-center mt-1">
                <span className="mr-2">📍</span>
                <span>Address: Lorem, Lorem Ipsum 12</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-homeo-softBlue dark:hover:bg-blue-900/30 text-homeo-primary dark:text-homeo-light transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-homeo-softPink dark:hover:bg-pink-900/30 text-homeo-primary dark:text-homeo-light transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-homeo-softGreen dark:hover:bg-green-900/30 text-homeo-primary dark:text-homeo-light transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-homeo-softYellow dark:hover:bg-yellow-900/30 text-homeo-primary dark:text-homeo-light transition-colors duration-200">
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
