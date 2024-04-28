
'use client';
import { useState } from "react";
import Image from "next/image";
import Logo from "../../public/images/logo.svg";
import { SlMenu } from "react-icons/sl";

export const Navbar = () => {
  const menu = ["Features", "Pricing", "Resources", "Company"];
  const session = ["Login", "SignUp"];

  const [open, setOpen] = useState(false);
  const onhandleClick = () => {
    setOpen(!open);
  }

  return (
    <header className="flex flex-col md:flex-row md:justify-start md:items-center md:gap-20 p-10">
      <div className="flex justify-between">
        <Image src={Logo} alt="Shortly" className="md:m-0"/>
        <SlMenu onClick={onhandleClick} className="md:hidden"/>
      </div>
      <nav className="hidden md:flex md:flex-row md:items-center md:justify-between md:gap-20 w-full">
        <ul className="flex gap-4">
          {menu.map((item) => (
            <li key={item.toString()}>
              <a href="#" className="font-bold text-gray-500 hover:text-black transition-colors duration-300" target="_blank">{item}</a>
            </li>
          ))}
        </ul>
        <ul className="flex gap-4">
          {session.map((item) => (
            <li key={item.toString()}>
              <a href="#" className="font-bold w-full px-5 text-gray-500 hover:text-black hover:py-2 hover:bg-cyan-400 hover:rounded-2xl transition-colors duration-300">{item}</a>
            </li>
          ))}
        </ul>
      </nav>
      <nav className={`md:hidden flex fixed top-20 right-0 flex-col items-center justify-start bg-purple-900 rounded-lg text-white p-5 transition-transform transform w-full ${
          open ? "animate-menu-open" : "animate-menu-close"
        }`}
        style={{ transitionDuration: "0.5s" }}
      >
      <ul className="flex flex-col items-center justify-center gap-4">
        {menu.map((item) => (
          <li key={item.toString()}>
          <a href="#" className="font-bold" target="_blank">{item}</a>
          </li>
        ))}
      </ul>
      <div className="h-0.5 w-full bg-purple-400 my-5 md:hidden"></div>
      <ul className="flex flex-col items-center justify-center gap-4 w-full">
        {session.map((item) => (
          <li key={item.toString()} className="w-full text-center hover:py-2 hover:bg-cyan-400 hover:rounded-2xl transition-colors duration-300">
            <a href="#" className="font-bold w-full">{item}</a>
          </li>
        ))}
      </ul>
      </nav>
    </header>
  );
}