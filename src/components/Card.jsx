import { useEffect, useState } from 'react';
import css from '../styles/components/card.module.scss';
import axios from 'axios';
import { URL_POKEMON } from '../api/apiRest';

export default function Card({ props }) {
  const [itemPokemon, setItemPokemon] = useState({});
  useEffect(() => {
    const dataPokemon = async () => {
      const api = await axios.get(`${URL_POKEMON}/${props.name}`);

      setItemPokemon(api.data);
    };

    dataPokemon();
  }, []);

  return (
    <div className={css.card}>
      <img src={itemPokemon?.sprites?.other['official-artwork'].front_default} alt="pokemon" />
      <div className={css.sub_card}>
        <strong className={css.id_card}> 011 </strong>
        <strong className={css.name_card}> name </strong>
        <h4 className={css.height_card}> 10cm </h4>
        <h4 className={css.weight_card}> peso </h4>
        <h4 className={css.habitat_pokemon}> habitat </h4>
      </div>
      <button>Ver mas info</button>
    </div>
  );
}
