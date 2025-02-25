import { useEffect, useState } from 'react';
import css from '../styles/components/layout.module.scss';
import Header from './Header.jsx';
import Card from './Card.jsx';
import { URL_POKEMON } from '../api/apiRest.js';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa'

export default function LayoutHome() {
  const [arrayPokemon, setArrayPokemon] = useState([]);
  const [arrayGlobalPokemon, setArrayGlobalPokemon] = useState([]);
  const [xpage, setXpage] = useState(1);

  useEffect(() => {
    const api = async () => {

      const limit = 15
      const xp = (xpage - 1) * limit;
      const apiPoke = await axios.get(`${URL_POKEMON}/?offset=${xp}&limit=${limit}`);
      setArrayPokemon(apiPoke.data.results);
    };

    api();
    getGlobalPokemons();
  }, [xpage]);

  const getGlobalPokemons = async () => {
    const response = await axios.get(`${URL_POKEMON}?offset=0&limit=1000`);

    const promises = response.data.results.map( pokemon => {
      return pokemon;
    })

    const results = await Promise.all(promises);
    setArrayGlobalPokemon(results);
  }

  return (
    <div className={css.layout}>
      <Header />

      <section className={css.section_pagination}>
        <div className={css.div_pagination}>
          <span className={css.item_izquierdo_pagination} onClick={() => {
            if(xpage > 1) setXpage(xpage - 1);
          }}>
            <FaIcons.FaAngleLeft />
          </span>
          <span className={css.item_pagination}> {xpage} </span>
          <span className={css.item_pagination}> DE </span>
          <span className={css.item_pagination}> {Math.round(arrayGlobalPokemon?.length / 15)} </span>
          <span className={css.item_derecho_pagination} onClick={() => {
            if(xpage < 67) setXpage(xpage + 1)
          }}>
            <FaIcons.FaAngleRight />
          </span>
        </div>
      </section>

      <div className={css.card_content}>
        {arrayPokemon.map((card, index) => {
          return <Card key={index} props={card} />;
        })}
      </div>
    </div>
  );
}
