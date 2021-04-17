import { addElement } from "../utils/DOMUtils.js";
import Application from './Application.js';

class GuessingGame extends Application {
    constructor(options) {
        super(options);

        this.name = 'Guessing Game';

        super.displayStats();
    }

    validate() {
        super.validate();


        this.min = min || 0;
        this.max = max === 0 ? 0 : max || 100;


        if (this.max <= this.min) {
            throw new Error('Maximum must be larger than minimum.');
        }
    }

    init() {
        super.init();
        this.guess = Math.round(Math.random() * (this.max - this.min) + this.min);

        addElement(this.target, 'p', 'guessing-greet', `I tought of a number between ${this.min} and ${this.max}. Can you guess it?`);

        this.input = addElement(this.target, 'input', 'form-control w-50 guess-input');
        this.input.type = 'number';
        const btn = addElement(this.target, 'button', 'btn btn-secondary w-50 my-3 guessing-btn', 'Guess');
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
