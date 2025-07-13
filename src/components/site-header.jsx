import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ShieldPlus } from "lucide-react";
export function SiteHeader() {
  return (
    (<header
      className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base flex  items-center text-gray-300 capitalize font-bold text-center gap-1 font-geist-sans">All Your Information In One Place <ShieldPlus size={20} strokeWidth={2.75} absoluteStrokeWidth /> </h1>
        <div className="ml-auto flex items-center gap-2">
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
    </header>)
  );
}
