import { useEffect, useState } from 'react';
import css from '../styles/components/card.module.scss';
import axios from 'axios';
import { URL_POKEMON } from '../api/apiRest';
import { URL_SPECIES } from '../api/apiRest';
import { URL_EVOLUTION } from '../api/apiRest';

export default function Card({ props }) {
  const [itemPokemon, setItemPokemon] = useState({});
  const [especiePokemon, setEspeciePokemon] = useState({});
  const [evolutionPokemon, setEvolutionPokemon] = useState([]);

  useEffect(() => {
    const dataPokemon = async () => {
      const api = await axios.get(`${URL_POKEMON}/${props.name}`);

      setItemPokemon(api.data);
    };

    dataPokemon();
  }, [props]);
  

  useEffect(() => {
    const dataEspecie = async () => {
      
      //Obtener el id que se encuentra en la URL de props.url lo convertimos en un array y necesitamos la posición 6
      const URL = props.url.split("/");

      const api = await axios.get(`${URL_SPECIES}/${URL[6]}`);

      setEspeciePokemon({
        url_especie: api?.data?.evolution_chain, 
        data: api?.data
      });
    };

    dataEspecie();
  }, [props]);

  useEffect(() => {

    async function getPokemonImagen(id){
      const response = await axios.get(`${URL_POKEMON}/${id}`)

      return response?.data?.sprites?.other['official-artwork']?.front_default;
    }

    if(especiePokemon?.url_especie){

      const getEvolutions = async () => {
      
        const arrayEvolutions = []

        //Obtener el id que se encuentra en la URL de props.url lo convertimos en un array y necesitamos la posición 6
        const URL = especiePokemon?.url_especie?.url.split("/");
        const api = await axios.get(`${URL_EVOLUTION}/${URL[6]}`);
        const URL2 = api?.data?.chain?.species?.url?.split("/")
        const img1 = await getPokemonImagen(URL2[6])


        arrayEvolutions.push({
          img: img1,
          name: api?.data?.chain?.species?.name
        })

        if(api?.data?.chain?.envolves_to?.length != 0){
          const DATA2 = api?.data?.chain?.evolves_to[0]?.species
          const ID = DATA2?.url?.split("/")
          const img2 = await getPokemonImagen(ID[6])

          arrayEvolutions.push({
            img: img2,
            name: DATA2?.name
          });

          if(api?.data?.chain?.evolves_to?.length > 0 && api?.data?.chain?.evolves_to[0]?.evolves_to?.length > 0){
            const DATA3 = api?.data?.chain?.evolves_to[0]?.evolves_to[0]?.species

            const ID = DATA3?.url?.split("/");
            const img3 = await getPokemonImagen(ID[6]);
  
            arrayEvolutions.push({
              img: img3,
              name: DATA3?.name
            });
          }
        }
        
        setEvolutionPokemon(arrayEvolutions);
      };
  
      
      getEvolutions();
    }
  }, [especiePokemon]);

  let pokeId = itemPokemon?.id?.toString();

  if(pokeId?.length === 1){
    pokeId = "00" + pokeId
  } else if (pokeId?.length === 2){
    pokeId = "0" + pokeId
  }

  return (
    <div className={css.card}>
      <img className={css.img_pokemon} src={itemPokemon?.sprites?.other['official-artwork'].front_default} alt="pokemon" />
      <div className={`bg-${especiePokemon?.data?.color?.name} ${css.sub_card}`}>
        <strong className={css.id_card}> #{pokeId} </strong>
        <strong className={css.name_card}> {itemPokemon.name} </strong>
        <h4 className={css.height_card}> Altura: {itemPokemon.height}0 cm</h4>
        <h4 className={css.weight_card}> Peso: {itemPokemon.weight} Kg</h4>
        <h4 className={css.habitat_pokemon}> Habitat: {especiePokemon?.data?.habitat?.name} </h4>
        
        <div className={css.div_stats}>
          {
            itemPokemon?.stats?.map( (stat, index) => {
              return(
                <h6 key={index} className={css.item_stats}>
                  <span className={css.name_stats}>{stat.stat.name}</span>
                  <progress value={stat.base_stat} max={110}></progress>
                  <span className={css.number_stats}>{stat.base_stat}</span>
                </h6>
              )
            })
          }
        </div>

        <div className={css.div_type_color}>
          {
            itemPokemon?.types?.map((type, index) => {
              return(
                <h6 key={index} className={`color-${type.type.name} ${css.color_type}`}> 
                  {" "}
                  {type.type.name}{" "}
                </h6>
              )
            })
          }
        </div>

        <div className={css.div_evolution}>
            {
              evolutionPokemon.map((evolution, index) => {
                return(
                  <div className={css.item_evolution} key={index}>
                    <img className={css.img} src={evolution.img} alt="Evolucion"/>
                    <h6>{evolution.name}</h6>
                  </div>
                )
              })
            }
        </div>
      </div>
    </div>
  );
}
