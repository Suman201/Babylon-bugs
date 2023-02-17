import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {EngineView, useEngine} from '@babylonjs/react-native';
import {
  ArcRotateCamera,
  Color3,
  DynamicFloat32Array,
  DynamicTexture,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  PBRMetallicRoughnessMaterial,
  Scene,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';

const App = () => {
  const engine = useEngine();
  const [scene, setScene] = useState();
  const [camera, setCamera] = useState();

  useEffect(() => {
    if (engine) {
      const scene = new Scene(engine);
      setScene(scene);

      var camera = new ArcRotateCamera(
        'Camera',
        -Math.PI / 2,
        Math.PI / 3,
        25,
        Vector3.Zero(),
        scene,
      );
      setCamera(camera);
      camera.attachControl(null, true);
      var light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
      light.intensity = 0.7;

      var groundWidth = 20;
      var groundHeight = 10;

      var ground = MeshBuilder.CreateGround(
        'ground1',
        {width: groundWidth, height: groundHeight, subdivisions: 25},
        scene,
      );

      var textureResolution = 300;
      var textureGround = new DynamicTexture(
        'dynamic texture',
        textureResolution,
        scene,
      );
      var textureContext = textureGround.getContext();

      var materialGround = new StandardMaterial('Mat', scene);
      materialGround.diffuseTexture = textureGround;
      ground.material = materialGround;


      const o = engine.createCanvasImage();
      o.crossOrigin = 'Anonymous';
      o.src =
        'https://viewer-library-ui.dedicateddevelopers.us/assets/patterns/128/v3d_gpsmap_sand_border.png';
      o.onload = () => {
        textureContext.save();



        textureContext.drawImage(o, 0, 0, o.width, o.height);
        textureGround.update();

        //  console.log("=-[==",l.toDataURL('png'));
      };
    }
  }, [engine]);

  return (
    <>
      <View style={{flex: 1}}>
        {/* <Image source={{}}></Image> */}
        <EngineView camera={camera}></EngineView>
      </View>
    </>
  );
};

export default App;
