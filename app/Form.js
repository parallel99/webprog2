import Application from './Application.js';

class Form extends Application {
    constructor(options) {
        super(options);

        this.removeFloatClass = function () {
            setTimeout(() => {
                const animatedElems = [...this.target.getElementsByClassName('float-start')];
                for (let i = 0; i < animatedElems.length; i++) {
                    animatedElems[i].classList.remove('float-start');
                }
            }, 100)
        }.bind(this);

        this.target.addEventListener('appDOMLoaded', this.removeFloatClass);

        this.name = 'Form';

        this.displayStats();
    }

    init() {
        super.init();

        document.getElementById('app-form').addEventListener('submit', function (evt) {
            evt.preventDefault();
            this.clearValidationMessages();

            const form = evt.target;

            let validation;

            if (form.username.value === "") {
                form.username.classList.add('is-invalid');

                validation = document.getElementById('usernameValidation');
                validation.textContent = 'Username is required!'
                validation.classList.add('invalid-feedback');
            } else {
                form.username.classList.add('is-valid');

                validation = document.getElementById('usernameValidation');
                validation.textContent = ''
            }

            if (form.password.value === "") {
                form.password.classList.add('is-invalid');

                validation = document.getElementById('passwordValidation');
                validation.textContent = 'Password is required!'
                validation.classList.add('invalid-feedback');
            } else {
                form.password.classList.add('is-valid');
            }

            if (form.confirm.value === "") {
                form.confirm.classList.add('is-invalid');

                validation = document.getElementById('confirmValidation');
                validation.textContent = 'Password confirm is required!'
                validation.classList.add('invalid-feedback');
            } else {
                form.confirm.classList.add('is-valid');
            }

            if (form.firstName.value === "") {
                form.firstName.classList.add('is-invalid');

                validation = document.getElementById('firstNameValidation');
                validation.textContent = 'First name is required!'
                validation.classList.add('invalid-feedback');
            } else {
                form.firstName.classList.add('is-valid');
            }

            if (form.lastName.value === "") {
                form.lastName.classList.add('is-invalid');

                validation = document.getElementById('lastNameValidation');
                validation.textContent = 'Last name is required!'
                validation.classList.add('invalid-feedback');
            } else {
                form.lastName.classList.add('is-valid');
            }

            if (form.phoneNumber.value === "") {
                form.phoneNumber.classList.add('is-invalid');

                validation = document.getElementById('phoneNumberValidation');
                validation.textContent = 'Phone number is required!'
                validation.classList.add('invalid-feedback');
            } else {
                form.phoneNumber.classList.add('is-valid');
            }
        }.bind(this));
    }

    destroy() {
        super.destroy();

        this.target.removeEventListener('appDOMLoaded', this.removeFloatClass);
    }

    clearValidationMessages() {
        const form = document.getElementById('app-form');
        const validations = form.getElementsByClassName('validation');

        Array.from(validations).forEach((item) => {
            item.textContent = '';
        });

        Array.from(form.getElementsByTagName('input')).forEach((item) => {
            item.classList.remove('is-invalid');
            item.classList.remove('is-valid');
        });

    }
}

export default Form;
