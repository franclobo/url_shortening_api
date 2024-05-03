'use client';
import { useState } from 'react';

interface Props {
  shortenedUrls: { [key: string]: string };
  handleCopy: (url: string) => void;
}

export const Results = ({ shortenedUrls, handleCopy }: Props) => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCopyClick = async (url: string) => {
    try {
      await handleCopy(url);
      setCopiedUrl(url); // Establecer la URL copiada
    } catch (error) {
      console.error('Failed to copy URL to clipboard:', error);
    }
  };

  return (
    <div className='w-full z-10'>
      {Object.keys(shortenedUrls).map((url, index) => (
        <div key={index} className="mb-5 flex flex-col bg-white py-5 rounded-lg text-center items-center gap-2 md:flex-row md:justify-between md:px-5">
          <p>{url}</p>
          <div className='w-full bg-gray-500 h-0.5 md:hidden'></div>
          <div>
            <a href={shortenedUrls[url]} target="_blank" rel="noreferrer" className='text-cyan-500 font-bold hover:underline cursor-pointer' >
              {shortenedUrls[url]}
            </a>
            {/* Button copy */}
            <button
              className={`px-10 py-2 rounded-2xl mx-5 text-white font-bold cursor-pointer hover:bg-cyan-300 ${copiedUrl === url ? "bg-gray-950" : "bg-cyan-500"}`}
              onClick={() => handleCopyClick(url)}
            >
              {copiedUrl === url ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
