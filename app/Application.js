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

        validate(this);

        const initTime = + new Date();
        this.init();
        this.elapsedTime = (+ new Date()) - initTime;

        this.displayStats();
    }

    init() {
        console.log('Elindultam.');
    }

    displayStats() {
        if (this.statBar) {
            emptyElement(this.statBar)

            addElement(this.statBar, 'p', '', 'Application name: ' + this.name);
            addElement(this.statBar, 'p', '', 'Initialization time: ' + this.elapsedTime + ' s');
        }
    }

    destroy() {
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
