import Application from './Application.js';

class DisplayCoords extends Application {
    constructor(options) {
        super(options);

        this.name = 'Coordinate display';

        this.displayStats();
    }

    init() {
        super.init();

        this.coordElem = document.createElement('p');
        this.target.appendChild(this.coordElem);

        this.handleClick = function(evt) {
            this.coordElem.textContent = 'X: ' + evt.screenX + ' Y: ' + evt.screenY;
        }.bind(this);

        this.target.addEventListener('click', this.handleClick);
    }

    destroy() {
        super.destroy();

        this.target.removeEventListener('click', this.handleClick);
    }
}

export default DisplayCoords;