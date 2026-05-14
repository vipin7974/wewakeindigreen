import Navbar from "./components/layout/Navbar";
import Hero from "./components/hero/Hero"
import Ticker from "./components/layout/Ticker";
import About from "./components/about/About";
import Story from "./components/story/Story";
import Biom from "./components/biom/Biom";
import ProductsSection from "./components/products/Products";
import SdgSection from "./components/sdg/SdgSection";
import BlogSection from "./components/blog/BlogSection";
import VisionMissionSection from "./components/vision/VisionMissionSection";
import ContactSection from "./components/contact/ContactSection";
import Footer from "./components/footer/Footer";
import { client } from "./lib/sanity/client";
import {
  heroQuery,
  blogsQuery
} from "./lib/sanity/queries";


export default async function HomePage() {
  const heroData =
    await client.fetch(heroQuery);
    const blogs =
    await client.fetch(
      blogsQuery
    );
  return (
    <main>
      <Navbar />
      <Hero data={heroData}/>
       <Ticker />
       <About/>
       <Story/>
       <Biom/>
       <ProductsSection/>
       <SdgSection/>
       <BlogSection blogs={blogs}/>
       <VisionMissionSection/>
       <ContactSection/>
       <Footer/>
    </main>
  );
}
