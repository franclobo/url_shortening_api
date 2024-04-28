import Image from "next/image";
import { Navbar } from "./_components/navbar";
import { Intro } from "./_components/intro";
import { Services } from './_components/services';
import { Footer } from "./_components/footer";


export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Intro />
      <Services />
      <Footer />
    </main>
  );
}
