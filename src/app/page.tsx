import Leftbar from "./components/ui/Leftbar";
import MainContent from "./components/ui/MainContent";
import Sidebar from "./components/ui/Sidebar";

export default function Home() {
  return (
    <div className="w-full h-screen flex overflow-hidden bg-[#F2F2F2]">

      {/* Left Sidebar */}
      <div className="hidden md:flex md:w-[264px] lg:w-[282px] flex-shrink-0 h-screen overflow-y-auto">
        <Sidebar />
      </div>

      {/* Main Feed — only this scrolls */}
      <main className="flex-1 h-screen overflow-y-auto bg-[#F2F2F2] pb-16 md:pb-0">
        <MainContent />
      </main>

      {/* Right Panel */}
      <div className="hidden lg:flex lg:w-[317px] xl:w-[352px] flex-shrink-0 h-screen overflow-y-auto">
        <Leftbar />
      </div>

    </div>
  );
}
