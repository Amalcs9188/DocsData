import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ShieldPlus } from "lucide-react";
import { Switch } from "./ui/switch";
import { useTheme } from "next-themes";
export function SiteHeader() {
  const { setTheme } = useTheme();
  return (
    <header className="flex w-full py-2 md:py-0 h-(--header-height) bg-background shrink-0 items-center gap-2 border-b-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className=" w-full flex justify-center items-center">
          <h1 style={{ color: "var(--headerTeaxt)" }} className="text-base flex  items-center  mr-4  capitalize font-bold text-center gap-1 font-geist-sans">
            All Your Information In One Place{" "}
            <ShieldPlus size={20} strokeWidth={2.75} absoluteStrokeWidth />{" "}
          </h1>
        </div>{" "}
        <div className="ml-auto flex items-center gap-2">
          <Switch onCheckedChange={(e) => { setTheme(e ? "dark" : "light");
          }} className="text-black"/>
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/Amalcs9188/DocsData"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground">
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
