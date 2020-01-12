import * as lottie from 'lottie-web';

export class MenuController{

  constructor (menu, conainerMenu){

    this._toggle = 0;
    this.conainerMenu = conainerMenu;

    this._lottieMenu = lottie.loadAnimation({
        container: menu,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'src/images/icons/data_menu_icon.json'
    });

    // this._lottieLoading = lottie.loadAnimation({
    //     container: loadingIcon,
    //     renderer: 'svg',
    //     loop: true,
    //     autoplay: true,
    //     path: 'src/images/icons/checked_loading.json'
    // });

    //his._lottieLoading.playSegments([[0, 5]],true);
    //this._lottieLoading.loop();

  }
  

  _openContainerMenu(){

    if(this._toggle == 0){
        this.playMenu(0, 15);
        this._toggle = 1;

        this.conainerMenu.style.display = "grid";
        this.conainerMenu.style.opacity = 0;
        setTimeout(()=>{
            this.conainerMenu.style.opacity = 1;
        },10);
    
    }else{
        this.playMenu(15, 0);
        this._toggle = 0;
        
        this._animate(this.conainerMenu, 0)
            .then(() => {
            this.conainerMenu.style.display = "none";
        });
    }  

  }

  playMenu(start, end){
    return this._lottieMenu.playSegments([[start, end]],true);;
  }

  _onAnimationComplete(elem, resolve) {
    elem.removeEventListener('transitionend', this._onAnimationComplete);
    resolve();
  }

  _animate(elem, valAlpha) {
    return new Promise((resolve, reject) => {
      elem.addEventListener('transitionend',
                            (e) => this._onAnimationComplete(elem, resolve),
                            false);
      elem.style.opacity = valAlpha;
    });
  }

}
  
export default MenuController;