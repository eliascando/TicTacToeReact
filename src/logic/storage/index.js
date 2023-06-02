export const saveGameToStorage = ({board, turn}) => {
    //guarda la partida
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const resetGameStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}
export const salirGameStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
    window.localStorage.removeItem('modoJuego')
    window.localStorage.removeItem('modo')
    window.localStorage.removeItem('nombre1')
    window.localStorage.removeItem('nombre2')
}

export const guardarModoJuego = (modo) => {
    window.localStorage.setItem('modoJuego', true);
    window.localStorage.setItem('modo', JSON.stringify(modo));
};  

export const saveNamesToStorage = ({nombre1,nombre2}) => {
    window.localStorage.setItem('nombre1',nombre1)
    window.localStorage.setItem('nombre2',nombre2)
}