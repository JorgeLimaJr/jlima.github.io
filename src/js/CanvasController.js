import * as PIXI from 'pixi.js';
import * as tweenManager from 'pixi-tween';
import MenuController from './MenuController';
// import anime from 'animejs';

export class CanvasController{

  constructor (myCanvas, window, divLoad, buttonStart, buttonPrev, buttonNext, containerMain, controlNavegationSteps, pageControl, _document, ismobile){

    this.btnMenu = _document.getElementById('icon-menu');
    this.containerMenuLista = _document.getElementById('container-menu');
    this.buttonsMenuLista = [
      this.containerMenuLista.querySelector("nav li:nth-child(1)"),
      this.containerMenuLista.querySelector("nav li:nth-child(2)"),
      this.containerMenuLista.querySelector("nav li:nth-child(3)"),
      this.containerMenuLista.querySelector("nav li:nth-child(4)"),
      this.containerMenuLista.querySelector("nav li:nth-child(5)")
    ];
    this.Menu = new MenuController(this.btnMenu, this.containerMenuLista);

    this._isMobile = ismobile;

    this._cenaHightResolution = [];

    this._containerMain = containerMain;
    this._mainStep_0 = this._containerMain.querySelector("div#step0");
    this._elementsStep_0 = [this._mainStep_0.querySelector("h3"), 
                            this._mainStep_0.querySelector("h1"),
                            this._mainStep_0.querySelector("p"),
                            this._mainStep_0.querySelector("button")];

    this._mainStep_1 = this._containerMain.querySelector("div#step1");
    this._elementsStep_1 = [this._mainStep_1.querySelector("h3"), 
                            this._mainStep_1.querySelector("h1"),
                            this._mainStep_1.querySelector("p"),
                            this._mainStep_1.querySelector("ul.photoGallery li:nth-child(1)"),
                            this._mainStep_1.querySelector("ul.photoGallery li:nth-child(2)"),
                            this._mainStep_1.querySelector("ul.photoGallery li:nth-child(3)")
                          ];


    this._mainStep_2 = this._containerMain.querySelector("div#step2");
    this._elementsStep_2 = [this._mainStep_2.querySelector("h3"), 
                            this._mainStep_2.querySelector("h1"),
                            this._mainStep_2.querySelector("p"),
                            this._mainStep_2.querySelector("ul.photoGallery li:nth-child(1)"),
                            this._mainStep_2.querySelector("ul.photoGallery li:nth-child(2)"),
                            this._mainStep_2.querySelector("ul.photoGallery li:nth-child(3)")
                          ];

    this._mainStep_3 = this._containerMain.querySelector("div#step3");
    this._elementsStep_3= [this._mainStep_3.querySelector("h3"), 
                            this._mainStep_3.querySelector("h1"),
                            this._mainStep_3.querySelector("p"),
                            this._mainStep_3.querySelector("ul.photoGallery li:nth-child(1)"),
                            this._mainStep_3.querySelector("ul.photoGallery li:nth-child(2)"),
                            this._mainStep_3.querySelector("ul.photoGallery li:nth-child(3)")
                          ];

    this._mainStep_4 = this._containerMain.querySelector("div#step4");
    this._elementsStep_4 = [this._mainStep_4.querySelector("h3"), 
                            this._mainStep_4.querySelector("h1"),
                            this._mainStep_4.querySelector("p"),
                            this._mainStep_4.querySelector("button")
                          ];

    this._controlNavegationSteps = controlNavegationSteps;
    this._pageControl = pageControl.querySelectorAll("li");
    this._buttonPrev = buttonPrev;
    this._buttonNext = buttonNext;

  
//     var select = document.querySelector('.select');
// var inner = select.querySelectorAll(':scope .outer .inner');
// inner.length; // 0

    this._currentStep = 0;
    this._reverseStep = false;

    this._frames = {
      goto0_1: [],
      goto0_2: [],
      goto0_3: [],
      goto0_4: [],
      goto1_2: [],
      goto1_3: [],
      goto1_4: [],
      goto2_3: [],
      goto2_4: [],
      goto3_4: []
    }

    this._window = window;
    this._loadingContainer = divLoad;
    this.canvas = myCanvas;
    this._buttonStart = buttonStart;

    this._characterMotionController;
    this.dip = 1;                    
    let targetWidth = 1199;
    let targetHeight = 675;
    this.app = new PIXI.Application(targetWidth, targetHeight, {autoResize: true, resolution: devicePixelRatio , transparent: true, view:  this.canvas});
    this.containerScaler = new PIXI.Container();
    this.app.ticker.add(function(delta) {
        PIXI.tweenManager.update();
    });
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
      this._addListenersButtons();
    }).then((value)=> {
      this._resizeCanvas(this._window);
      //this._window.addEventListener('resize', () => this._resizeCanvas(this._window));
    });

  }

  _preload(){

    this._cenaHightResolution = [
      PIXI.Texture.fromImage('/src/images/web_pixi/0.png'),
      PIXI.Texture.fromImage('/src/images/web_pixi/72.png'),
      PIXI.Texture.fromImage('/src/images/web_pixi/185.png'),
      PIXI.Texture.fromImage('/src/images/web_pixi/255.png'),
      PIXI.Texture.fromImage('/src/images/web_pixi/314.png')
    ];
    

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
      './src/images/web_pixi/bg-15.json',
      './src/images/web_pixi/bg-16.json',
      './src/images/web_pixi/bg-17.json',
      './src/images/web_pixi/bg-18.json',
      './src/images/web_pixi/bg-19.json',
      './src/images/web_pixi/bg-20.json',
      './src/images/web_pixi/bg-21.json',
      './src/images/web_pixi/bg-22.json',
      './src/images/web_pixi/bg-23.json',
      './src/images/web_pixi/bg-24.json',
      './src/images/web_pixi/bg-25.json',
      './src/images/web_pixi/bg-26.json',
      './src/images/web_pixi/bg-27.json',
      './src/images/web_pixi/bg-28.json',
      './src/images/web_pixi/bg-29.json',
      './src/images/web_pixi/bg-30.json',
      './src/images/web_pixi/bg-31.json',
      './src/images/web_pixi/bg-32.json'
      ]
    )
  
    PIXI.loader.once('complete', function(){
      //console.log("loaded");     
    });

    PIXI.loader.load((loader, resources)=>{

      this._motionFirst(0, 314);
            
    });

    

  }

  _motionFirst(nStart, nEnd, nStep){

    //step1 - 0 a 72
    //step1 - 73 a 185
    //step3 - 186 a 255
    //step4 - 256 a 314


    for (let i = 0; i < 72; i++) {
      this._frames.goto0_1.push(PIXI.Texture.fromFrame(i + '.png'));
    }
    for (let i = 0; i < 165; i++) {
      this._frames.goto0_2.push(PIXI.Texture.fromFrame(i + '.png'));
    }
    for (let i = 0; i < 255; i++) {
      this._frames.goto0_3.push(PIXI.Texture.fromFrame(i + '.png'));
    }
    for (let i = 0; i < 314; i++) { //TOTAL
      this._frames.goto0_4.push(PIXI.Texture.fromFrame(i + '.png'));
    }

    for (let i = 73; i < 165; i++) { //TOTAL
      this._frames.goto1_2.push(PIXI.Texture.fromFrame(i + '.png'));
    }
    for (let i = 73; i < 255; i++) { //TOTAL
      this._frames.goto1_3.push(PIXI.Texture.fromFrame(i + '.png'));
    }
    for (let i = 73; i < 314; i++) { //TOTAL
      this._frames.goto1_4.push(PIXI.Texture.fromFrame(i + '.png'));
    }

    for (let i = 186; i < 255; i++) { //TOTAL
      this._frames.goto2_3.push(PIXI.Texture.fromFrame(i + '.png'));
    }
    for (let i = 186; i < 314; i++) { //TOTAL
      this._frames.goto2_4.push(PIXI.Texture.fromFrame(i + '.png'));
    }

    for (let i = 256; i < 314; i++) { //TOTAL
      this._frames.goto3_4.push(PIXI.Texture.fromFrame(i + '.png'));
    }




    this._characterMotionController = new PIXI.extras.AnimatedSprite(this._frames.goto0_4);
    this._characterMotionController.animationSpeed = 0.4;
    this._characterMotionController.loop = false;

    this.containerScaler.addChild(this._characterMotionController);   
    this.app.stage.addChild(this.containerScaler);    
    
    this.app.renderer.plugins.prepare.upload(this._characterMotionController,()=>{
        //console.log('readyToAnim');
        this._removeLoading();
        this._characterMotionController.texture = this._cenaHightResolution[0];
        
    });

    // this.app.renderer.plugins.prepare.registerFindHook(function(item, queue) {
    //   console.log('registerFindHook');
    //   if (item instanceof PIXI.extras.AnimatedSprite) {
    //       for (let i = 0; i < item.textures.length; i++) {
    //       const baseTexture = item.textures[i].baseTexture;
    //       if (queue.indexOf(baseTexture) === -1) {
    //           queue.push(baseTexture);
    //       }
    //       }
    //       return true;
    //     }
    //     return false;
    // });

   // this.app.renderer.plugins.prepare.addHooks.reverse();

  }



  _addListenersButtons(){

    this._buttonStart.addEventListener('click', ()=>{
      this._controllerNavegation(1);
    });

    this._buttonPrev.addEventListener('click', ()=>{
      this._prevStep();
    });

    this._buttonNext.addEventListener('click', ()=>{
      this._nextStep();
    });

    this.btnMenu.addEventListener('click', ()=>{
      this.Menu._openContainerMenu();
    });

    this.buttonsMenuLista[0].addEventListener('click', ()=>{
      this.Menu._openContainerMenu();
      this._characterMotionController.animationSpeed = 1;
      this._controllerNavegation(0);
    });
    this.buttonsMenuLista[1].addEventListener('click', ()=>{
      this.Menu._openContainerMenu();
      this._characterMotionController.animationSpeed = 1;
      this._controllerNavegation(1);
    });
    this.buttonsMenuLista[2].addEventListener('click', ()=>{
      this.Menu._openContainerMenu();
      this._characterMotionController.animationSpeed = 1;
      this._controllerNavegation(2);
    });
    this.buttonsMenuLista[3].addEventListener('click', ()=>{
      this.Menu._openContainerMenu();
      this._characterMotionController.animationSpeed = 1;
      this._controllerNavegation(3);
    });
    this.buttonsMenuLista[4].addEventListener('click', ()=>{
      this.Menu._openContainerMenu();
      this._characterMotionController.animationSpeed = 1;
      this._controllerNavegation(4);
    });

  }

  _nextStep(){
    let goal;
    if(this._currentStep == 4){
      this._characterMotionController.animationSpeed = 1;
      goal = 0;
    }else{
      goal = this._currentStep + 1;
    }
    this._controllerNavegation(goal)
  }

  _prevStep(){
    let goal = this._currentStep - 1;
    this._controllerNavegation(goal)
  }

  _controllerNavegation(goal){

    let frames;
  
    if(this._currentStep == goal) return;

    if(this._currentStep < goal){
        frames = this._frames["goto" + this._currentStep + "_" + goal]
    }else{
      frames = this._frames["goto" + goal + "_" + this._currentStep].reverse();
      this._reverseStep = true;
    }

    this._hideElementsToAnimation(this._currentStep);
    this._currentStep = goal;

    this._characterMotionController._textures = frames;

    this._fadeCanvas(1);

    this._characterMotionController.gotoAndPlay(0);
    this._characterMotionController.onComplete = ()=> {
      this._onCompleteAnimation();
      //console.log(this._reverseStep);
      if(!this._reverseStep) return;
      frames.reverse();
      this._reverseStep = false;
      
    }
      
  };


  _hideElementsToAnimation(currentStep){
    let time = 50;
    let containerElements = this["_mainStep_"+ currentStep];
    let elements = this['_elementsStep_'+ currentStep];
    let lengthElement = elements.length;

    for(let i=0; i< lengthElement ; i++){
      setTimeout(()=>{
        elements[i].style.opacity = 0;
        elements[i].style.transform = "translateY(3rem)";
      },time*i);
    }
    setTimeout(()=>{
      containerElements.style.display = "none";
    },time*lengthElement+50);

    this._controlNavegationSteps.style.display = 'none';
    this._controlNavegationSteps.style.transform = "translateY(100px)";
  }

  _showElementsToAnimation(currentStep){

    let time = 50;
    let containerElements = this["_mainStep_"+ currentStep];
    let elements = this['_elementsStep_'+ currentStep];
    let lengthElement = elements.length;

    containerElements.style.display = "block";
    containerElements.style.opacity = 1;
    
    for(let i=0; i< lengthElement; i++){
      setTimeout(()=>{
        elements[i].style.opacity = 1;
        elements[i].style.transform = "translateY(0rem)";
      },time*i);
    }

    if(currentStep != 0){
      this._controlNavegationSteps.style.display = 'block';
      setTimeout(()=>{
        this._controlNavegationSteps.style.transform = "translateY(0px)";
      },time*lengthElement+50);
    }else{
      this._controlNavegationSteps.style.display = 'none';
      this._controlNavegationSteps.style.transform = "translateY(100px)";
    }
    
  }

  _fadeCanvas(end){
    if(!this._isMobile) return;
    const tween = PIXI.tweenManager.createTween(this._characterMotionController);
    //tween.from({ alpha: start }).to({ alpha: end })
    tween.to({ alpha: end });
    tween.time = 300;
    tween.start();
  }


  _onCompleteAnimation(){

    this._characterMotionController.texture = this._cenaHightResolution[this._currentStep];
    this._fadeCanvas(0.1);

    this._pageControl[0].classList.remove("active");
    this._pageControl[1].classList.remove("active");
    this._pageControl[2].classList.remove("active");
    this._pageControl[3].classList.remove("active");
    this._pageControl[4].classList.remove("active");

    this.buttonsMenuLista[0].classList.remove("active");
    this.buttonsMenuLista[1].classList.remove("active");
    this.buttonsMenuLista[2].classList.remove("active");
    this.buttonsMenuLista[3].classList.remove("active");
    this.buttonsMenuLista[4].classList.remove("active");

    if(this._isMobile){
      this._buttonPrev.classList.remove("buttonPrevLastStep");
      this._buttonNext.classList.remove("buttonNextLastStep");
    };
        

    this._buttonPrev.style.backgroundColor = "#FFF";
    this._buttonNext.style.color = "#FFF";
    this._buttonPrev.style.color = "#160D31";
    this._characterMotionController.animationSpeed = 0.4;

    this._buttonNext.querySelector("span").innerHTML = "NEXT &nbsp; ›";

    this._showElementsToAnimation(this._currentStep);

    switch (this._currentStep) {
      case 0:
        this._containerMain.classList.remove("rightPosition");
        this._pageControl[0].classList.add("active");
        this.buttonsMenuLista[0].classList.add("active");
        break;
      case 1:
        if(!this._isMobile) this._containerMain.classList.add("rightPosition");
        this._buttonNext.style.backgroundColor = "#ffb747";
        this._pageControl[1].classList.add("active");
        this.buttonsMenuLista[1].classList.add("active");
        break;
      case 2:
        this._containerMain.classList.remove("rightPosition");
        this._buttonNext.style.backgroundColor = "#f0404d";
        this._pageControl[2].classList.add("active");
        this.buttonsMenuLista[2].classList.add("active");
        break;
      case 3:
       if(!this._isMobile) this._containerMain.classList.add("rightPosition");
        this._buttonNext.style.backgroundColor = "#03314c";
        this._pageControl[3].classList.add("active");
        this.buttonsMenuLista[3].classList.add("active");
        break;
      case 4:
        this._containerMain.classList.remove("rightPosition");
        this._buttonNext.style.backgroundColor = "#FFF";
        this._buttonNext.style.color = "#160D31";
        this._buttonNext.querySelector("span").innerHTML = "BACK TO TOP";
        this._buttonPrev.style.backgroundColor = "#52a2a9";
        this._buttonPrev.style.color = "#FFF";
        this._pageControl[4].classList.add("active");
        this.buttonsMenuLista[4].classList.add("active");

        if(!this._isMobile) return;
        this._buttonPrev.classList.add("buttonPrevLastStep");
        this._buttonNext.classList.add("buttonNextLastStep");
        //this._buttonNext.style.backgroundColor = "#ffb747";

        break;
      default:

        break;
    }

    

    

  }

  
  _onAnimationComplete(elem, resolve) {
    elem.removeEventListener('transitionend', this._onAnimationComplete);
    resolve();
  }

  _animate(elem, valAlpha, bool) {
    return new Promise((resolve, reject) => {
      elem.addEventListener('transitionend',
                            (e) => this._onAnimationComplete(elem, resolve),
                            false);
      elem.style.opacity = valAlpha;
      if(bool) return;
      elem.style.transform = "translateX(-3rem)";
    });
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

  _removeLoading(){

    // const playAnim = anime({
    //   targets: this._loadingContainer,
    //   opacity: 0,
    //   easing: 'easeInCubic',
    //   loop: false,
    //   autoplay: false,
    //   duration: 600,
    //   complete: (anim) => {
    //     this._loadingContainer.remove(); 
    //   }
    // });

    // playAnim.play();
    this._fadeCanvas(0.1);
    
    this._animate(this._loadingContainer, 0, true)
        .then(() => {
          //console.log(this._currentStep)
          this._loadingContainer.remove();
          this._showElementsToAnimation(0);
        });

  }
    

 


}
  
export default CanvasController;