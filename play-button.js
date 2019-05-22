// This class will represent the play button in the MusicScreen. Clicking on
// it toggles audio playback.
//
// See HW4 writeup for more hints and details.
class PlayButton {
  constructor() {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.goclick = this.goclick.bind(this);
    this.onKick = this.onKick.bind(this);
    this.button = document.querySelector('.button');
    this.button.addEventListener('click', this.goclick);
    this.firstClick= true;
    this.isplaying = false;
    this.url=null;
    this.audioPlayer=null;
  }
  // TODO(you): Add methods as necessary.
  goclick(){
    console.log('clicked!');
    if (this.isplaying) {
      console.log('starburst');
      this.button.classList.add('stopping');
      this.button.classList.remove('playing');
      this.audioPlayer.pause();
      this.isplaying = false;
    }
    else {
      if(this.firstClick){
        this.audioPlayer = new AudioPlayer();
        this.audioPlayer.setSong(this.url);
        this.audioPlayer.setKickCallback(this.onKick);
        this.firstClick=false;
      }
      this.audioPlayer.play();
      this.button.classList.add('playing');
      this.button.classList.remove('stopping');
      this.isplaying = true;
    }
  }
  onKick() {
    console.log('kick!');
    let kick=new CustomEvent('kick!');
    dispatchEvent(kick);
  }
}

