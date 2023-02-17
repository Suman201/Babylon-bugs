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
        <TouchableOpacity
          onPress={() => scene.viewer.addSphere()}
          style={{
            position: 'absolute',
            top: 50,
            right: 20,
            zIndex:2,
            height: 50,
            width: 75,
            backgroundColor: 'red',
            justifyContent:"center", alignItems:"center"
          }}>
          <Text>Click Here</Text>
        </TouchableOpacity>
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
