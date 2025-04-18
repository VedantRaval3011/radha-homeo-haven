
import { Calendar, Clock, User, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

export function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally submit the form data to a backend API
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      date: "",
      time: "",
      message: ""
    });
    alert("Thank you for your booking request! We'll contact you soon to confirm your appointment.");
  };

  return (
    <section id="bookings" className="homeo-section pl-0 md:pl-64 bg-gradient-to-br from-homeo-softPurple/30 to-homeo-softBlue/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="homeo-heading">Book a Consultation</h2>
            <p className="text-gray-600 mb-6">
              Schedule a personalized consultation with Dr. Radha to address your health concerns. 
              We offer both in-person and online appointment options.
            </p>
            
            <div className="space-y-6 mt-8">
              <div className="flex items-start">
                <div className="bg-homeo-softBlue p-3 rounded-full mr-4">
                  <User className="h-5 w-5 text-homeo-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-homeo-dark">Personalized Care</h3>
                  <p className="text-gray-600 text-sm">Each consultation is tailored to your unique health needs</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-homeo-softPink p-3 rounded-full mr-4">
                  <Clock className="h-5 w-5 text-homeo-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-homeo-dark">Comprehensive Assessment</h3>
                  <p className="text-gray-600 text-sm">Initial consultations typically last 45-60 minutes</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-homeo-softGreen p-3 rounded-full mr-4">
                  <Calendar className="h-5 w-5 text-homeo-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-homeo-dark">Flexible Scheduling</h3>
                  <p className="text-gray-600 text-sm">Choose from our available slots that fit your schedule</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="homeo-card animate-scale-in">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-homeo-dark mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-lg border border-gray-300 py-3 px-4 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-homeo-primary/50"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-homeo-dark mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-lg border border-gray-300 py-3 px-4 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-homeo-primary/50"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-homeo-dark mb-1">
                      Preferred Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="pl-10 w-full rounded-lg border border-gray-300 py-3 px-4 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-homeo-primary/50"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-homeo-dark mb-1">
                      Preferred Time
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="pl-10 w-full rounded-lg border border-gray-300 py-3 px-4 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-homeo-primary/50"
                        required
                      >
                        <option value="">Select Time</option>
                        <option value="morning">Morning (9AM - 12PM)</option>
                        <option value="afternoon">Afternoon (12PM - 4PM)</option>
                        <option value="evening">Evening (4PM - 7PM)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-homeo-dark mb-1">
                    Your Health Concerns
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="pl-10 w-full rounded-lg border border-gray-300 py-3 px-4 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-homeo-primary/50"
                      placeholder="Please briefly describe your health concerns..."
                      required
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button 
                    type="submit" 
                    className="homeo-button flex-1 flex items-center justify-center gap-2"
                  >
                    <Calendar className="h-5 w-5" />
                    Book a Call
                  </button>
                  
                  <button 
                    type="button" 
                    className="flex-1 px-6 py-3 rounded-full border-2 border-homeo-primary text-homeo-primary font-medium hover:bg-homeo-softPurple transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    Enquire Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
