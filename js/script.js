/* ChatGPT Acknowledgement:
    This is to acknowledge that I have used the assistance of ChatGPT for various explainations and code generation whenever I found myself stuck and in need of help. */

import { message } from "../lang/messages/en/user.js";

class Button {
    constructor(color, width, height, order) {
        this.order = order;
        this.btn = document.createElement('button');
        this.btn.style.backgroundColor = color;
        this.btn.style.width = width;
        this.btn.style.height = height;
        this.btn.innerText = this.order + 1;
        document.getElementById('button-container').appendChild(this.btn);
    }

    setPosition(top, left) {
        this.btn.style.position = 'absolute';
        this.btn.style.top = `${top}px`;
        this.btn.style.left = `${left}px`;
    }

    hideOrder() {
        this.btn.innerText = '';
    }

    showOrder() {
        this.btn.innerText = this.order + 1;
    }
}

class MemoryGame {
    constructor() {
        this.buttons = [];
        this.order = [];
        this.userOrder = [];
        this.buttonContainer = document.getElementById('button-container');
        this.init();
    }

    init() {
        const startButton = document.getElementById('start-button');
        startButton.addEventListener('click', () => this.startGame());
    }

    clearButtons() {
        this.buttons = [];
        this.order = [];
        this.userOrder = [];
        this.buttonContainer.innerHTML = '';
    }
    
    startGame() {
        this.clearButtons();
        const count = parseInt(document.getElementById('button-count').value);
        if (isNaN(count) || count < 3 || count > 7) {
            alert(message.invalidNumber);
            return;
        }
        document.getElementById('button-count').disabled = true;
        document.getElementById('start-button').disabled = true;
        this.createButtons(count);
        setTimeout(() => this.scrambleButtons(count), count * 1000);
    }


    createButtons(count) {
        for (let i = 0; i < count; i++) {
            const color = this.getRandomColor();
            const button = new Button(color, '10em', '5em', i);

            this.buttons.push(button);
            this.order.push(i);
        }
    }

    scrambleButtons(count) {
        const interval = setInterval(() => {
            this.buttons.forEach(button => {
                const windowWidth = window.innerWidth - 100;
                const windowHeight = window.innerHeight - 100;
                const top = Math.floor(Math.random() * windowHeight);
                const left = Math.floor(Math.random() * windowWidth);
                button.setPosition(top, left);
            });
            count--;
            if (count === 0) {
                clearInterval(interval);
                this.hideButtonOrder();
                this.enableUserInput();
            }
        }, 2000);
    }

    hideButtonOrder() {
        this.buttons.forEach(button => button.hideOrder());
    }

    enableUserInput() {
        let currentIndex = 0;
        this.buttons.forEach(button => {
            button.btn.onclick = () => {
                if (button.order === this.order[currentIndex]) {
                    button.showOrder();
                    currentIndex++;
                    if (currentIndex === this.order.length) {
                        alert(message.winMessage);
                        this.resetGame();
                    }
                } else {
                    alert(message.loseMessage);
                    this.revealAll();
                    this.resetGame();
                }
            };
        });
    }

    revealAll() {
        this.buttons.forEach(button => button.showOrder());
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    resetGame() {
        this.clearButtons();
    
        document.getElementById('button-count').disabled = false;
        document.getElementById('start-button').disabled = false;
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    new MemoryGame();
});