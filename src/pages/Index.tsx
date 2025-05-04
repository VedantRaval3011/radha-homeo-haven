
import { Layout } from "../components/Layout";
import { Hero } from "../components/Hero";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { AboutHomeopathy } from "../components/AboutHomeopathy";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { FeaturedBlogs } from "../components/FeaturedBlogs";
import { Testimonials } from "../components/Testimonials";
import { Booking } from "../components/Booking";
import { WhyHomeopathy } from "../components/WhyHomeopathy";
import { FAQ } from "../components/FAQ";
import { Footer } from "../components/Footer";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <WhyChooseUs />
      <FeaturedProducts />
      {/* <AboutHomeopathy /> */}
      <FeaturedBlogs />
      <Testimonials />
      {/* <WhyHomeopathy /> */}
      <Booking />
      <FAQ />
      <Footer />
    </Layout>
  );
};

export default Index;