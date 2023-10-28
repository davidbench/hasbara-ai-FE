import { FC } from "react";
import { ModeToggle } from "./mode-toggle";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className="container py-4 px-2 sm:px-4 flex justify-end">
      <ModeToggle />
    </div>
  );
};

export default Navbar;
