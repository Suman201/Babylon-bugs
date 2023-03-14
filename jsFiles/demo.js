import {
  Scene,
  AcquireNativeObjectAsync,
  Tools,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  DynamicTexture,
  StandardMaterial,
  SpriteManager,
  Sprite,
  SceneLoader,
  AssetsManager,
} from '@babylonjs/core';
import "@babylonjs/loaders/glTF";

export function IViewer(t, c) {
  this.data = t;
  Object.setPrototypeOf(this, {
    scene: t => {
      return new Scene(t, {
        autoClear: false,
        autoClearDepthAndStencil: false,
      });
    },
   });

 this.viewer = new Main(this);

  return c && typeof c === 'function' ? c(this) : this;
}

export function Main(e) {
  this.scene = e.scene(e.data.engine);
  this.engine = this.scene.getEngine();

  this.engine.runRenderLoop(() => {
    this.scene.render();
  });

  this.arcCamera = new ArcRotateCamera(
    'ArcCamera',
    0,
    0,
    0,
    new Vector3(0, 45, 0),
    this.scene,
  );
    
   this.arcCamera.attachControl(e.canvas, true);
   this.light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);
   this.material = new StandardMaterial('mat', this.scene);
   this.light.intensity = 0.7;
   this.images={}
   this.textures={}
   const images=[
    {url:'https://playground.babylonjs.com/textures/grass.png'}
   ]
  this.canvasPixelRatio=window.devicePixelRatio;
  this.meshes = {}
  this.imgPath = 'https://dedicateddevelopers.us/babylon-suman/';






   



   Object.setPrototypeOf(this, {

    loadModel: () => {

      const m = MeshBuilder.CreateGround('ground', {width:50, height:50}, this.scene);


      // Append to the scene
      SceneLoader.Append(this.imgPath, 'numbers.gltf', this.scene, (object) => {
        console.log(object, 'object');
      })

      // const assetManager = new AssetsManager(this.scene);
      // const gltfTask = assetManager.addMeshTask('gltf task', '', this.imgPath, 'numbers.gltf');
      // gltfTask.onSuccess = (task) => {
      //   console.log(task, 'task');
      //   // Access the loaded mesh from the task's loaded meshes array
      //   // const mesh = task.loadedMeshes[0];
      
      //   // Do something with the mesh, such as adding it to the scene
      //   // scene.addMesh(mesh);
      // };
      // assetManager.load();
    }



   })
   this.loadModel()

}
