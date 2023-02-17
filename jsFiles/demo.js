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
} from '@babylonjs/core';

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
  






   



   Object.setPrototypeOf(this, {
    customPattern:(e)=>{  
      for (let w = 0; w < e.width; w += e.image.width)
            for (let h = 0; h < e.height; h += e.image.height)
              e.ctx.clearRect(0, 0, w, h), e.ctx.drawImage(e.image, w, h);
    },
    loadImages:(e)=>{
      for (let index = 0; index < e.length; index++) {
        const element = e[index];
        const s = this.engine.createCanvasImage();
        s.src = element.url;
        s.onload=()=>{
          this.images[element.url] = s
        }
      }
     },

    updateDynamicTexture:(e)=>{      
      const x = {
        image: this.images['https://playground.babylonjs.com/textures/grass.png'], width: e.w, height: e.h, ctx: e.ctx
      }
      this.customPattern(x);  
      
     },
     addSphere:  () => {
      for (let index = 0; index < 100; index++) {
        if(!this.meshes[`spare${index}`]){
          const s =  new MeshBuilder.CreateSphere(`spare${index}`, {diameter:2}, this.scene);
          s.position = new Vector3(Math.random() * (20 - -10) + -10, 0, Math.random() * (20 - -10) + -10) ;
          s.material=this.material.clone();
          const t =  new DynamicTexture('texture', {width:512, height:512}, this.scene, true);
          const data= {ctx:t.getContext('2D'), w: 512, h: 512, id: "texture_", t: t};
          this.updateDynamicTexture(data), 
          s.material.diffuseTexture = t; t.update();
          this.meshes[`spare${index}`] = s;
        } else {
          let e = this.meshes[`spare${index}`], size = {};
          e.material && e.material.diffuseTexture && ( size = e.material.diffuseTexture.getSize(), e.material.diffuseTexture.getContext
          ('2d').clearRect(0,0,size.width, size.height), e.material.diffuseTexture._canvas && (e.material.diffuseTexture._canvas = null), e.material.diffuseTexture.dispose(),
          e.material.diffuseTexture = null      
          );

          setTimeout(() => {
            const t = new DynamicTexture('texture', {width:512, height:512}, this.scene, true)
            const data = {ctx: t.getContext('2D'), w: 512, h: 512, id: "texture_", t: t};
            this.updateDynamicTexture(data), 
            e.material.diffuseTexture = t, t.update();
          }, 100);
        
        }
        
       
      }
     },
   })
   this.loadImages(images)

}
