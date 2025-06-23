import { AppSidebar } from "@layout/app-sidebar";
import { Navbar } from "@layout/navbar";

type Props = {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <AppSidebar />
      <div className="flex flex-col w-full min-h-screen">
        <Navbar />
        {children}
      </div>
    </>
  )
}
