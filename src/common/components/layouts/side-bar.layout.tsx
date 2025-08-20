import { SidebarProvider } from "@/src/common/components/ui/sidebar";
import { AppSidebar } from "../custom/side-bar";
import { AppBar } from "./app-bar.layout";

export const SideBarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col flex-1">
        <AppBar />
        {children}
      </main>
    </SidebarProvider>
  );
};
