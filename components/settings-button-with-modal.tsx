import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SettingsButtonWithModal() {
  return (
    <div className="container flex h-16 items-center justify-between px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-background p-6 shadow-xl">
          <div className="flex flex-col items-start gap-6">
            <Link
              key="month"
              href="#"
              className="text-lg font-medium transition-colors hover:text-primary"
              prefetch={false}
            >
              月
            </Link>
            <Link
              key="day"
              href="#"
              className="text-lg font-medium transition-colors hover:text-primary"
              prefetch={false}
            >
              日
            </Link>
            <Link
              key="admin"
              href="#"
              className="text-lg font-medium transition-colors hover:text-primary"
              prefetch={false}
            >
              管理者画面
            </Link>
            <Link
              key="logout"
              href="#"
              className="text-lg font-medium transition-colors hover:text-primary"
              prefetch={false}
            >
              ログアウト
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <nav className="hidden space-x-4 lg:flex">
        <Link
          href="#"
          className="text-lg font-medium transition-colors hover:text-primary"
          prefetch={false}
        >
          月
        </Link>
        <Link
          href="#"
          className="text-lg font-medium transition-colors hover:text-primary"
          prefetch={false}
        >
          日
        </Link>
        <Link
          href="#"
          className="text-lg font-medium transition-colors hover:text-primary"
          prefetch={false}
        >
          管理者画面
        </Link>
        <Link
          href="#"
          className="text-lg font-medium transition-colors hover:text-primary"
          prefetch={false}
        >
          ログアウト
        </Link>
      </nav>
    </div>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
