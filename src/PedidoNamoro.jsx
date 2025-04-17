import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import Swal from "sweetalert2";
import useSound from "use-sound";
import loveSound from "/love.mp3";

export default function PedidoNamoro() {
  const [aceitou, setAceitou] = useState(false);
  const [naoPosition, setNaoPosition] = useState({ top: "0px", left: "0px" });
  const [play] = useSound(loveSound);
  const buttonSimRef = useRef(null); // Referência do botão "Sim"

  useEffect(() => {
    if (buttonSimRef.current) {
      const rect = buttonSimRef.current.getBoundingClientRect();
      setNaoPosition({
        top: `${rect.top + 25}px`,
        left: `${rect.left + rect.width + 70}px`
      });
    }
  }, []);

  const moverBotao = () => {
    const maxWidth = window.innerWidth - 100;
    const maxHeight = window.innerHeight - 60;
    const randomX = Math.max(0, Math.random() * maxWidth);
    const randomY = Math.max(0, Math.random() * maxHeight);
    setNaoPosition({ top: `${randomY}px`, left: `${randomX}px` });
  };

  const handleAceitar = async () => {
    const result = await Swal.fire({
      title: "Tem certeza????",
      text: "Dessa vez é de verdade princesa! 💖",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#16a34a",
      confirmButtonText: "<b>Sim, quero!</b>",
      cancelButtonText: "<b>Claro</b>",
      background: "#fff",
    });

    if (result.isConfirmed) {
      setAceitou(true);
      play();
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-full overflow-hidden relative"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url('/background_image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {aceitou && <Confetti width={window.innerWidth} height={window.innerHeight} />}

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

          {/* Botão Sim */}
          <div className="flex gap-4 items-center">
            <button
              ref={buttonSimRef}
              onClick={handleAceitar}
              className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600 transition"
            >
              Sim
            </button>
          </div>

          {/* Botão Não (absoluto) */}
          <motion.button
            onMouseEnter={moverBotao}
            animate={{ top: naoPosition.top, left: naoPosition.left }}
            transition={{ type: "spring", stiffness: 700 }}
            style={{
              position: "absolute",
              transform: "translate(-50%, -50%)",
            }}
            className="bg-red-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-red-600 transition"
          >
            Não
          </motion.button>
        </>
      )}
    </div>
  );
}
