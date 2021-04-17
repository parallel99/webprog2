import Application from "./Application.js";

class ScrollDynamic extends Application {
    constructor(options) {
        super(options);

        this.name = 'Scroll dynamic';

        super.displayStats();
    }

    init() {
        const container = document.getElementById('scroll-text-container');
        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'res/text_loader_example');

        xhr.addEventListener('load', function (evt) {
            const text = xhr.responseText;
            container.textContent = text;
        });

        xhr.send();

        this.mode = 'fast';

        document.getElementById('scroll-fast').addEventListener('click', function (evt) {
            this.mode = 'fast';
            this.deactivateBtns();
            evt.target.classList.add('active');
        }.bind(this));

        document.getElementById('scroll-page').addEventListener('click', function (evt) {
            this.mode = 'page';
            this.deactivateBtns();
            evt.target.classList.add('active');
        }.bind(this));

        document.getElementById('scroll-whatever').addEventListener('click', function (evt) {
            this.mode = 'whatever';
            this.deactivateBtns();
            evt.target.classList.add('active');
        }.bind(this));

        container.addEventListener('wheel', function (evt) {
            evt.preventDefault();
            evt.stopPropagation();

            switch (this.mode) {
                case 'fast':
                    container.scrollBy({
                        top: evt.deltaY * 20,
                        behavior: 'smooth'
                    });
                    break;
                case 'page':
                    const direction = evt.deltaY < 0 ? -1 : 1;

                    container.scrollBy({
                        top: container.clientHeight * direction,
                        behavior: 'smooth'
                    });
                    break;
                case 'whatever':
                    container.scrollTop = Math.random() * container.scrollHeight;
                    break;
            }
        }.bind(this));
    }

    destroy() {
        super.destroy();
    }

    deactivateBtns() {
        document.getElementById('scroll-fast').classList.remove('active');
        document.getElementById('scroll-page').classList.remove('active');
        document.getElementById('scroll-whatever').classList.remove('active');
    }
}

export default ScrollDynamic;
