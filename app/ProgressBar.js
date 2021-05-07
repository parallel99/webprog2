import Application from './Application.js';

class ProgressBar extends Application {
    constructor(options) {
        super(options);

        this.name = 'ProgressBar';
        this.displayStats();

        this.setupProgress = function () {
            this.barFill = document.getElementById('fill');
            this.state = 0;
        }.bind(this);

        this.target.addEventListener('appDOMLoaded', this.setupProgress);
    }

    get state() {
        return this.state_;
    }

    set state(value) {
        this.state_ = value;
        this.barFill.style.width = `${value}%`;
    }

    init() {
        super.init();

        document.getElementById('start-progress').addEventListener('click', function () {
            this.start();
        }.bind(this));
    }

    destroy() {
        super.destroy();

        this.target.removeEventListener('appDOMLoaded', this.setupProgress);
        clearInterval(this.intervalKey);
    }

    async start() {
        this.state = 0;

        const startTime = + new Date();
        console.log('Started');

        try {
            const primes = await this.findPrimes(parseFloat(document.getElementById("numbers").value));
            const elapsed = + new Date() - startTime;
            console.log(`Finished in ${elapsed / 1000} seconds.`);
            console.log(primes);
        } catch (error) {
            console.error(error);
            this.state = 0;
            throw error;
        }
    }

    async updateState(newVal) {
        this.state = newVal;
    }

    async findPrimes(numPrimes, currNum, primeArr) {
        if (typeof numPrimes !== 'number' || (numPrimes | 0) !== numPrimes || numPrimes < 0) {
            throw new Error('Number of primes must be a positive integer.');
        }

        primeArr = primeArr || [];

        if (numPrimes === 0) {
            return primeArr;
        }

        currNum = currNum || 1;
        while (primeArr.length < numPrimes) {
            if (this.isPrime(currNum)) {
                primeArr.push(currNum);

                this.state = primeArr.length / numPrimes * 100;

                if (primeArr.length >= numPrimes) {
                    this.state = 100;
                    return primeArr;
                } else if (primeArr.length % 100 === 0) {
                    currNum += currNum < 3 ? 1 : 2;
                    break;
                }

                if (primeArr.length >= numPrimes) {
                    break;
                }
            }

            currNum += currNum < 3 ? 1 : 2;
        }

        return await new Promise(function (res) {
            setTimeout(function () {
                res(this.findPrimes(numPrimes, currNum, primeArr));
            }.bind(this), 0);
        }.bind(this));
    }

    isPrime(num) {
        if (num < 4) {
            return true;
        }

        if (num % 2 === 0) {
            return false;
        }

        for (let i = 3; i < num; i += 2) {
            if (num % i === 0) {
                return false;
            }
        }

        return true;
    }

}

export default ProgressBar;
