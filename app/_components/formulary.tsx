'use client';
import { useRef, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchShortening, selectResultUrl, selectError, resetShortening } from '@/lib/features/shortening/shorteningSlice';

export const Formulary = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [shortenedUrls, setShortenedUrls] = useState<{ [key: string]: string }>({}); // Objeto para almacenar pares de valores url y resultUrl
  const resultUrl = useAppSelector(selectResultUrl);
  const error = useAppSelector(selectError);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (resultUrl) {
      console.log(`Shortened URL: ${resultUrl}`);
      if (inputRef.current && inputRef.current.value.trim() !== '') {
        // Almacena el par de valores url y resultUrl correspondiente
        setShortenedUrls((prevUrls) => ({
          ...prevUrls,
          [inputRef.current!.value.trim()]: resultUrl,
        }));
        dispatch(resetShortening());
      }
    }
  }, [resultUrl, dispatch]);

  useEffect(() => {
    if (error) {
      console.error('An error occurred:', error);
      dispatch(resetShortening());
    }
  }, [error, dispatch]);

  const handleSubmit = async () => {
    if (!inputRef.current || !inputRef.current.value.trim()) return;

    const url = inputRef.current.value.trim();
    console.log('URL entered:', url);

    setLoading(true);
    await dispatch(fetchShortening(url));
    setLoading(false);

    inputRef.current.value = '';
  };

  const handleCopy = async (url: string) => {
    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not supported');
      }
      const resultUrl = shortenedUrls[url]; // Obtiene el resultUrl correspondiente a la url
      if (resultUrl) {
        await navigator.clipboard.writeText(resultUrl);
        console.log('URL copied to clipboard');
        setCopied(true);
      }
    } catch (error) {
      console.error('Failed to copy URL to clipboard:', error);
    }
  };
  
  const handleShorten = async () => {
    if (!inputRef.current || !inputRef.current.value.trim()) return;
  
    const url = inputRef.current.value.trim();
    console.log('URL entered:', url);
  
    setLoading(true);
    await dispatch(fetchShortening(url));
    setLoading(false);
  
    inputRef.current.value = '';
  };

  return (
    <div>
      <form
        className="flex flex-col bg-purple-950 gap-2 justify-center items-center w-full p-5 my-10 rounded-lg md:grid md:grid-cols-12 md:gap-5 md:justify-start md:items-start md:px-10 md:py-5 md:my-20 md:rounded-xl"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className="p-2 rounded-lg w-full md:col-span-8"
          placeholder="Shorten a link here..."
          ref={inputRef}
        />
        <button
          type="submit"
          className="text-white font-bold bg-cyan-500 w-full py-2 rounded-xl md:col-span-4"
          onClick={handleShorten}
        >
          {loading ? 'Loading...' : 'Shorten It!'}
        </button>
      </form>
      {Object.keys(shortenedUrls).map((url, index) => (
        <div key={index} className="mb-5 flex flex-col bg-white py-5 rounded-lg text-center gap-2 md:flex-row md:justify-between md:px-5">
          <p>{url}</p>
          <div className='w-full bg-gray-500 h-0.5 md:hidden'></div>
          <a href={shortenedUrls[url]} target="_blank" rel="noreferrer" className='text-cyan-500 font-bold hover:underline cursor-pointer' >
            {shortenedUrls[url]}
          </a>
          {/* Button copy */}
          <button
            className={`${ copied ? "bg-gray-950" : "bg-cyan-500" } text-white font-bold  px-10 py-2 rounded-2xl mx-5`}
            onClick={() => handleCopy(url)}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      ))}
    </div>
  );
};
