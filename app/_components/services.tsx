'use client';
import Image from "next/image";
import { useContext } from 'react';
import { DataContext } from "../../context/DataProvider";
import { Formulary } from "./formulary";

export const Services = () => {
  const { data } = useContext(DataContext)
  return (
    <section className="relative flex flex-col items-center justify-center bg-gray-300 w-full px-10 pt-20 gap-4 text-center">
      <div className="absolute -top-24">
        <Formulary />
      </div>
      <h2 className="font-bold text-2xl mt-10">Advanced Statistics</h2>
      <p>Track how your links are performing across the web with our advanced statistics dashboard.</p>
      <div className="my-20">
      {data.map((item, index) => (
          <div key={index.toString()} className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-lg relative">
              <div className="bg-purple-950 p-5 rounded-full absolute -top-10">
                <Image src={item.image} alt={item.title} width={"50"} height={"50"}/>
              </div>
              <div className="flex flex-col items-center justify-center mt-10 gap-4">
                <h3 className="font-bold text-xl">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
            {index !== data.length - 1 && <div className="w-1 h-20 bg-cyan-500"></div>}
          </div>
        ))}
      </div>
    </section>
  )
}
