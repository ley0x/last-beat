"use client";
import { Button } from "@/components/ui/button";

import { v4 as uuidv4 } from 'uuid';
import { Flame, ChartPie, MicVocal, Trophy, House } from "lucide-react"
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation'

import { usePathname } from 'next/navigation'
import { ToggleTheme } from "../_common/toggle-theme";
import { Wrapper } from "../_common/wrapper";

const items = [
  {
    title: "Stats",
    url: "/stats",
    icon: Flame,
  },
  {
    title: "Charts",
    url: "/charts",
    icon: ChartPie,
  },
  {
    title: "Cards",
    url: "/cards",
    icon: MicVocal,
  },
  {
    title: "Topsters",
    url: "/topsters",
    icon: Trophy,
  }
]

type Props = {
  className?: string;
}

const Navbar = ({ className }: Props) => {
  const pathname = usePathname();
  const router = useRouter()
  const getCurrentPage = () => {
    if (pathname === "/") return { url: "/", title: "Home", icon: House };
    const currentPage = items.find((item) => pathname.startsWith(item.url));
    console.log("Current page:", currentPage);
    console.log(pathname)
    return currentPage;
  }

  return (
    <nav className={cn("flex justify-between p-5 items-center h-16 gap-x-5 bg-primary-foreground border-b border-foreground/5", className)}>
      <Wrapper className="w-full flex justify-between">
        <section className="flex items-center gap-x-5">
          <Button variant="outline" size="icon" className={cn(getCurrentPage()?.url === "/" ? "border border-red-400" : "", "bg-primary-foreground/50")} onClick={() => router.push("/")}>
            <House />
          </Button>
          {items.map((item) => (
            <Button
              variant="outline"
              key={uuidv4()}
              onClick={() => router.push(item.url)}
              className={cn(getCurrentPage()?.url === item.url ? "border border-red-400" : "", "bg-primary-foreground/50")}
            >
              <item.icon /> <span>{item.title}</span>
            </Button>
          ))}
        </section>
        <section className="flex items-center gap-x-5">
          <ToggleTheme />
        </section>
      </Wrapper>
    </nav>
  )
}

export default Navbar;
