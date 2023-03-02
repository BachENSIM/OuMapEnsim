import React, { useState } from 'react';
import 'mind-ar/dist/mindar-image.prod.js';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';
import './App.css';
import ModeViewAR from "./mindar-viewer";
import Navbar from './components/Navbar';




function App() {
  const [started, setStarted] = useState(false);
  const [x, setX] = useState(1);
  const [y, setY] = useState(1);
  const [z, setZ] = useState(1);
  const [oldX, setOldX] = useState(0);
  const [oldY, setOldY] = useState(0);
  const [oldZ, setOldZ] = useState(0);


  //If any input changes reset
  const basicReset = () => {
    setStarted(true);
   
  };

  //fonction pour mettre à jour les valeurs
  const changeValue = () => {
    // const { x1 } = old1.target.value;
    // const { y1 } = old2.target.value;
    // const { z1 } = old3.target.value;
    // const { x2 } = new1.target.value;
    // const { y2 } = new2.target.value;
    // const { z2 } = new3.target.value;
    // for (var i = 0; i < 10; i++) {
    //   setOldX(i);
    //   setOldY(i);
    //   setOldZ(i);
    //   i++;
    //   setX(i++);
    //   setY(i++);
    //   setZ(i++);

    //   console.log(`${oldX} ${oldY} ${oldZ} ; to: ${x} ${y} ${z};`);
    //   //
    // }
    setOldX(-1.5);
    setOldY(0);
    setOldZ(0);
    setX(-1.4);
    setY(0);
    setZ(0);
   
    basicReset();
  };

  return (
    <div className="App">
      <Navbar />
     <section class="bg-indigo-700 text-white">
  <div
    class="mx-auto max-w-screen-xl px-4 py-32  lg:h-screen lg:items-center"
  >
    <div class="mx-auto max-w-3xl text-center mt-24">
      <h1
        class="text-3xl font-extrabold text-white sm:text-5xl"
      >
       Mode Réalité Augmentée

        <span class="sm:block"> Ou-map </span>
      </h1>

      <p class="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
        
       Poursuivre l'état d'avancement des étudiant, veuillez activer la caméra pour passer en mode AR sur le plan IGN
       ensuite scroller en bas pour voir la caméra.
      </p>

      <div class="mt-8 flex flex-wrap justify-center gap-4">
      
          {!started && <button   class="block w-full rounded border border-indigo-900 bg-indigo-900 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto" onClick={changeValue}><a href="#camerawowo">Activer Caméra</a></button>}
       {started && (
          <button
          class="block w-full rounded border border-indigo-900 bg-indigo-900 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-800 hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
            onClick={() => {
              setStarted(false);
             
            }}
          >
            Stop
          </button>
        )}
        <a
          class="block w-full rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          href="/about"
        >
          Mode Normal
        </a>
      </div >
 {started && (
        <div className="container"  id="camerawowo">
          {/* <MindARViewer/> */}
          <ModeViewAR
            newdX={x}
            newdY={y}
            newdZ={z}
            olddX={oldX}
            olddY={oldY}
            olddZ={oldZ}
         
           
          />
          <video></video>
        </div>
      )}
    </div>
  </div>
</section>
     
     

   
    </div>
  );
}

export default App;
