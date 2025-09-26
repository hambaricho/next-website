
import Cards from "@/components/section/Cards";
import Contact from "@/components/section/Contact";
import Images from "@/components/section/Images";
import Landing from "@/components/section/Landing";
import CrftdComponent from "@/components/section/Services";
import ExportHero from "@/components/section/ExportHero";

export default function Home() {
  return (
    <>
      <div className="relative bg-secondary">
        <Landing />
        <Cards />
      </div>
      <Images />
      <CrftdComponent />
      <ExportHero />
      <Contact />
    </>
  );
}
