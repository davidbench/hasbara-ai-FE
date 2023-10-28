import { FC } from "react";
import ModeToggle from "./mode-toggle";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="container relative py-4 px-2 sm:px-4 flex justify-center">
      <p className="mx-auto text-lg">Hasbara AI</p>
      <ModeToggle className="absolute right-2 lg:right-0 top-1/2 transform -translate-y-1/2" />
    </div>
  );
};

export default Navbar;
