// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.
class GifDisplay {
    constructor() {
        // TODO(you): Implement the constructor and add fields as necessary.
        this.findthing = null;
        this.coldjson = null;
        this.gif1 = document.querySelector('.gif1');
        this.gif2 = document.querySelector('.gif2');
        this.num1 = null;
        this.num2 = null;
        this.giflength = -1;
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.findgif = this.findgif.bind(this);
        this.getRandomInt = this.getRandomInt.bind(this);
        this.twonum = this.twonum.bind(this);
        this.switchgif = this.switchgif.bind(this);
        addEventListener('kick!', this.switchgif);
    }

    findgif() {
        let giphyAPI = `//api.giphy.com/v1/gifs/search?q=${this.findthing}&api_key=tiLGPpMlV8YV7MBQy6wSpnqSYZ5IWWUo&rating=g&limit=25`;
        fetch(giphyAPI).then(response => {
            return response.json();
        })
            .then(json => {
                if (json.data.length >= 2) {
                    this.coldjson = json;
                    this.twonum();
                    console.log(json.data.length);
                    this.gif1.style.backgroundImage = "url('" + json.data[this.num1].images.downsized.url; + "')";
                    this.gif2.style.backgroundImage = "url('" + json.data[this.num2].images.downsized.url + "')";
                }
                this.giflength = json.data.length;
                let findend = new CustomEvent('findend');
                dispatchEvent(findend);

            })
            .catch(err => {
                console.log(err);
                let findend = new CustomEvent('findend');
                dispatchEvent(findend);
            });
    }

    twonum() {
        var tmp1 = 0;
        var tmp2 = 0;
        while (1==1) {
            tmp1 = this.getRandomInt(this.coldjson.data.length - 1);
            tmp2 = this.getRandomInt(this.coldjson.data.length - 1);
            if (tmp1 != tmp2 && tmp1 != this.gif1 && tmp2 != this.gif2) {
                this.num1 = tmp1;
                this.num2 = tmp2;
                break;
            }
        }
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    switchgif() {
        this.gif1 = document.querySelector('.gif1');
        this.gif2 = document.querySelector('.gif2');
        this.gif1.classList.remove('gif1');
        this.gif1.classList.add('gif2');
        this.gif2.classList.remove('gif2');
        this.gif2.classList.add('gif1');
        this.twonum();
        this.gif2.style.backgroundImage = "url('" + this.coldjson.data[this.num2].images.downsized.url + "')";

    }
    show() {
        this.gif1.classList.remove('inactive');
        this.gif2.classList.remove('inactive');
    }
    hide() {
        this.gif1.classList.add('inactive');
        this.gif2.classList.add('inactive');
    }
    // TODO(you): Add methods as necessary.
}
