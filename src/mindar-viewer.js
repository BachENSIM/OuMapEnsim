import React, { useEffect, useState, useRef } from "react";
import map from "./assets/myMap.jpg";
import hellboy from "./assets/hellboy.glb";
import flag from "./assets/flag.glb";
import person from './person.json';


//cette fontionnalité va déclencher quand on active le mode AR et ça met à jour chaque 5s avec de nouvelles données (3 axes X,Y,Z)
const ModeViewAR = (props) => {
  const sceneRef = useRef(null);
  //6 properties old X,Y,Z and new X,Y,Z
  const { newdX, newdY, newdZ, olddX, olddY, olddZ } = props;

  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);
  const [z1, setZ1] = useState(0);

  const [x2, setX2] = useState(0);
  const [y2, setY2] = useState(0);
  const [z2, setZ2] = useState(0);

  var height = 2;
  var width = 3 ;

  var xx1 = -1.5;
  var yy1;
  var zz1;

  let timer;

  //cette fonction avec 3 pamamètres: newdX, newdY, newdZ
  useEffect(() => {
    //le bouton switch entre 2 modes: AR et Map
    const sceneEl = sceneRef.current;
    const arSystem = sceneEl.systems["mindar-image-system"];

    setX1(props.olddX);
    setY1(props.olddY);
    setZ1(props.olddZ);

    setX2(props.newdX);
    setY2(props.newdY);
    setZ2(props.newdZ);

    sceneEl.addEventListener(
      "renderstart",
      () => {
        arSystem.start();
      },
      [arSystem]
    );


    return () => {
      arSystem.stop();
      clearInterval(timer);
    };
  }, []);
  //ça fonctionne encore quand on coupe la caméra
  // var litNumber = [{x:-1.5, y:0,z:0.1},
  //   {x:-1.5, y:0,z:0.1},
  //   {x:-1.25, y:-.015,z:0.1},
  //   {x:-1.05, y:-0.35,z:0.1},
  //   {x:-0.05, y:-0.75,z:0.1},
  //   {x:0.15, y:-0.75,z:0.1},
  //   {x:0.25, y:0.75,z:0.1},
  //   {x:0.35, y:0.875,z:0.1},
  //   {x:1.0, y:0.675,z:0.1}
  // ];
  useEffect(() => {
    let incrementTime = 5000;
    timer = setInterval(() => {
      var min = 0;
      var max = 1;
      var rand = min + Math.random() * (max - min);
      var xx2 = -1.5;
      //mettre à jour les values en utilisant state
     
      setX1(xx1);
      // setY1(y1 + 0.01);
      // setZ1(z1 + 0.01);
      xx1 = xx1 + 0.1;
      setX2(xx1);
      // setY2(y1 + 0.02);
      // setZ2(z1 + 0.02);

      // console.log(`after 5s x1 ${x1} ${y1} ${z1} ${rand}`);
      // console.log(`after 5s x2 ${x2} ${y1} ${z1}`);

      //garder des valeurs anciennes

      //mettre à jour les values en utilisant state
    }, incrementTime);
   
    // return () => clearInterval(timer);

  }, [x1, y1, z1, x2, y2, z2]);

  var speed = 5000;

  {person.data.map((record) => {
    {
      return (
        console.log(`${((Math.PI*record.pos.lng / 180) *3/2).toFixed(3)} ${((Math.PI*record.pos.lat /180) * 2/2).toFixed(3)} 0.5`)
      
      );
    }
  })}
  
  return (
    
    <a-scene
      ref={sceneRef}
      mindar-image="imageTargetSrc: mundo.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
      color-space="sRGB"
      embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: true"
    >
      <a-assets>
        <img id="card" src={map} />

        <a-asset-item id="avatarModel" src={hellboy}></a-asset-item>
        <a-asset-item id="flagModel" src={flag}></a-asset-item>
      </a-assets>
      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      {/* une scène pour dessiner les points intérêts sur la carte  */}

      {/* une scène pour afficher les étudiant */}
      <a-entity mindar-image-target="targetIndex: 0">
        <a-plane
          src="#card"
          position="0 0 0"
          height="2" //y
          width="3" //x
          rotation="0 0 0"
        ></a-plane>

        {/* afficher les flags pour déterminer des points intérets */}
        <a-gltf-model
          rotation="0 270 0 "
          position="-1.5 0 0.1"
          scale="0.3 0.3 0.3"
          src="#flagModel"
          color="red"
        ></a-gltf-model>

        <a-gltf-model
          rotation="0 270 0 "
          position="0.2 -0.75 0.1"
          scale="0.3 0.3 0.3"
          src="#flagModel"
        ></a-gltf-model>

        <a-gltf-model
          rotation="0 270 0 "
          position="1.5 0.75 0.1"
          scale="0.3 0.3 0.3"
          src="#flagModel"
        ></a-gltf-model>

        {/* Pour afficher le trajet à réaliser par des  */}
        <a-entity
          line="start: -1.5 0 0.1; end: -1.25 -0.15 0.1; color: red;"
          line__2="start: -1.25 -0.15 0.1; end: -1.05 -0.35 0.1; color: red"
          line__3="start: -1.05 -0.35 0.1; end: -0.05 -0.75 0.1; color: red"
          line__4="start: -0.05 -0.75 0.1; end: 0.15 -0.75 0.1; color: red"
          line__5="start:  0.15 -0.75 0.1; end: 0.25 0.75 0.1; color: red"
          line__6="start: 0.25 0.75 0.1; end: 0.35 0.875 0.1; color: red"
          line__7="start: 0.35 0.875 0.1; end: 1.0 0.675 0.1; color: red"
          line__8="start: 1.0 0.675 0.1; end: 1.5 0.675 0.1; color: red"
        ></a-entity>

        {/* perso 1 */}
        {/* <a-gltf-model
          rotation="0 0 0 "
          position="-1 0 0.5"
          scale="0.3 0.3 0.3"
          src="#avatarModel"
          animation={`property: position; from: ${x1} ${y1} ${z1} ; to: ${x2} ${y2} ${z2};dur:${speed}; easing: easeInOutQuad; loop: true; dir: alternate`}
        ></a-gltf-model> */}

        {person.data.map((record) => {
          {
            return (
              <a-gltf-model
                rotation="0 0 0"
                position={`${((Math.PI*record.pos.lng / 180) *3/2).toFixed(3)} ${((Math.PI*record.pos.lat / 180) * 2/2).toFixed(3)} 0.5`}
                scale="0.1 0.1 0.1"
                src="#avatarModel"
                // animation={`property: position; from: ${x1} ${y1} ${z1} ; to: ${x2} ${y2} ${z2};dur:${speed}; easing: easeInOutQuad; loop: true; dir: alternate`}
              ></a-gltf-model>
            );
          }
        })}

        {/* perso 2 */}
        {/* <a-gltf-model
          rotation="0 0 0 "
          position="-1 0 0.1"
          scale="0.2 0.2 0.2"
          src="#avatarModel"
          animation={`property: position; from: ${x1 + 0.1} ${y1 + 0.01} ${
            z1 + 0.01
          } ; to: ${x2 + 0.01} ${y2 + 0.01} ${
            z2 + 0.01
          };dur:4000; easing: easeInOutQuad; loop: true; dir: alternate`}
          // animation={`property: position; from: -1 0 0.5; to: 0 1.25 0.95;dur:4000; easing: easeInOutQuad; loop: true; dir: alternate`}
        ></a-gltf-model> */}
      </a-entity>
    </a-scene>
  );
}; 

export default ModeViewAR;
