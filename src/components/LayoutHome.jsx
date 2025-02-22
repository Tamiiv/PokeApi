import { useEffect, useState } from 'react';
import css from '../styles/components/layout.module.scss';
import Header from './Header.jsx';
import Card from './Card.jsx';
import { URL_POKEMON } from '../api/apiRest.js';
import axios from 'axios';

export default function LayoutHome() {
  const [arrayPokemon, setArrayPokemon] = useState([]);

  useEffect(() => {
    const api = async () => {
      const apiPoke = await axios.get(`${URL_POKEMON}`);
      console.log('Array');
      console.log(apiPoke.data.results);
      setArrayPokemon(apiPoke.data.results);
    };

    api();
  }, []);

  return (
    <div className={css.layout}>
      <Header />

      <div>
        {arrayPokemon.map((card, index) => {
          console.log('valor card');
          console.log(card);
          return <Card key={index} props={card} />;
        })}
      </div>
    </div>
  );
}
