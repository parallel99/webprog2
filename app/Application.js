/**
 * Base class for our applications.
 */
class Application {

    /**
     * Instantiates a new Application.
     */
    constructor(options) {
        const opts = options || {};

        // Egysoros komment
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
        /* Több
        soros komment
        */
        console.log('Elindultam.');
    }

    displayStats() {
        if (this.statBar) {
            while (this.statBar.lastChild) {
                this.statBar.lastChild.remove();
            }

            const appName = document.createElement('p');
            appName.textContent = 'Application name: ' + this.name;

            const initTime = document.createElement('p');
            initTime.textContent = 'Initialization time: ' + this.elapsedTime + ' s';

            this.statBar.appendChild(appName);
            this.statBar.appendChild(initTime);
        }
    }
    
    destroy() {
        while (this.target.lastChild) {
            this.target.lastChild.remove();
        }
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
