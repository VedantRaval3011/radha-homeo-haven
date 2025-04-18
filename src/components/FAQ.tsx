
import { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Is homeopathy safe for children?",
    answer: "Yes, homeopathy is completely safe for children of all ages, including infants. The remedies are highly diluted, non-toxic, and free from side effects, making them gentle yet effective for treating childhood conditions like teething, colic, ear infections, and behavioral issues."
  },
  {
    question: "How soon can I expect results?",
    answer: "Results vary depending on the condition being treated. Acute conditions like colds or fevers may improve within hours or days. Chronic conditions that have developed over years typically require more time, with gradual improvement over weeks or months. Dr. Radha will provide a timeline expectation during your consultation."
  },
  {
    question: "Are online consultations available?",
    answer: "Yes, we offer comprehensive online consultations through secure video platforms. These sessions are just as thorough as in-person visits, allowing Dr. Radha to assess your condition, take your case history, and prescribe appropriate remedies. Medicines can be couriered to your address or obtained from local homeopathic pharmacies."
  },
  {
    question: "Can homeopathy treat chronic conditions?",
    answer: "Homeopathy excels at addressing chronic conditions where conventional treatments may only manage symptoms. Conditions like allergies, asthma, arthritis, eczema, psoriasis, migraines, depression, and anxiety often respond very well to constitutional homeopathic treatment that addresses the underlying causes."
  },
  {
    question: "Can I take homeopathic remedies alongside conventional medications?",
    answer: "In most cases, yes. Homeopathic remedies work on a different principle than conventional medications and generally don't interfere with them. However, it's important to inform Dr. Radha about all medications you're taking during your consultation for personalized advice."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="homeo-section pl-0 md:pl-64">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="homeo-heading">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about homeopathic treatment and our practice.
          </p>
        </div>

        <div className="space-y-4 animate-fade-in">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-semibold text-homeo-dark">
                  {faq.question}
                </h3>
                <div className={`p-1 rounded-full ${openIndex === index ? 'bg-homeo-softPurple' : 'bg-gray-100'} transition-colors duration-300`}>
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 text-homeo-primary" />
                  ) : (
                    <Plus className="h-5 w-5 text-homeo-dark" />
                  )}
                </div>
              </button>
              <div 
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-gray-600 border-t border-gray-100">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-in">
          <p className="text-gray-600 mb-4">
            Still have questions? Feel free to reach out to us directly.
          </p>
          <a 
            href="#contact" 
            className="homeo-button inline-flex items-center"
          >
            Contact Us
            <ChevronDown className="h-4 w-4 ml-2 animate-pulse-soft" />
          </a>
        </div>
      </div>
    </section>
  );
}
