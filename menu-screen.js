// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor(containerElement) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.selectElem = document.getElementById('song-selector');
    this.containerElement=containerElement;
    this.randomtheme = ['kirito', 'klein', 'asuna', 'starburst', 'sao', 'beater', 'black swordman', 'even faster'];
    this.choosevalue = {song:null,gif:null};
    this.cooljson = null;
    this.gettheme = this.gettheme.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.gosubmit = this.gosubmit.bind(this);
    this.goinput = this.goinput.bind(this);
    this.onStreamProcessed = this.onStreamProcessed.bind(this);
    this.gettheme();
    fetch('//fullstackccu.github.io/homeworks/hw4/songs.json').then(this.onResponse,this.onError).then(this.onStreamProcessed);
    console.log('hi');
    this.form = document.querySelector('form');
    this.form.addEventListener('submit', this.gosubmit);
    document.querySelector("#query-input").addEventListener('input',this.goinput);
  }
  // TODO(you): Add methods as necessary.
   onResponse(response) {
    return response.json();
  }
  onError(error) {
    console.log(error);
  }
  onStreamProcessed(json) {
    console.log(json);
    this.cooljson = json;
    console.log(Object.values(json));
    for (var i=0;i<Object.values(json).length;i++) {
      const selectElem = document.querySelector('#song-selector');
      console.log(Object.values(json)[i].artist);
      console.log(Object.values(json)[i].title);
      let fulltitle = Object.values(json)[i].artist+' : '+Object.values(json)[i].title;
      const optionadded = new Option(fulltitle,i);
      selectElem.add(optionadded);
    }

  }
  gettheme(){
    this.themeplace = document.getElementById('query-input');
    this.themeplace.value = this.randomtheme[this.getRandomInt(this.randomtheme.length)];
    console.log(this.themeplace.value);
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  show() {
    this.containerElement.classList.remove('inactive');
  }
  hide() {
    this.containerElement.classList.add('inactive');
  }
  gosubmit(event){
    event.preventDefault();
    const songnum = document.querySelector("#song-selector").value;
    const gifword = document.querySelector("#query-input").value;
    console.log(songnum);
    console.log(this.choosevalue.song);
    console.log(gifword);
    this.choosevalue.gif = gifword;
    let songurl = Object.values(this.cooljson)[songnum].songUrl;
    this.choosevalue.song = songurl;
    console.log(this.choosevalue);
    let changeTomusic = new CustomEvent('changeTomusic');
    dispatchEvent(changeTomusic);
  }
  goinput(){
    document.querySelector("#error").classList.add('inactive');
  }


}
