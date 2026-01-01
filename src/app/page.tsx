import Leftbar from "./components/ui/Leftbar";
import MainContent from "./components/ui/MainContent";
import Sidebar from "./components/ui/Sidebar";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-[#020d1f]">
      {/* Sidebar: fixed on desktop, bottom navigation on mobile */}
      <div className="md:w-64 md:min-w-[256px] md:max-w-[256px]">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 px-4 md:px-8 py-6 max-w-4xl mx-auto w-full
                     border-x border-[#1a2942] bg-gradient-to-b from-[#051530] to-[#0a1f3f]">
        <MainContent />
      </main>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-80 min-w-[320px] max-w-[320px]">
        <Leftbar />
      </div>
    </div>
  );
}
