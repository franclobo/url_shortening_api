'use client';
import { useRef, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchShortening, selectResultUrl, selectError, resetShortening } from '@/lib/features/shortening/shorteningSlice';

export const Formulary = ({ setShortenedUrls }: { setShortenedUrls: React.Dispatch<React.SetStateAction<{ [key: string]: string }>> }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultUrl = useAppSelector(selectResultUrl);
  const error = useAppSelector(selectError);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resultUrl) {
      console.log(`Shortened URL: ${resultUrl}`);
      if (inputRef.current && inputRef.current.value.trim() !== '') {
        setShortenedUrls((prevUrls) => ({
          ...prevUrls,
          [inputRef.current!.value.trim()]: resultUrl,
        }));
        dispatch(resetShortening());
      }
    }
  }, [resultUrl, dispatch, setShortenedUrls]);

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
    <div className='mx-10'>
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
          className="text-white font-bold bg-cyan-500 w-full py-2 rounded-xl hover:bg-cyan-300 md:col-span-4"
          onClick={handleShorten}
        >
          {loading ? 'Loading...' : 'Shorten It!'}
        </button>
      </form>
    </div>
  );
};
