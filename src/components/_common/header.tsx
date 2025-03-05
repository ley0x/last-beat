import { cx } from "class-variance-authority";

type Props = {
  children: React.ReactNode,
  className?: string,
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Header = ({ children, as = "h1", className }: Props) => {
  const HeaderTag = as;
  return (
    <HeaderTag className={cx("mt-2 mb-4 font-bold", {
      "text-2xl": as === "h1",
      "text-xl": as === "h2",
      "text-lg": as === "h3",
      "text-base": as === "h4",
      "text-sm": as === "h5",
      "text-xs": as === "h6",
    }, className)}>
      {children}
    </HeaderTag>
  )
}

export default Header;
