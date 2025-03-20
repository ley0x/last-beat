"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

type BreadcrumbProps = {
  page: string;
  username: string | null;
  subpage: string | null;
}

const BreadcrumbNav = ({ page, username, subpage }: BreadcrumbProps) => {
  if (!!subpage) return (
    <>
      <BreadcrumbItem>
        <BreadcrumbLink href={`/`} className="capitalize">Last Beat</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href={`/${page}`} className="capitalize">{page}</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href={`/${page}/${username}`}>{username}</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage className="capitalize">{subpage}</BreadcrumbPage>
      </BreadcrumbItem>
    </>)

  if (!!username) return (
    <>
      <BreadcrumbItem>
        <BreadcrumbLink href={`/`} className="capitalize">Last Beat</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href={`/${page}`} className="capitalize">{page}</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{username}</BreadcrumbPage>
      </BreadcrumbItem>
    </>
  )
  if (!!page) return (
    <>
      <BreadcrumbItem>
        <BreadcrumbLink href={`/`} className="capitalize">Last Beat</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage className="capitalize">{page}</BreadcrumbPage>
      </BreadcrumbItem>
    </>
  )
  return (
    <BreadcrumbItem>
      <BreadcrumbPage className="capitalize">Last Beat</BreadcrumbPage>
    </BreadcrumbItem>
  )
}
export const Navbar = () => {
  const pathname = usePathname();

  const parsedPathname = pathname.split("/").filter(elt => elt.length > 0)
  const page = parsedPathname[0];
  const username = parsedPathname[1] || null;
  const subpage = parsedPathname[2] || null;

  return (
    <nav className="flex gap-5 items-center bg-primary-foreground px-5 py-2 w-full border-b border-sidebar-border">
      <SidebarTrigger />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbNav page={page} username={username} subpage={subpage} />
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  )
}
