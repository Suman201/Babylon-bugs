import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {EngineView, useEngine} from '@babylonjs/react-native';
import {IViewer} from './jsFiles/demo';
 

const App = () => {
  const engine = useEngine();
  const [scene, setScene] = useState();
  const [camera, setCamera] = useState();

  const viewerInit = engine => {
    new IViewer({engine: engine}, t => {
      // console.log(t);
      setScene(t)
      // setCamera(t.arcCamera);
    });
  };

  useEffect(() => {
    if (engine) {
      viewerInit(engine);
    }
  }, [engine]);

  return (
    <>
      <View style={{flex: 1}}>
        <EngineView
          displayFrameRate={true}
          removeClippedSubviews={true}
          antiAliasing={1}
          adaptToDeviceRatio={true}
          ></EngineView>
      </View>
    </>
  );
};

export default App;
