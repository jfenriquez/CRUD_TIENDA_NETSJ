import { useEffect, useRef, useState } from "react";
import { getSearchPersonajesApi } from "../api/RickMortyApi";
import { Personaje, Result } from '../interfaces/personajeInterfaces';
import { API_HOST } from "../utils/constants";

export const useRickSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchCharacters, setSearchCharacters] = useState<any>([]);

  const loadSearchCharacter = async (name: string) => {
    const PageUrl = `${API_HOST}/character/?name=${name}`;
    try {
      console.log("url", PageUrl);
      setIsLoading(true);
      const resp = await getSearchPersonajesApi(PageUrl);
      setSearchCharacters([resp]);
      setIsLoading(false);
      return resp;      
    } catch (err) {
      return JSON.stringify(err);
    }
  };

  //////RETORNAR ESTADOS Y FUNCION DE LOADCHARACTER
  return {
    isLoading,
    searchCharacters,
    loadSearchCharacter,
  };
};
