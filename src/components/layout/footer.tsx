import { Logo } from "@/components/_common/logo";
import { ToggleTheme } from "../_common/toggle-theme";

export const Footer = () => {

  const getYear = () => {
    return new Date().getFullYear()
  }

  return (
    <footer className="border-t border-primary/10 mt-5">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center sm:justify-start">
            <Logo withText className="ml-2 font-bold" />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <p className="mt-4 text-center text-sm text-primary/80 lg:mt-0 lg:text-right">
              Copyright &copy; {getYear()} ley0x. All rights reserved.
            </p>
            <ToggleTheme />
          </div>
        </div>
      </div>
    </footer>

  )
}
