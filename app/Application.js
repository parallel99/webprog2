import { emptyElement, addElement } from "../utils/DOMUtils.js";

/**
 * Base class for our applications.
 */
class Application {

    /**
     * Instantiates a new Application.
     */
    constructor(options) {
        const opts = options || {};

        this.name = 'App';

        if (typeof opts.target === 'string') {
            this.target = document.getElementById(opts.target);
        } else {
            this.target = opts.target;
        }

        if (typeof opts.statBar === 'string') {
            this.statBar = document.getElementById(opts.statBar);
        } else {
            this.statBar = opts.statBar;
        }

        for (let i in opts) {
            if (i !== 'statBar' && i !== 'target') {
                this[i] = opts[i];
            }
        }

        validate(this);

        const initTime = + new Date();

        this.loadTemplate(initTime);
    }

    init() { }

    loadTemplate(initTime) {
        //Load CSS template
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `app/${this.constructor.name}.css`;
        document.head.appendChild(link);

        //Load HTML template
        const xhr = new XMLHttpRequest();

        xhr.open('GET', `app/${this.constructor.name}.html`);

        xhr.addEventListener('load', function (evt) {

            if (xhr.status === 200) {
                this.target.innerHTML = xhr.responseText;
            }

            this.init();
            this.elapsedTime = (+ new Date()) - initTime;

            this.displayStats();

        }.bind(this));

        xhr.addEventListener('error', function (evt) {
            this.init();
            this.elapsedTime = (+ new Date()) - initTime;

            this.displayStats();
        }.bind(this));

        xhr.send();
    }

    displayStats() {
        if (this.statBar) {
            emptyElement(this.statBar)

            addElement(this.statBar, 'p', '', 'Application name: ' + this.name);
            addElement(this.statBar, 'p', '', 'Initialization time: ' + this.elapsedTime + ' s');
        }
    }

    destroy() {
        const links = document.head.getElementsByTagName('link');
        for (let i = 0; i < links.length; i++) {
            if (links[i].href.endsWith(`app/${this.constructor.name}.css`)) {
                links[i].remove();
                break;
            }
        }
        emptyElement(this.target);
    }
}

function validate(app) {
    if (!(app.target instanceof HTMLElement)) {
        throw new Error('Target can only be a valid HTML element.');
    }

    if (app.statBar && !(app.target instanceof HTMLElement)) {
        throw new Error('Stat bar can only be a valid HTML element.');
    }
}

export default Application;
