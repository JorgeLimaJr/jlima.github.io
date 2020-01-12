import * as PIXI from 'pixi.js'

// export default function CanvasController(myCanvas) {

export class CanvasController{

  constructor (myCanvas, window, divLoad){

    this._characterMotionController = {
      motionStep1:{},
      motionStep2:{},
      motionStep3:{},
      motionStep4:{}
    }

    this._frameSteps = {
      frameStep1:[],
      frameStep2:[],
      frameStep3:[],
      frameStep4:[]
    }

    this._window = window;
    this.loadingContainer = divLoad;
    console.log(this.loadingContainer);
    this.canvas = myCanvas;
    this.dip = 1;                    
    let targetWidth = 1200;
    let targetHeight = 675;
    this.app = new PIXI.Application(targetWidth, targetHeight, {autoResize: true, resolution: devicePixelRatio , transparent: true, view:  this.canvas});
    this.containerScaler = new PIXI.Container();
    
    //this._preload();
    //this._resizeCanvas(window);
    this._promisseController();
  }

  _promisseController(){

    let settingsFramesControl = new Promise(function(resolve, reject) {
      resolve();
    });
    
    settingsFramesControl.then((value)=> {
      this._preload();
      //return value;
    }).then((value)=> {
      this._resizeCanvas(this._window);
    });

  }


  _preload(){


    PIXI.loader.add([
      './src/images/web_pixi/bg-1.json',
      './src/images/web_pixi/bg-2.json',
      './src/images/web_pixi/bg-3.json',
      './src/images/web_pixi/bg-4.json',
      './src/images/web_pixi/bg-5.json',
      './src/images/web_pixi/bg-6.json',
      './src/images/web_pixi/bg-7.json',
      './src/images/web_pixi/bg-8.json',
      './src/images/web_pixi/bg-9.json',
      './src/images/web_pixi/bg-10.json',
      './src/images/web_pixi/bg-11.json',
      './src/images/web_pixi/bg-12.json',
      './src/images/web_pixi/bg-13.json',
      './src/images/web_pixi/bg-14.json',
      './src/images/web_pixi/bg-15.json'
      ]
    )
  
    PIXI.loader.once('complete', function(){
      console.log("loaded");
    });

    PIXI.loader.load((loader, resources)=>{
      this._onAssetsLoaded();
    });


  }


  _onAssetsLoaded(){

    //step1 - 0 a 72
    //step2 - 73 a 185
    //step3 - 186 a 255
    //step4 - 256 a 314

    // for (let i = 0; i < 314; i++) {
    //     frameStep1.push(PIXI.Texture.fromFrame(i + '.png'));
    // }

    for (let i = 0; i < 72; i++) {
      this._frameSteps.frameStep1.push(PIXI.Texture.fromFrame(i + '.png'));
    }

    for (let i = 73; i < 185; i++) {
      this._frameSteps.frameStep2.push(PIXI.Texture.fromFrame(i + '.png'));
    }

    for (let i = 186; i < 255; i++) {
      this._frameSteps.frameStep3.push(PIXI.Texture.fromFrame(i + '.png'));
    }

    for (let i = 256; i < 314; i++) {
      this._frameSteps.frameStep4.push(PIXI.Texture.fromFrame(i + '.png'));
    }

    this._settingAnimatedSprite();
  }

  _settingAnimatedSprite(){

    this._characterMotionController.motionStep1 = new PIXI.extras.AnimatedSprite(this._frameSteps.frameStep1);
    this._characterMotionController.motionStep1.animationSpeed = 0.4
    this._characterMotionController.motionStep1.loop = false
    this._characterMotionController.motionStep1.onComplete = function() { 
        console.log('motionOnComplete');
    };
    this.containerScaler.addChild(this._characterMotionController.motionStep1);
    this.app.stage.addChild(this.containerScaler);
    
    this.app.renderer.plugins.prepare.upload(this._characterMotionController.motinoStep1,()=>{
      console.log('readyToAnim');
      this.loadingContainer.remove(); 
      this._characterMotionController.motionStep1.play();
    });

    this.app.renderer.plugins.prepare.registerFindHook(function(item, queue) {
      if (item instanceof PIXI.extras.AnimatedSprite) {
        for (let i = 0; i < item.textures.length; i++) {
          const baseTexture = item.textures[i].baseTexture;
          if (queue.indexOf(baseTexture) === -1) {
              queue.push(baseTexture);
          }
        }
        return true;
      }
      return false;
    });

    this.app.renderer.plugins.prepare.addHooks.reverse();
   
  }

  _resizeCanvas(window){
    let wW = window.innerWidth*this.dip, wH = window.innerHeight*this.dip;              
    let newWidth = wW;              
    let newHeight = wH;              
    let widthToHeight = this.app.screen.width/this.app.screen.height;             
    let newWidthToHeight = newWidth/newHeight;              
    if (newWidthToHeight < widthToHeight) {                  
        newWidth = newHeight * widthToHeight;              
    } else {                 
        newHeight = newWidth / widthToHeight;             
    }              
    // this.Apply scales to fit the screen             
    this.containerScaler.scale.x = newWidth/this.app.screen.width;             
    this.containerScaler.scale.y = newHeight/this.app.screen.height;                                    
    this.containerScaler.position.x = (wW - newWidth)/2;                 
    this.containerScaler.position.y = (wH - newHeight)/2;
    
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  }


}


export default CanvasController;