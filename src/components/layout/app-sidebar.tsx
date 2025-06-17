import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@components/ui/sidebar"
import Divider from "@common/divider"

import { Image, AudioLines, MicVocal, Trophy, Download } from "lucide-react"

const items = [
  {
    title: "Stats",
    url: "/stats",
    icon: AudioLines,
  },
  {
    title: "Topsters",
    url: "/topsters",
    icon: Trophy,
  },
  {
    title: "Covers",
    url: "/covers",
    icon: Download,
  },
  {
    title: "Lyrics cards",
    url: "/lyrics-cards",
    icon: MicVocal,
  },
  {
    title: "Tierlists",
    url: "/tierlists",
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
