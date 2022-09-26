import { useState } from "react";
import palavras from "./Palavras";
import alfabeto from "./Alfabeto";
import forca0 from "./assets/forca0.png";
import forca1 from "./assets/forca1.png";
import forca2 from "./assets/forca2.png";
import forca3 from "./assets/forca3.png";
import forca4 from "./assets/forca4.png";
import forca5 from "./assets/forca5.png";
import forca6 from "./assets/forca6.png";

export default function App() {
  const [desabilitar, setDesabilitar] = useState(true);
  const [contadorErros, setContadorErros] = useState(1);
  const [imagemForca, setImagemForca] = useState(forca0);

  const [guardarPalavra, setGuardarPalavra] = useState("");
  const [guardarArrayPalavra, setGuardarArrayPalavra] = useState([]);
  const [arrayEscondida, setArrayEscondida] = useState([]);
  const [corPalavra, setCorPalavra] = useState("palavra");
  const [arrayResposta, setArrayResposta] = useState([]);
  const [chutarPalavra, setChutarPalavra] = useState([]);
  console.log(guardarArrayPalavra);

  function ImprimirAlfabeto(props) {
      return (
        <button
          data-identifier="letter"
          onClick={() => botaoClicado(props.letra)}
          disabled={desabilitar}
        >
          {props.letra}
        </button>
      );
  }

  function iniciarJogo() {
    setDesabilitar(false);
    setImagemForca(forca0);
    setContadorErros(1);
    setCorPalavra("palavra");
    setChutarPalavra("");
    console.log(contadorErros);

    let sortearPalavra = palavras[Math.floor(Math.random() * palavras.length)].toUpperCase();
    const palavra = sortearPalavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    setGuardarPalavra(palavra);

    const arrayPalavra = palavra.split("");
    setGuardarArrayPalavra(arrayPalavra)
    let arrayEscondida = [];
    for (let i = 0; i < arrayPalavra.length; i++) {
      arrayEscondida.push("_ ");
    }
    setArrayEscondida(arrayEscondida);
  }

  function botaoClicado(letra) {
    verificarLetra(letra);
  }

  function verificarLetra(letra) {
    setChutarPalavra("");
    if (guardarPalavra.includes(letra)) {
      for (let i = 0; i < guardarArrayPalavra.length; i++) {
        if (letra === guardarArrayPalavra[i]) {
          setArrayResposta(i);
          arrayEscondida[i] = letra;
          //console.log(arrayEscondida);
          verificarJogo();
        }
      }
    } else {
      setContadorErros(contadorErros + 1);
      atualizarImagem();
    }
  }

  function verificarJogo() {
    if (!arrayEscondida.includes("_ ")) {
      setDesabilitar(true);
      setCorPalavra("verde");
    }
  }

  function atualizarImagem() {
    if (contadorErros === 1) {
      setImagemForca(forca1);
    } else if (contadorErros === 2) {
      setImagemForca(forca2);
    } else if (contadorErros === 3) {
      setImagemForca(forca3);
    } else if (contadorErros === 4) {
      setImagemForca(forca4);
    } else if (contadorErros === 5) {
      setImagemForca(forca5);
    } else if (contadorErros === 6) {
      setImagemForca(forca6);
      perdeuJogo();
    }
  }

  function acertarPalavra() {
    if (chutarPalavra === guardarPalavra) {
      ganhouJogo();
    } else {
      setImagemForca(forca6);
      perdeuJogo();
    }
  }

  function perdeuJogo() {
    setDesabilitar(true);
    setArrayEscondida(guardarArrayPalavra);
    setContadorErros(1);
    setCorPalavra("vermelho");
  }
  function ganhouJogo() {
    setDesabilitar(true);
    setArrayEscondida(guardarArrayPalavra);
    setContadorErros(1);
    setCorPalavra("verde");
  }

  return (
    <>
      <div>
        <div className="jogo">
          <img data-identifier="game-image" src={imagemForca} alt="forca" />
          <div>
            <button data-identifier="choose-word" onClick={iniciarJogo}>
              Escolher palavra
            </button>
            <div data-identifier="word" className={corPalavra}>
              {arrayEscondida}
            </div>
          </div>
        </div>

        <div className="letras">
          {alfabeto.map((letra, index) => (
            <ImprimirAlfabeto
              key={index}
              letra={letra.toUpperCase()}
              index={index}
              
            />
          ))}
        </div>
      </div>

      <div className="chute">
        <h1>Já sei a palavra!</h1>
        <input
          data-identifier="type-guess"
          disabled={desabilitar}
          type="text"
          onChange={(event) =>
            setChutarPalavra(event.target.value.toUpperCase())
          }
          value={chutarPalavra}
        ></input>
        <button
          onClick={acertarPalavra}
          data-identifier="guess-button"
          disabled={desabilitar}
        >
          Chutar
        </button>
      </div>
    </>
  );
}
