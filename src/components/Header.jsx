import css from '../styles/components/header.module.scss'
import logo from '../assets/pokemon.png'
import * as FaIcons from 'react-icons/fa'


export default function Header({props}) {
  return (
    <nav className={css.header}>
        <div className={css.div_header}>
            <div className={css.div_logo}>
                <img src={logo} alt="logo"/>
            </div>
            <div className={css.div_search}> 
              <div>
                  <FaIcons.FaSearch/>
              </div>
                <input type="search" onChange={(e) => props(e.target.value)}/>
            </div>
        </div>
    </nav>
  )
}

