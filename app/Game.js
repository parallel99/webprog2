import Application from './Application.js';

class Canvas extends Application {
    constructor(options) {
        super(options);

        this.name = 'Canvas';

        this.displayStats();

        this.jumping = false;
        this.jumpDir = 1;

        this.drawWhenLoaded = function () {
            this.canvas = this.target.children[0];

            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
            this.ctx = this.canvas.getContext('2d');
            this.ctx.imageSmoothingEnabled = true;

            this.initalizeModel();

            window.requestAnimationFrame(this.render.bind(this));
        }.bind(this);

        this.target.addEventListener('appDOMLoaded', this.drawWhenLoaded);

        this.onJumpBtnPress = function (evt) {
            if(evt.key === 'w' && !this.jumping) {
                this.jumping = true;
            }
        }.bind(this);

        window.addEventListener('keydown', this.onJumpBtnPress);
    }

    init() {
        super.init();
    }

    destroy() {
        super.destroy();

        this.target.removeEventListener('appDOMLoaded', this.drawWhenLoaded);
        window.removeEventListener('keydown', this.onJumpBtnPress);
        clearInterval(this.intervalKey);
    }

    initalizeModel() {
        this.player = new Player();
        this.background = new Image();
        this.background.src = './res/game_background.png';
        this.background.addEventListener('load', function (){
            window.requestAnimationFrame(this.render.bind(this));
        }.bind(this));
        this.backgroundPos = 0;

        this.intervalKey = setInterval(this.updateModels.bind(this), 10);
    }

    updateModels() {
        this.backgroundPos++;
        if (this.backgroundPos === this.background.width){
            this.backgroundPos = 0;
        }

        if (this.jumping) {
            if (this.vertPos < 50) {
                this.player.vertPos += this.jumpDir;
                if (this.vertPos === 50) {
                    this.jumpDir = -1;
                }
                if (this.player.vertPos === 0 && this.jumpDir === -1) {
                    this.jumping = false;
                    this.jumpDir = 1;
                }
            }
        }
    }

    render() {
        const height = this.canvas.clientHeight;
        const width = this.canvas.clientWidth;

        this.ctx.clearRect(0, 0, width, height);

        this.renderBackground(width, height);

        this.ctx.strokeRect(20, height/2 - 10 - this.player.height - this.player.vertPos, this.player.width, this.player.height);

        window.requestAnimationFrame(this.render.bind(this));
    }

    renderBackground(width, height) {
        this.ctx.drawImage(this.background, this.backgroundPos, 0, width, height, 0, height / 2 - 500, width, height );
        const emptyLeft = width - (this.background.width - this.backgroundPos);

        if (emptyLeft > 0) {
            this.ctx.drawImage(this.background, 0, 0, emptyLeft, height, width - emptyLeft, height / 2 - 200, emptyLeft, height / 2);
        }
    }
}

class Player {
    constructor(opt_options) {
        const options = opt_options || {};

        this.width = options.width || 20;
        this.height = options.height || 40;

        this.vertPos = 0;
    }
}

export default Canvas;
