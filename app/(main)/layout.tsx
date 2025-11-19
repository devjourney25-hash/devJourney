import Sidebar from "../../components/sidebar";
import { MobileHeader } from "@/components/mobile-header"; // ✅ Named import

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      {/* Mobile Header */}
      <MobileHeader />

      {/* Sidebar (Hidden on Mobile, Visible on LG Screens) */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="lg:pl-[256px] min-h-screen pt-[50px] xl:pt-0">
        <div className="max-w-[1440px] w-full mx-auto pt-6 px-4 lg:px-8">{children}</div> {/* Increased max-width and added padding */}
      </main>
    </>
  );
};

export default MainLayout;