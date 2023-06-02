import { useState} from 'react';
import { Game } from './Game';
import { Multiplayer } from './Multiplayer';
import { guardarModoJuego } from '../logic/storage';

export const ElegirModoJuego = () => {
    const [haElegidoModo, setHaElegidoModo] = useState(() => {
        const modoFromStorage = window.localStorage.getItem('modoJuego');
        const booleano = modoFromStorage === 'true';
        return booleano;
      });
    
      const [modoJuego, setModoJuego] = useState(() => {
        const modoFromStorage = window.localStorage.getItem('modo');
        const modo = JSON.parse(modoFromStorage);
        return modo || '';
      });

  return (
    <>
      {!haElegidoModo && !modoJuego && (
        <div className="pantallaInicial">
          <h1 className="tituloTictactoe">TicTacToe</h1>
            <div className='opciones'>
                <h1 className="tituloModoJuego">ELIJA JUGAR CONTRA</h1>
                <div className='botonesModo'>
                  <button
                      className='opcion'
                      onClick={() => {
                      setHaElegidoModo(true);
                      setModoJuego('multiplayer');
                      guardarModoJuego('multiplayer');
                      }}
                  >Un amigo 👯</button>
                  <button
                      className='opcion'
                      onClick={() => {
                      setHaElegidoModo(true);
                      setModoJuego('online');
                      guardarModoJuego('online');
                      }}
                  >Alguien Online 🌏</button>
                  <button
                      className='opcion'
                      onClick={() => {
                      setHaElegidoModo(true);
                      setModoJuego('ia');
                      guardarModoJuego('ia');
                      }}
                  >La Máquina 🤖</button>
                </div>
            </div>
        </div>
      )}
      {haElegidoModo && modoJuego === 'multiplayer' && <Game setHaElegidoModo={setHaElegidoModo} setModoJuego={setModoJuego} modoJuego={modoJuego} />}
      {haElegidoModo && modoJuego === 'online' && <Multiplayer setHaElegidoModo={setHaElegidoModo} setModoJuego={setModoJuego} modoJuego={modoJuego}/>}
      {haElegidoModo && modoJuego === 'ia' && <Game setHaElegidoModo={setHaElegidoModo} setModoJuego={setModoJuego} modoJuego={modoJuego} />}
    </>
  );
};