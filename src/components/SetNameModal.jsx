import { salirGameStorage, saveNamesToStorage } from "../logic/storage";
/* eslint-disable react/prop-types */
export const SetNameModal = ({
    setPlayerName1,
    setPlayerName2,
    playerName1,
    playerName2,
    setHaElegidoModo,
    setModoJuego,
    modoJuego
}) => {
    const nombreModo = (modoJuego === 'ia') ? '🙂🆚🤖' : 'Ingresen sus nombres 👯‍♂️'
    let nombre1 = '';
    let nombre2 = '';
    const empezarJuego = () => {
        setPlayerName1(nombre1);
        let nombre2Guardar = modoJuego === 'ia' ? 'Máquina 🤖' : nombre2;
        setPlayerName2(nombre2Guardar);
        saveNamesToStorage({ nombre1, nombre2: nombre2Guardar });
      };      

    const cancelarPartida = () =>{
        setHaElegidoModo(false)
        salirGameStorage()
        setModoJuego('')
    }

    if(modoJuego == 'ia'){
        if(playerName1 !== '' || playerName2 !== '') return
    }else{
        if(playerName1 !== '' && playerName2 !== '') return
    }
    return(
        <section className="winner">
        <div className="text">
        <h2>{nombreModo}</h2>
        <input className="nombreJugador" type="text" onChange={(e)=>{nombre1 = e.target.value, console.log(nombre1)}} placeholder="Ingrese su nombre"/> <div className="simbolo">✖️</div>
        {modoJuego == 'multiplayer' && (
            <>
            <input name="nombre2" className="nombreJugador" type="text" onChange={(e)=>{nombre2 = e.target.value}} placeholder="Ingrese su nombre"/> <p className="simbolo">⭕</p>
            </>
        )}
        <footer>
            <button className="empezarButon" onClick={() => {empezarJuego()}}>Empezar Juego</button>
            <button className="volverButon" onClick={() => {cancelarPartida()}}>Volver</button>
        </footer>
        </div>  
    </section>
  )
}