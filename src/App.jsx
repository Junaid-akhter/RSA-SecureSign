import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutRSA from "./components/AboutRSA";
import Workspace from "./components/Workspace";
import Footer from "./components/Footer";
import { useRSA } from "./hooks/useRSA";

function App() {
  const rsa = useRSA();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#F6F3EC] text-[#5A3E2B]">
      <div className="pointer-events-none absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full bg-[#DCE8D2] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full bg-[#F6E3C6] blur-3xl" />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:px-10">
        <Hero />
        <AboutRSA />
        <Workspace {...rsa} />
        <Footer />
      </main>
    </div>
  );
}

export default App;
