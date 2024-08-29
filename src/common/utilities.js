export class DOM {
    static insert(selector, elements) {
        selector.insertAdjacentHTML('afterbegin', elements)
    };

    static replaceText(selector, element) {
        selector.innerText = element;
    };

    static replaceHTML(selector, element) {
        selector.innerHTML = element;
    };

    static select(selector, element) {
        return selector.querySelector(element);
    }

    static selectText(selector) {
        return selector.innerText;
    };

    static selectAll(selector, element) {
        return selector.querySelectorAll(element);
    };

    static cloneToRemoveListener(selector) {
        const clone = selector.cloneNode(true);
        selector.parentNode.replaceChild(clone, selector);
    };
};

export class ElementStyler {
    static correctQuestion(element) {
        element.style.background= 'linear-gradient(90deg, rgba(158,235,182,1) 0%, rgba(193,244,209,1) 100%)'
        element.style.color = '#385a41';
    };

    static wrongQuestion(element) {
        element.style.background= 'linear-gradient(90deg, rgba(241,124,172,1) 0%, rgba(240,172,202,1) 100%)'
        element.style.color = '#763a55';
    };

    static moveLeft(selector) {
        selector.style.transform = 'translate(-100%, 0)';
    };

    static moveRight(selector) {
        selector.style.transform = 'translate(100%, 0)';
    };

    static moveOriginal(selector) {
        selector.style.transform = 'translate(0, 0)';
    }

    static fadeOut(selector) {
        DOM.selectAll(selector,'.fade').forEach(element => {
            element.classList.remove('fade-in-item')
            element.classList.add('fade-out-item');
        });
    };

    static fadeIn(selector) {
        DOM.selectAll(selector,'.fade').forEach(element => {
            element.classList.remove('fade-out-item');
            element.classList.add('fade-in-item');
        });
    };

    static fadeInQuestion(selector) {
        DOM.selectAll(selector,'.fade-question').forEach(element => {
            element.classList.remove('fade-in-item');
            element.offsetWidth;
            element.classList.add('fade-in-item');
        });
    };
};