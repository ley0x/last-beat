import { Logo } from "@/components/_common/logo";
import { Wrapper } from "../_common/wrapper";

export const Footer = () => {

  return (
    <footer className="bg-sidebar border border-t mt-5 py-5">
      <Wrapper className="flex-col">
        <div className="flex w-full justify-between">
          <div className="flex">
            <Logo withText className="ml-2 font-bold" />
          </div>
          <p className="text-center text-sm text-base-foreground">
            Made with ❤️ by ley0x.
          </p>
        </div>
      </Wrapper>
    </footer>
  );
};
