import {PropTypes} from 'prop-types'
import { salirGameStorage } from '../logic/storage';

export const Multiplayer = ({
    setHaElegidoModo,
    setModoJuego,
}) => {
  return (
    <div>
    <h1 className='avisoOnline'>Multiplayer En Desarrollo 🛠️👷</h1>
    <button 
        className='botonOnline'
        onClick={() => {
            setHaElegidoModo(false);
            setModoJuego('');
            salirGameStorage();
        }}
    >Volver</button>

    </div>
  )
}

Multiplayer.propTypes = {
    setHaElegidoModo: PropTypes.func,
    setModoJuego: PropTypes.func,
}