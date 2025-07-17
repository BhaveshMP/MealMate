import NavbarContent from "../components/NavbarContent"; // Adjust the path if needed
import FooterContent from "../components/FooterContent";
import CarouselComponent from "../components/Carousel"; // Assuming you have a Carousel component
import HomeHeroSection from "../components/HomeHeroSection"; // Importing the HomeHeroSection component

export default function Home() {
  return (
    <>
      <NavbarContent />
      <HomeHeroSection />
      <CarouselComponent />
      <FooterContent />
    </>
  );
}
