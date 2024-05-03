import Image from "next/image";
import Facebook from "../../public/images/icon-facebook.svg";
import Twitter from "../../public/images/icon-twitter.svg";
import Pinterest from "../../public/images/icon-pinterest.svg";
import Instagram from "../../public/images/icon-instagram.svg";

export const Footer = () => {
  return (
    <footer className="">
      <div className="bg_boost text-center py-24 flex flex-col items-center justify-center gap-4 bg-purple-950">
        <h2 className="font-bold text-3xl text-white">Boost your links today</h2>
        <button className="text-white font-bold bg-cyan-500 px-10 py-2 rounded-2xl">Get Started</button>
      </div>
      <div className="bg-gray-800 text-white flex flex-col items-center justify-center text-center py-10 md:flex-row md:justify-around md:items-start">
        <h2 className="text-3xl font-bold mb-5">Shortly</h2>
        <ul className="my-5 flex flex-col items-center justify-center gap-2 md:my-0">
          <li><h2 className="font-bold mb-5">Features</h2></li>
          <li className="text-gray-400">Link Shortering</li>
          <li className="text-gray-400">Branded Links</li>
          <li className="text-gray-400">Analitycs</li>
        </ul>
        <ul className="my-5 flex flex-col items-center justify-center gap-2 md:my-0">
          <li><h2 className="font-bold mb-5">Resources</h2></li>
          <li className="text-gray-400">Blog</li>
          <li className="text-gray-400">Developers</li>
          <li className="text-gray-400">Support</li>
        </ul>
        <ul className="my-5 flex flex-col items-center justify-center gap-2 md:my-0">
          <li><h2 className="font-bold mb-5">Company</h2></li>
          <li className="text-gray-400">About</li>
          <li className="text-gray-400">Our Team</li>
          <li className="text-gray-400">Careers</li>
          <li className="text-gray-400">Contact</li>
        </ul>
        <ul className="my-5 flex items-center justify-center gap-6 md:my-0">
          <li><Image src={Facebook} alt="Facebook" /></li>
          <li><Image src={Twitter} alt="Twitter" /></li>
          <li><Image src={Pinterest} alt="Pinterest" /></li>
          <li><Image src={Instagram} alt="Instagram" /></li>
        </ul>
      </div>
    </footer>
  )
}

