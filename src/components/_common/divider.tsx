import { cx } from 'class-variance-authority';

type Props = {
  className?: string;
}

const Divider = ({ className }: Props) => {
  return (
    <div className={cx("h-[2px] my-5 w-full bg-card-foreground/5", className)}></div>
  )
}

export default Divider;
