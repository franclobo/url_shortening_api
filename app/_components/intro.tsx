import Image from "next/image";
import IlustrationWorking from "../../public/images/illustration-working.svg";

export const Intro = () => {
  return (
    <section className="flex md:flex-row flex-col-reverse justify-center items-center md:text-left text-center gap-10 px-10 mb-20">
      <div className="flex flex-col md:items-start justify-center items-center gap-5">
        <h1 className="font-bold text-4xl md:text-6xl">More than just shorter links</h1>
        <p className="text-gray-600 md:text-xl">Build your brand's recognition and get detailed insights on how your links are performing.</p>
        <button className="text-white font-bold bg-cyan-500 px-10 py-2 rounded-2xl">Get Started</button>
      </div>
      <div>
        <Image src={IlustrationWorking} alt="Illustration Working"/>
      </div>
    </section>
  )
}
