
export function AboutHomeopathy() {
  return (
    <section id="homeopathy" className="homeo-section pl-0 md:pl-64 bg-gradient-to-br from-homeo-softPurple/20 to-homeo-softBlue/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="homeo-heading">About Homeopathy</h2>
            <p className="text-gray-600 mb-6">
              Homeopathy is a 200-year-old medical system that follows the principle of 'like cures like.' 
              It uses highly diluted natural substances to stimulate the body's own healing mechanisms.
            </p>
            <p className="text-gray-600 mb-6">
              Unlike conventional medicine that often targets symptoms, homeopathy addresses the whole person—physically, 
              mentally, and emotionally—seeking to identify and treat the underlying causes of illness.
            </p>
            <p className="text-gray-600 mb-6">
              Homeopathic remedies are prepared from plant, mineral, and animal substances through a 
              standardized process of dilution and succussion (vigorous shaking), making them gentle 
              yet effective.
            </p>
            <div className="mt-8">
              <a href="#bookings" className="homeo-button">
                Schedule a Consultation
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 animate-scale-in">
            <div className="rounded-2xl overflow-hidden h-48 bg-homeo-softPink flex items-center justify-center">
              {/* Placeholder for herb image */}
              <div className="text-center p-4">
                <span className="text-4xl">🌿</span>
                <p className="mt-2 font-medium text-homeo-dark">Natural Herbs</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden h-48 bg-homeo-softBlue flex items-center justify-center">
              {/* Placeholder for globules image */}
              <div className="text-center p-4">
                <span className="text-4xl">💊</span>
                <p className="mt-2 font-medium text-homeo-dark">Homeopathic Globules</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden h-48 bg-homeo-softBlue flex items-center justify-center">
              {/* Placeholder for consultation image */}
              <div className="text-center p-4">
                <span className="text-4xl">👩‍⚕️</span>
                <p className="mt-2 font-medium text-homeo-dark">Consultations</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden h-48 bg-homeo-softPink flex items-center justify-center">
              {/* Placeholder for medicine preparation image */}
              <div className="text-center p-4">
                <span className="text-4xl">🧪</span>
                <p className="mt-2 font-medium text-homeo-dark">Medicine Preparation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
