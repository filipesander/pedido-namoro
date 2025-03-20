import { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import useSound from "use-sound";
import loveSound from "/love.mp3"; 

export default function PedidoNamoro() {
  const [aceitou, setAceitou] = useState(false);
  const [naoPosition, setNaoPosition] = useState({ top: "52", left: "53%" });
  const [play] = useSound(loveSound);

  const moverBotao = () => {
    const maxWidth = window.innerWidth - 200; 
    const maxHeight = window.innerHeight - 80;
    const randomX = Math.max(20, Math.random() * maxWidth);
    const randomY = Math.max(20, Math.random() * maxHeight);
    setNaoPosition({ top: `${randomY}px`, left: `${randomX}px` });
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-full overflow-hidden relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.125), rgba(0, 0, 0, 0.5)), url('/background_image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      {aceitou && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {aceitou ? (
        <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-lg">
          <span className="text-3xl font-bold text-green-600">
            Parabéns! Você deixou de ser solteira! 💖
          </span>
          <img
            src="/flork.png"
            alt="Flork segurando um coração"
            className="w-20 h-auto animate-bounce"
          />
        </div>
      ) : (
        <>
          <motion.h1
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-5xl font-bold text-white mb-4 bg-white bg-opacity-20 p-5 rounded-lg text-center font-dancing"
          >
            Quer namorar comigo, Teteia? 🥰
          </motion.h1>

          <div className="flex gap-4 items-center">
            <button
              onClick={() => {
                setAceitou(true);
                play();
              }}
              className="button button-yes"
            >
              Sim
            </button>

            <motion.button
              onMouseEnter={moverBotao}
              animate={{ top: naoPosition.top, left: naoPosition.left }}
              transition={{ type: "spring", stiffness: 400 }}
              style={{
                position: "absolute",
                maxWidth: "100vw",
                maxHeight: "100vh",
                right: "auto",
                bottom: "auto",
              }}
              className="bg-red-500 text-white px-6 py-3 rounded-lg text-xl "
            >
              Não
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}
