
import { 
  HeartPulse,
  Sprout,
  Scale,
  Stethoscope
} from "lucide-react";

const benefits = [
  {
    icon: HeartPulse,
    title: "Long-term Relief",
    description: "Instead of merely suppressing symptoms, homeopathy aims to address the root cause of health issues for lasting relief.",
    color: "bg-homeo-softPink"
  },
  {
    icon: Sprout,
    title: "Natural Healing",
    description: "Homeopathic remedies enhance your body's natural healing processes without the side effects of conventional medications.",
    color: "bg-homeo-softGreen"
  },
  {
    icon: Scale,
    title: "Mind-Body Balance",
    description: "Treatments consider not just physical symptoms but also emotional and mental aspects for holistic healing.",
    color: "bg-homeo-softPurple"
  },
  {
    icon: Stethoscope,
    title: "Works with Conventional Treatment",
    description: "Homeopathy can complement conventional medical treatments for enhanced effects and reduced side effects.",
    color: "bg-homeo-softBlue"
  }
];

export function WhyHomeopathy() {
  return (
    <section id="why-homeopathy" className="homeo-section pl-0 md:pl-64">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 animate-fade-in">
          <h2 className="homeo-heading">Why Homeopathy?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the unique benefits of homeopathic treatment as a safe, gentle, and effective approach to healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="homeo-card text-center group h-full flex flex-col justify-between animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div>
                <div className={`${benefit.color} mx-auto p-4 rounded-full inline-flex mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="h-6 w-6 text-homeo-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-homeo-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
              
              <div className="mt-6 text-homeo-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-md p-8 border border-gray-100 animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-homeo-primary mb-2">200+</div>
              <p className="text-gray-600">Years of Homeopathic Practice</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-homeo-primary mb-2">6000+</div>
              <p className="text-gray-600">Homeopathic Medicines</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-homeo-primary mb-2">80+</div>
              <p className="text-gray-600">Countries Using Homeopathy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
