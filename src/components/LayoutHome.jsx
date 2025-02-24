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
      setArrayPokemon(apiPoke.data.results);
    };

    api();
  }, []);

  return (
    <div className={css.layout}>
      <Header />

      <div className={css.card_content}>
        {arrayPokemon.map((card, index) => {
          return <Card key={index} props={card} />;
        })}
      </div>
    </div>
  );
}
