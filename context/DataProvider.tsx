'use client';
import { createContext, useState, useEffect } from 'react';
import data from '../lib/data.json';

type ItemType = {
  id: number;
  title: string;
  image: string;
  description: string;
};

export type ContextType = {
  data: ItemType[];
  setData: (data: ItemType[]) => void;
};

type DataProviderProps = {
  children: React.ReactNode;
};

export const DataContext = createContext<ContextType>({
  data: [],
  setData: () => {},
});

const DataProvider = ({ children }: DataProviderProps) => {
  const [dataState, setDataState] = useState<ItemType[]>([]);

  useEffect(() => {
    setDataState(data);
  }, []);
  
  return (
    <DataContext.Provider value={{ data: dataState, setData: setDataState }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
