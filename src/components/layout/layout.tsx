import { AppSidebar } from '@layout/app-sidebar'
import { Navbar } from '@layout/navbar'
import { Footer } from '@layout/footer'

type Props = {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <AppSidebar />
      <div className="relative flex flex-col w-full h-max justify-between min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  )
}
