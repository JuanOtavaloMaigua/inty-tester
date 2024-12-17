import { useState } from 'react'
import './App.css'

function App() {
  const [jugador1, setJugador1] = useState("")
  const [jugador2, setJugador2] = useState("")
  const [jugadorActual, setJugadorActual] = useState("")

  const [ganador, setGanador] = useState("")

  const jugador1Color = "#FF0000"
  const jugador2Color = "#4169E1"
  
  const arr1 = [
    ["#9b9b9b", "#9b9b9b", "#9b9b9b", "#9b9b9b", "#9b9b9b"],
    ["#9b9b9b", "#9b9b9b", "#9b9b9b", "#9b9b9b", "#9b9b9b"],
    ["#9b9b9b", "#9b9b9b", "#9b9b9b", "#9b9b9b", "#9b9b9b"],
    ["#9b9b9b", "#9b9b9b", "#9b9b9b", "#9b9b9b", "#9b9b9b"],
    ["#9b9b9b", "#9b9b9b", "#9b9b9b", "#9b9b9b", "#9b9b9b"],
  ]
  
  const [matrix, setMatrix] = useState(arr1)

  function checkPlayerWin(matrix) {
    const wins = {
      rows: [],
      columns: []
    };
  
    
    matrix.forEach((row, rowIndex) => {
      
      for (let i = 0; i <= row.length - 4; i++) {
        const fourColors = row.slice(i, i + 4);
        const nonGrayColors = fourColors.filter(color => color !== "#9b9b9b");
        
        
        if (nonGrayColors.length === 4 && new Set(nonGrayColors).size === 1) {
          wins.rows.push({
            index: rowIndex,
            startColumn: i,
            color: nonGrayColors[0]
          });
          break; 
        }
      }
    });
  
    
    for (let j = 0; j < matrix[0].length; j++) {
      const column = matrix.map(row => row[j]);
      
      
      for (let i = 0; i <= column.length - 4; i++) {
        const fourColors = column.slice(i, i + 4);
        const nonGrayColors = fourColors.filter(color => color !== "#9b9b9b");
        
        
        if (nonGrayColors.length === 4 && new Set(nonGrayColors).size === 1) {
          wins.columns.push({
            index: j,
            startRow: i,
            color: nonGrayColors[0]
          });
          break;
        }
      }
    }
  
    return wins;
  }

  function analyzeGameWin(matrix) {
    const wins = checkPlayerWin(matrix);
    
    if (wins.rows.length > 0 || wins.columns.length > 0) {
      console.log("Player Win Detected!");
      
      if (wins.rows.length > 0) {
        console.log("Winning Rows:");
        wins.rows.forEach(row => {
          console.log(`Row ${row.index} won with color: ${row.color} starting at column ${row.startColumn}`);
        });
      }
      
      if (wins.columns.length > 0) {
        console.log("Winning Columns:");
        wins.columns.forEach(column => {
          console.log(`Column ${column.index} won with color: ${column.color} starting at row ${column.startRow}`);
        });
      }

      // ganador = "ganaste"
      
      return true;
    }
    
    console.log("No win detected.");
    return false;
  }
  

  
  const handleClick = (i, j) => {
    const currentPlayerColor = jugadorActual === jugador1 ? jugador1Color : jugador2Color
    
    const newMatrix = matrix.map((row, fila) => {
      if (fila === i) {
        return row.map((cell, columna) => {
          if (columna === j) {
            return currentPlayerColor
          }
          return cell
        })
      }
      return row
    })
    
    setMatrix(newMatrix)
    
    setJugadorActual(jugadorActual === jugador1 ? jugador2 : jugador1)

    if(analyzeGameWin(newMatrix)){
      setGanador(jugadorActual)
    }

  }

  const isAllPlayers = jugador1 && jugador2

  return (
    <>
      <label>Jugador 1</label>
      <input onChange={(e) => setJugador1(e.target.value)} disabled={isAllPlayers}></input>
      
      <label>Jugador 2</label>
      <input onChange={(e) => setJugador2(e.target.value)} disabled={isAllPlayers}></input>
      
      <button onClick={() => setJugadorActual(jugador1)} >Empezar a jugar</button>

      {
        jugadorActual !== "" && <div>

            <p>{`turno actual: ${jugadorActual}`}</p>
            
            <div className="row-container">
              {matrix.map((row, i) => (
                <div className="row" key={i}>
                  {row.map((cell, j) => (
                    <button 
                      className="cell" 
                      key={j} 
                      style={{backgroundColor: cell}} 
                      onClick={() => handleClick(i, j)}
                    ></button>
                  ))}
                </div>
              ))}
            </div>

        </div>
      }

      {ganador && <p>Ganaste!</p>}
    
    </>
  )
}

export default App