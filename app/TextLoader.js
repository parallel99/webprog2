import { addElement } from "../utils/DOMUtils.js";
import Application from "./Application.js";

class TextLoader extends Application {
    constructor(options) {
        super(options);

        this.name = 'Text Loader';

        this.displayStats();
    }

    init() {
        const container = addElement(this.target, 'p', '', '');

        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'res/text_loader_example');

        xhr.addEventListener('load', function (evt) {
            const text = xhr.responseText;
            container.textContent = text;
        });

        xhr.send();
    }

    destroy() {
        super.destroy();
    }

}

export default TextLoader;
