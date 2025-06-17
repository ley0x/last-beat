import { AvailableColors } from "@lib/types";
import { cn } from "@lib/utils";

type Props = {
  className?: string;
  color: AvailableColors;
}

const svgColorMap: Record<AvailableColors, string> = {
  red: "fill-red-500 stroke-red-500",
  orange: "fill-orange-500 stroke-orange-500",
  amber: "fill-amber-500 stroke-amber-500",
  yellow: "fill-yellow-500 stroke-yellow-500",
  green: "fill-green-500 stroke-green-500",
  emerald: "fill-emerald-500 stroke-emerald-500",
  cyan: "fill-cyan-500 stroke-cyan-500",
  sky: "fill-sky-500 stroke-sky-500",
  blue: "fill-blue-500 stroke-blue-500",
  indigo: "fill-indigo-500 stroke-indigo-500",
  purple: "fill-purple-500 stroke-purple-500",
  pink: "fill-pink-500 stroke-pink-500",
  rose: "fill-rose-500 stroke-rose-500",
  white: "fill-neutral-50 stroke-neutral-50",
  black: "fill-neutral-950 stroke-neutral-950",
}

export const Quote = ({ className, color }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      viewBox="0 0 512 512"
      version="1.1"
      xmlSpace="preserve"
      className={cn(svgColorMap[color], className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g>
        <path d="M119.472,66.59C53.489,66.59,0,120.094,0,186.1c0,65.983,53.489,119.487,119.472,119.487
		c0,0-0.578,44.392-36.642,108.284c-4.006,12.802,3.135,26.435,15.945,30.418c9.089,2.859,18.653,0.08,24.829-6.389
		c82.925-90.7,115.385-197.448,115.385-251.8C238.989,120.094,185.501,66.59,119.472,66.59z"/>
        <path d="M392.482,66.59c-65.983,0-119.472,53.505-119.472,119.51c0,65.983,53.489,119.487,119.472,119.487
		c0,0-0.578,44.392-36.642,108.284c-4.006,12.802,3.136,26.435,15.945,30.418c9.089,2.859,18.653,0.08,24.828-6.389
		C479.539,347.2,512,240.452,512,186.1C512,120.094,458.511,66.59,392.482,66.59z"/>
      </g>
    </svg>
  )
}
