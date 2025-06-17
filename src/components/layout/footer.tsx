import { Logo } from "@common/logo";
import { Wrapper } from "@common/wrapper";

import BackToTop from "@layout/back-to-top";

export const Footer = () => {

  return (
    <footer className="bg-background/80 border-t mt-5 py-5">
      <Wrapper className="flex-col">
        <div className="flex w-full justify-between flex-wrap gap-y2">
          <div className="flex">
            <Logo withText className="ml-2 font-bold" />
          </div>
          <div className="flex items-center gap-x-4">

            <p className="flex items-center text-center text-sm text-base-foreground">
              Made with ❤️ by ley0x.
            </p>
            <BackToTop />
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};
