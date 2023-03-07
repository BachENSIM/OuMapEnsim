import React, { useEffect, useState, useRef, useCallback } from "react";
import map from "./assets/myMap.jpg";
import sms1 from "./assets/sms1.jpg";
import telephone1 from "./assets/telephone1.jpg";
import stickman from "./assets/stickman.glb";
import flag from "./assets/flag.glb";


//cette fontionnalité va déclencher quand on active le mode AR et ça met à jour chaque 5s avec de nouvelles données (3 axes X,Y,Z)
const ModeViewAR = (props) => {
  // un état pour pouvoir la possibilité d'affichage les deux options
  const [isClick, setIsClick] = useState(false);
 
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
      //clearInterval(timer);
    };
  }, []);


  useEffect(() => {

    const box = document.querySelector("#box");
    box.addEventListener("click",event => {
      setIsClick(isClick ? false : true);
      console.log(`isClick = ${isClick}`);
    });

    if(isClick) {
      const call = document.querySelector("#btnCall");
      call.addEventListener("click",event => {
      window.open('https://wa.me/33659577133','_blank', 'noreferrer');
      });

      const sms = document.querySelector("#btnSms");
      sms.addEventListener("click",event => {
      window.open('https://wa.me/33712954862','_blank', 'noreferrer');
      });
    }

  }, [x1, y1, z1, x2, y2, z2,color,isClick]);

  var speed = 5000;


  return (
    <a-scene
      ref={sceneRef}
      mindar-image="imageTargetSrc: map.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
      color-space="sRGB"
      embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: true"
    >
      <a-assets>
        <img id="card" src={map} />
        <img id="tele" src={telephone1} />
        <img id="sms" src={sms1} />

        <a-asset-item id="avatarModel" src={stickman}></a-asset-item>
        <a-asset-item id="flagModel" src={flag}></a-asset-item>
      </a-assets>
    
<a-camera position="0 0 0" look-controls="enabled: false" cursor="fuse: false; rayOrigin: mouse;" raycaster="far: ${customFields.libVersion}; objects: .clickable"></a-camera>

      {/* une scène pour dessiner les points intérêts sur la carte  */}

      {/* une scène pour afficher les étudiant */}
      <a-entity   mindar-image-target="targetIndex: 0">
        <a-plane
          src="#card"
          position="0 0 0"
          height="0.75" //y
          width="1" //x
          rotation="0 0 0"
        ></a-plane>


        {/* afficher les flags pour déterminer des points intérets */}
        <a-gltf-model
          rotation="0 270 0 "
          position="-0.5 0 0.1"
          scale="0.1 0.1 0.1"
          src="#flagModel"
          color="red"
        ></a-gltf-model>

        <a-gltf-model
          rotation="0 270 0 "
          position="0.01 -0.375 0.1"
          scale="0.1 0.1 0.1"
          src="#flagModel"
        ></a-gltf-model>

        <a-gltf-model
          rotation="0 270 0 "
          position="0.5 0.15 0.1"
          scale="0.1 0.1 0.1"
          src="#flagModel"
        ></a-gltf-model>

        {/* Pour afficher le trajet à réaliser par des lignes  */}
        {/* <a-entity
          line="start: -1.5 0 0.1; end: -1.25 -0.15 0.1; color: green;"
          line__2="start: -1.25 -0.15 0.1; end: -1.05 -0.35 0.1; color: green"
          line__3="start: -1.05 -0.35 0.1; end: -0.05 -0.75 0.1; color: green"
          line__4="start: -0.05 -0.75 0.1; end: 0.15 -0.75 0.1; color: green"
          line__5="start:  0.15 -0.75 0.1; end: 0.25 0.75 0.1; color: green"
          line__6="start: 0.25 0.75 0.1; end: 0.35 0.875 0.1; color: green"
          line__7="start: 0.35 0.875 0.1; end: 1.0 0.675 0.1; color: green"
          line__8="start: 1.0 0.675 0.1; end: 1.5 0.675 0.1; color: green"
        ></a-entity>

        <a-entity
          line="start: -1.5 0 0.1; end: -1.25 0.25 0.1; color: red;"
          line__2="start: -1.25 0.25 0.1; end: -0.85 0.95 0.1; color: red;"
          line__3="start:  -0.85 0.95 0.1; end: 0 0.95 0.1; color: red;"
          line__4="start:  0 0.95 0.1; end: 1.5 0.65 0.1; color: red;"
          line__5="start:  1.5 0.65 0.1; end: 1.5 -0.45 0.1; color: red;"
          line__6="start: 1.5 -0.45 0.1; end: 0 -0.85 0.1; color: red;"
          line__7="start:0 -0.85 0.1; end: -1.0 -0.85 0.1; color: red;"
          line__8="start: -1.0 -0.85 0.1; end: -1.5 0 0.1; color: red;"
        ></a-entity> */}

        {/* perso 1 sur forme un avatar 3D */}
        <a-gltf-model
          rotation="0 0 0 "
          // position="-1 0 0.1"
          position="-0.25 0 0.1"
          scale="0.001 0.001 0.001"
          src="#avatarModel"
          class="clickable"
          id="box"
          // animation={`property: position; from: ${x1} ${y1} ${z1} ; to: ${x2} ${y2} ${z2};dur:${speed}; easing: easeInOutQuad; loop: true; dir: alternate`}
          animation="property: position; from: -0.25 0.15 0.5 ; to: 0.25 0.25 0.5;dur:10000; easing: easeInOutQuad; loop: true; dir: alternate"
        ></a-gltf-model>
        {/* deux options quand appuyer sur un avatar */}
        {isClick ? 
          <a-circle id="btnCall" color="black" src="#tele" radius="0.025" position="-0.25 0.15 0.1" class="clickable" ></a-circle> : null }   
        {isClick ? 
          <a-circle id="btnSms" color="black" src="#sms" radius="0.025" position="-0.40 0.15 0.1"  class="clickable"></a-circle> : null } 

        {/* charger les données à partir d'un fichier JSON */}
        {/* {person.data.map((record) => {
          {
            return (
              <a-gltf-model
                rotation="0 0 0"
                position={`${((Math.PI*record.pos.lng / 180) *1/2).toFixed(3)} ${((Math.PI*record.pos.lat / 180) * 1/2).toFixed(3)} 0.5`}
                scale="0.1 0.1 0.1"
                src="#avatarModel"
                // onClick={handleClick}
                
                // animation={`property: position; from: ${x1} ${y1} ${z1} ; to: ${x2} ${y2} ${z2};dur:${speed}; easing: easeInOutQuad; loop: true; dir: alternate`}
                animation={`property: position; from: ${((Math.PI*record.pos.lng / 180) *1/2).toFixed(3)}  ${((Math.PI*record.pos.lat / 180) * 1/2).toFixed(3)} 0.5 ; to: ${((Math.PI*record.pos.lng / 180) *1/2 +1).toFixed(3)}  ${((Math.PI*record.pos.lat / 180) * 1/2 +1 ).toFixed(3)} 0.5;dur:${speed}; easing: easeInOutQuad; loop: true; dir: alternate`}
              ></a-gltf-model>
            );
          }
        })} */}

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
