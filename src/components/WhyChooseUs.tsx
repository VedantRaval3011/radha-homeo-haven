
import { 
  Award, 
  Baby, 
  Leaf, 
  Phone, 
  MessageSquare 
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Award,
    title: "Certified & Experienced Homeopath",
    description: "With over 10 years of experience and proper certifications, Dr. Radha ensures the highest quality of homeopathic care.",
    color: "bg-homeo-softBlue dark:bg-blue-900/30",
    iconColor: "text-blue-500 dark:text-blue-400"
  },
  {
    icon: Baby,
    title: "Safe for all age groups including infants",
    description: "Our treatments are gentle and suitable for everyone from infants to the elderly, providing care at every stage of life.",
    color: "bg-homeo-softPink dark:bg-pink-900/30",
    iconColor: "text-pink-500 dark:text-pink-400"
  },
  {
    icon: Leaf,
    title: "Natural & Side-Effect Free Treatments",
    description: "Homeopathic remedies are derived from natural sources and rarely cause any side effects, making them safe for long-term use.",
    color: "bg-homeo-softGreen dark:bg-green-900/30",
    iconColor: "text-green-500 dark:text-green-400"
  },
  {
    icon: Phone,
    title: "Online & Offline Consultations",
    description: "We offer flexible consultation options, whether you prefer visiting our clinic or the convenience of online appointments.",
    color: "bg-homeo-softPurple dark:bg-purple-900/30",
    iconColor: "text-purple-500 dark:text-purple-400"
  },
  {
    icon: MessageSquare,
    title: "Personalized Attention & Long-Term Care",
    description: "Every patient receives individualized treatment plans based on their unique constitution and health concerns.",
    color: "bg-homeo-softYellow dark:bg-yellow-900/30",
    iconColor: "text-yellow-500 dark:text-yellow-400"
  }
];

export function WhyChooseUs() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="why-choose-us" className="homeo-section pl-0 md:pl-20 lg:pl-64 relative wavy-divider">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="gradient-text inline-block text-4xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            At Dr. Radha's Homeopathy, we're committed to providing gentle, holistic
            care that addresses the root causes of your health concerns.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="homeo-card group transition-all duration-300 hover:translate-y-[-5px]"
              variants={item}
              whileHover={{ scale: 1.03 }}
            >
              <div className={`${feature.color} p-4 rounded-full inline-flex mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-homeo-primary dark:group-hover:text-homeo-light transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Call to Action band */}
      <motion.div 
        className="mt-24 py-12 bg-gradient-to-r from-homeo-primary to-homeo-secondary dark:from-homeo-tertiary dark:to-homeo-primary rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-white text-2xl md:text-3xl font-bold mb-6">
            Start your healing journey today – Book a Consultation
          </h3>
          <a
            href="#bookings"
            className="inline-flex items-center px-6 py-3 rounded-full bg-white text-homeo-primary hover:bg-gray-100 transition-colors duration-300 shadow-md font-medium"
          >
            Book a Consultation
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
