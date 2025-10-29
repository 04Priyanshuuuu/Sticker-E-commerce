"use client";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  return (
    <>
      <div className="hidden md:flex">
        <NavbarDesktop />
      </div>
      <div className="md:hidden">
        <NavbarMobile />
      </div>
    </>
  );
}
