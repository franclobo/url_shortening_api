'use client';
import { useContext, useState, useEffect } from 'react';
import Image from "next/image";
import { DataContext } from "../../context/DataProvider";
import { Formulary } from "./formulary";
import { Results } from "./results";

export const Services = () => {
  const { data } = useContext(DataContext);
  const [shortenedUrls, setShortenedUrls] = useState<{ [key: string]: string }>({});
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768); // Establece el umbral según lo desees
    };

    handleResize(); // Verifica el tamaño de la pantalla inicialmente
    window.addEventListener('resize', handleResize); // Agrega un listener para detectar cambios en el tamaño de la pantalla

    return () => {
      window.removeEventListener('resize', handleResize); // Limpia el listener al desmontar el componente
    };
  }, []);

  const handleCopy = async (url: string) => {
    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not supported');
      }
      const resultUrl = shortenedUrls[url]; // Obtiene el resultUrl correspondiente a la url
      if (resultUrl) {
        await navigator.clipboard.writeText(resultUrl);
        console.log('URL copied to clipboard');
      }
    } catch (error) {
      console.error('Failed to copy URL to clipboard:', error);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center bg-gray-300 w-full px-10 pt-20 gap-4 text-center">
      <div className="absolute -top-24 md:-top-32 w-full">
        <div style={{ minHeight: '500px' }}> {/* Contenedor con altura mínima */}
          <Formulary setShortenedUrls={setShortenedUrls} />
        </div>
      </div>
      <Results shortenedUrls={shortenedUrls} handleCopy={handleCopy} /> {/* Pasar handleCopy como prop */}
      <h2 className="font-bold text-2xl mt-10">Advanced Statistics</h2>
      <p>Track how your links are performing across the web with our advanced statistics dashboard.</p>
      <div className="my-20 md:flex md:flex-row md:my-40">
        {data.map((item, index) => (
          <div key={index.toString()} className="flex flex-col items-center justify-center md:mx-10 md:flex-row md:relative">
            <div className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-lg relative z-10" style={{ top: (isDesktop ? index * 40 : 0) + "px" }}>
              <div className="bg-purple-950 p-5 rounded-full absolute -top-10 md:left-5">
                <Image src={item.image} alt={item.title} width={"50"} height={"50"} />
              </div>
              <div className="flex flex-col items-center justify-center mt-10 gap-4">
                <h3 className="font-bold text-xl">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
            {index !== data.length - 1 && <div className="w-1 h-20 bg-cyan-500 md:w-40 md:h-2 md:left-80 md:absolute"></div>}
          </div>
        ))}
      </div>
    </section>
  );
}
