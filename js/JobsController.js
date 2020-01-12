import templateJob3 from './templates-jobs/templateJob3';

export class JobsController{

  constructor (document, ismobile){

    /*
    overflow-y: hidden;
    -ms-touch-action: none;
    touch-action: none;
    */
   this._document = document;
   
    this._buttonsJobStep = this._document.querySelectorAll(".photoGallery li");
    this._containerJobs = this._document.getElementById("container-jobs");
    this._containerJobsInsertData = this._document.getElementById("container-jobs-insert-data");
    this._closeJobs = this._document.getElementById("close-jobs");
    
    this._isMobile = ismobile;
    
    this._addListenersButtons();

  }
  

  _addListenersButtons(){

    this._buttonsJobStep[0].addEventListener('click', ()=>{
      this._openContainerJobs();
    });

    this._closeJobs.addEventListener('click', ()=>{
      this._closeContainerJobs();
    });

  }

  _openContainerJobs(){
    let job = templateJob3();
    this._containerJobsInsertData.innerHTML = job;

    this._containerJobs.style.display = "block";
    this._document.body.style.overflowY = "scroll";
   
    if(!this._isMobile) return;
    this._document.body.style.touchAction = "manipulation";
    this._document.body.style.MsTouchAction = "manipulation";

  }

  _closeContainerJobs(){

    this._containerJobsInsertData.innerHTML = '';

    this._containerJobs.style.display = "none";
    this._document.body.style.overflowY = "hidden";
   
    if(!this._isMobile) return;
    this._document.body.style.touchAction = "none";
    this._document.body.style.MsTouchAction = "none";

  }



}
  
export default JobsController;