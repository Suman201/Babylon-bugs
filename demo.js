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
