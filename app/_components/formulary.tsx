
'use client';
import { useRef, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchShortening, selectResultUrl, selectError, resetShortening } from '@/lib/features/shortening/shorteningSlice';

export const Formulary = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultUrl = useAppSelector(selectResultUrl);
  const error = useAppSelector(selectError);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resultUrl) {
      console.log(`Shortened URL: ${resultUrl}`);
      dispatch(resetShortening());
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

  return (
    <form
      className="flex flex-col bg-purple-950 gap-2 justify-center items-center w-full p-5 my-10 rounded-lg"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        type="text"
        className="p-2 rounded-lg w-full"
        placeholder="Shorten a link here..."
        ref={inputRef}
      />
      <button
        type="submit"
        className="text-white font-bold bg-cyan-500 w-full py-2 rounded-xl"
      >
        {loading ? 'Loading...' : 'Shorten It!'}
      </button>
    </form>
  );
};
