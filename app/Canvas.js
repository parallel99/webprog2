import Application from './Application.js';

class Canvas extends Application {
    constructor(options) {
        super(options);

        this.name = 'Canvas';

        this.displayStats();

        this.drawWhenLoaded = function () {
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
        super.destroy();

        this.target.removeEventListener('appDOMLoaded', this.drawWhenLoaded);
        clearInterval(this.intervalKey);
    }

    initalizeModel() {
        this.balls = [];

        const blueBall = new Ball(30);
        blueBall.x = 70;
        blueBall.y = 70;
        blueBall.speed = 2.5;
        blueBall.color = "#0275d8";
        this.balls.push(blueBall);

        const greenBall = new Ball(30);
        greenBall.x = 70;
        greenBall.y = 70;
        greenBall.speed = 2.5;
        greenBall.color = "#5cb85c";
        this.balls.push(greenBall);

        const yellowBall = new Ball(30);
        yellowBall.x = 70;
        yellowBall.y = 70;
        yellowBall.speed = 2.5;
        yellowBall.color = "#f0ad4e";
        this.balls.push(yellowBall);

        this.intervalKey = setInterval(this.updateModels.bind(this), 10);
    }

    updateModels() {
        for (let i = 0; i < this.balls.length; i++) {

            const ball = this.balls[i];

            ball.x += ball.speed * ball.dir[0];
            ball.y += ball.speed * ball.dir[1];

            if (ball.x >= (this.canvas.width - ball.radius)) {
                ball.dir[0] = - 1;
            }
            if (ball.y >= (this.canvas.height - ball.radius)) {
                ball.dir[1] = - 1;
            }
            if (ball.x <= ball.radius) {
                ball.dir[0] = 1;
            }
            if (ball.y <= ball.radius) {
                ball.dir[1] = 1;
            }
        }
    }

    drawShapes() {
        const height = this.canvas.clientHeight;
        const width = this.canvas.clientWidth;

        this.ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < this.balls.length; i++) {
            this.ctx.fillStyle = this.balls[i].color;
            this.ctx.beginPath();
            this.ctx.arc(this.balls[i].x, this.balls[i].y, this.balls[i].radius, 0, Math.PI * 2);
            this.ctx.fill();
        }

        window.requestAnimationFrame(this.drawShapes.bind(this));
    }
}

class Ball {
    constructor(radius, color) {
        this.x = 0;
        this.y = 0;
        this.radius = radius;
        this.speed = 1;
        this.dir = [Math.random(), Math.random()];
        this.color = color;
    }
}

export default Canvas;
