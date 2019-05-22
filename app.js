// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// See HW4 writeup for more hints and details.
class App {
  constructor() {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.changeTomusic=this.changeTomusic.bind(this);
    const menuElement = document.querySelector('#menu');
    this.menuScreen = new MenuScreen(menuElement);
    const musicElement = document.querySelector('#musicbox');
    this.musicScreen = new MusicScreen(musicElement);
    this.gifDisplay= new GifDisplay();
    this.playButton= new PlayButton();
    this.findend=this.findend.bind(this);
    addEventListener('changeTomusic',this.changeTomusic);
    addEventListener('findend',this.findend);
    //this.menuScreen.hide();
    //this.musicScreen.show();
  }
  // TODO(you): Add methods as necessary.
  changeTomusic(event) {
    event.preventDefault();
    this.gifDisplay.findthing=this.menuScreen.choosevalue.gif;
    console.log(this.gifDisplay.findthing);
    this.gifDisplay.findgif();
  }
  findend(){
    if(this.gifDisplay.giflength<2){
      document.querySelector('#error').classList.remove('inactive');
    }
    else{
      this.menuScreen.hide();
      this.gifDisplay.show();
      this.playButton.url=this.menuScreen.choosevalue.song;
      this.musicScreen.show();
    }
  }
}
