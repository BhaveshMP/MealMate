import NavbarContent from "../components/NavbarContent"; // Adjust the path if needed
import FooterContent from "../components/FooterContent";
import CarouselComponent from "../components/Carousel"; // Assuming you have a Carousel component

export default function Home() {
  return (
    <>
          <div className="flex flex-col min-h-screen">
      <NavbarContent />
      <main className="flex-1">
        <CarouselComponent />
      </main>
      <FooterContent />
    </div>
    </>
  );
}
