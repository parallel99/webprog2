import Application from './Application.js';

class Canvas extends Application {
    constructor(options) {
        super(options);

        this.drawWhenLoaded = function() {
           this.canvas = this.target.children[0];

           this.canvas.width = this.canvas.clientWidth;
           this.canvas.height = this.canvas.clientHeight;
           this.ctx = this.canvas.getContext('2d');
           this.ctx.imageSmoothingEnabled = true;

           this.initalizeModel();

           window.requestAnimationFrame(this.drawShapes.bind(this));
        }.bind(this);

        this.target.addEventListener('appDOMLoaded', this.drawWhenLoaded);
    }

    init() {
        super.init();
    }

    destroy() {
        this.target.removeEventListener('appDOMLoaded', this.drawWhenLoaded);
        clearInterval(this.intervalKey);
    }

    initalizeModel() {
        this.balls = [];

        const sun = new Ball(30);
        sun.x = 70;
        sun.y = 70;
        sun.speed = 3;
        this.balls.push(sun);

        this.intervalKey = setInterval(this.updateModel.bind(this), 10);
    }

    updateModel(){
        const sun = this.balls[0];

        sun.x += sun.speed * sun.dir[0];
        sun.y += sun.speed * sun.dir[1];

        if(sun.x >= this.canvas.width){
            sun.dir[0] = - 1;
        }
        if(sun.y >= this.canvas.width){
            sun.dir[1] = - 1;
        }
        if(sun.x <= 0){
            sun.dir[0] = 1;
        }
        if(sun.y <= 0){
            sun.dir[1] = 1;
        }
    }

    drawShapes(){
        const height = this.canvas.clientHeight;
        const width = this.canvas.clientWidth;

        this.ctx.clearRect(0,0, width, height);

        this.ctx.fillStyle = 'yellow';

        for(let i = 0; i < this.balls.length; i++) {
            this.ctx.beginPath();
            this.ctx.arc(this.balls[i].x, this.balls[i].y, this.balls[i].radius, 0, Math.PI * 2);
            this.ctx.fill();
        }

        window.requestAnimationFrame(this.drawShapes.bind(this));
    }
}

class Ball {
    constructor(radius) {
        this.x = 0;
        this.y = 0;
        this.radius = radius;
        this.speed = 1;
        this.dir = [1, 1];
    }
}

export default Canvas;
