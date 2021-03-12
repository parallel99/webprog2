import { addElement } from "../utils/DOMUtils.js";
import Application from './Application.js';

class GuessingGame extends Application {
    constructor(options) {
        super(options);

        super.displayStats();
    }

    init() {
        super.init();
        this.guess = Math.round(Math.random() * 100);

        addElement(this.target, 'p', 'guessing-greet', 'I tought of a number between 0 and 100. Can you guess it?');

        this.input = addElement(this.target, 'input', 'guess-input');
        this.input.type = 'number';
        const btn = addElement(this.target, 'button', 'guessing-btn', 'Guess');
        this.feedback = addElement(this.target, 'p', 'guessing-feedback');

        btn.addEventListener('click', function (evt) {
            const val = parseInt(this.input.value);

            if (val < this.guess) {
                this.feedback.textContent = 'Higher.';
            } else if (val > this.guess) {
                this.feedback.textContent = 'Lower.';
            } else {
                this.feedback.textContent = 'Correct.';
            }
        }.bind(this));
    }

    destroy() {
        super.destroy();
    }
}

export default GuessingGame;
