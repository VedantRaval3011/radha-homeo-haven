
import { 
  Award, 
  Baby, 
  Leaf, 
  Phone, 
  MessageSquare 
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Certified & Experienced Homeopath",
    description: "With over 10 years of experience and proper certifications, Dr. Radha ensures the highest quality of homeopathic care.",
    color: "bg-homeo-softBlue"
  },
  {
    icon: Baby,
    title: "Safe for all age groups including infants",
    description: "Our treatments are gentle and suitable for everyone from infants to the elderly, providing care at every stage of life.",
    color: "bg-homeo-softPink"
  },
  {
    icon: Leaf,
    title: "Natural & Side-Effect Free Treatments",
    description: "Homeopathic remedies are derived from natural sources and rarely cause any side effects, making them safe for long-term use.",
    color: "bg-homeo-softGreen"
  },
  {
    icon: Phone,
    title: "Online & Offline Consultations",
    description: "We offer flexible consultation options, whether you prefer visiting our clinic or the convenience of online appointments.",
    color: "bg-homeo-softPurple"
  },
  {
    icon: MessageSquare,
    title: "Personalized Attention & Long-Term Care",
    description: "Every patient receives individualized treatment plans based on their unique constitution and health concerns.",
    color: "bg-homeo-softYellow"
  }
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="homeo-section pl-0 md:pl-64">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="homeo-heading">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At Dr. Radha's Homeopathy, we're committed to providing gentle, holistic
            care that addresses the root causes of your health concerns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="homeo-card group transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`${feature.color} p-4 rounded-full inline-flex mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6 text-homeo-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-homeo-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
