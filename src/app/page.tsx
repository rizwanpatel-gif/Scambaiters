import Leftbar from "./components/ui/Leftbar";
import MainContent from "./components/ui/MainContent";
import Sidebar from "./components/ui/Sidebar";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex bg-[#111111]">

      {/* Left Sidebar — +10% wider: 60→[264px] / 64→[282px] */}
      <div className="hidden md:flex md:w-[264px] lg:w-[282px] flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Feed */}
      <main className="flex-1 min-h-screen bg-[#111111] border-x border-white/[0.06] overflow-y-auto">
        <MainContent />
      </main>

      {/* Right Panel — +10% wider: 72→[317px] / 80→[352px] */}
      <div className="hidden lg:flex lg:w-[317px] xl:w-[352px] flex-shrink-0">
        <Leftbar />
      </div>

    </div>
  );
}
