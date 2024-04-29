
'use client';
import { useRef, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch, useAppStore } from '@/lib/hooks';
import { fetchShortening, resetShortening, selectError, selectResultUrl } from '@/lib/features/shortening/shorteningSlice';

export const Formulary = () => {
  const dispatch = useAppDispatch();
  const [shortenedUrl, setShortenedUrl] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  inputRef.current?.focus();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      try {
        const response = await dispatch(fetchShortening(inputRef.current.value));
        setShortenedUrl(response.payload); // Guarda la URL acortada en el estado local
      } catch (error) {
        // Maneja el error
        console.error('Failed to fetch:', error);
      }
    }
  }

  console.log(shortenedUrl);

  return (
    <form action="post" className="flex flex-col bg-purple-950 gap-2 justify-center items-center w-full p-5 my-10 rounded-lg">
      <input
        type="text"
        className="p-2 rounded-lg w-full"
        placeholder="Shorten a link here..."
        ref={inputRef}
      />
      <button
        type="button"
        className="text-white font-bold bg-cyan-500 w-full py-2 rounded-xl"
        onClick={handleSubmit}
      >
        Shorten It!
      </button>
    </form>
  )
}

