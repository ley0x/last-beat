import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Divider from "@/components/_common/divider"

import { Image, AudioLines, ChartPie, MicVocal, Trophy, Download, Calendar } from "lucide-react"

const items = [
  {
    title: "Stats",
    url: "/stats",
    icon: AudioLines,
  },
  {
    title: "Charts",
    url: "/charts",
    icon: ChartPie,
  },
  {
    title: "AOTY",
    url: "/aoty",
    icon: Calendar,
  },
  {
    title: "Topsters",
    url: "/topsters",
    icon: Trophy,
  },
  {
    title: "Cover download",
    url: "/cover-download",
    icon: Download,
  },
  {
    title: "Lyrics cards",
    url: "/lyrics-cards",
    icon: MicVocal,
  },
  {
    title: "Image generator",
    url: "/image-generator",
    icon: Image,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupLabel>Last Beat</SidebarGroupLabel>
          <Divider className="my-1" />
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
