
'use client';
import { useRef, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchShortening, selectResultUrl, resetShortening } from '@/lib/features/shortening/shorteningSlice';

export const Formulary = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultUrl = useAppSelector(selectResultUrl);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resultUrl) {
      alert(`Shortened URL: ${resultUrl}`);
      dispatch(resetShortening());
    }
  }, [resultUrl, dispatch]);

  const handleSubmit = async () => {
    if (!inputRef.current || !inputRef.current.value.trim()) return;

    setLoading(true);
    await dispatch(fetchShortening(inputRef.current.value));
    setLoading(false);

    inputRef.current.value = '';
  };

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
        {loading ? 'Loading...' : 'Shorten It!'}
      </button>
    </form>
  );
};