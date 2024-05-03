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
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false); // Estado para controlar si se ha enviado el formulario
  const [showError, setShowError] = useState(false); // Estado para controlar si se muestra el mensaje de error

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
    if (error && submitted) { // Mostrar error solo si se ha enviado el formulario
      console.error('An error occurred:', error);
      dispatch(resetShortening());
    }
  }, [error, dispatch, submitted]);

  const handleSubmit = async () => {
    if (!value.trim()) {
      setShowError(true); // Mostrar mensaje de error si el campo está vacío al enviar el formulario
      return;
    }

    console.log('URL entered:', value);

    setLoading(true);
    await dispatch(fetchShortening(value));
    setLoading(false);

    setValue('');
    setSubmitted(true); // Marcar el formulario como enviado
    setShowError(false); // Ocultar el mensaje de error
  };

  const handleShorten = async () => {
    if (!value.trim()) {
      setShowError(true); // Mostrar mensaje de error si el campo está vacío al hacer clic en el botón "Shorten It"
      return;
    }

    console.log('URL entered:', value);

    setLoading(true);
    await dispatch(fetchShortening(value));
    setLoading(false);

    setValue('');
    setSubmitted(true); // Marcar el formulario como enviado
    setShowError(false); // Ocultar el mensaje de error
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
        <div className='md:col-span-8 text-left'>
          <input
            type="text"
            className={`p-2 rounded-lg w-full ${showError && value === '' ? 'border-2 border-red-500' : ''}`}
            placeholder="Shorten a link here..."
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {showError && value === '' && <p className="text-red-500 text-sm italic">Please add a link</p>}
        </div>
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
