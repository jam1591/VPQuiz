import { DOM, ElementStyler } from "./utilities.js";
import { QuestionGenerator } from "../quiz/question.js";
import { Quiz } from "../quiz/quiz.js";

export class EventHandler {
    static resetQuestion(state) {
        DOM.select(state.container, '#reset').addEventListener('click', async () => {
            await state.update(await QuestionGenerator.generate(state.category));
    
            EventHandler.setupChoices(state);
        });
    };

    static setupChoices(state) {
        const choices =  DOM.selectAll(state.container, '#choices li');
        choices.forEach(li => {
            li.addEventListener('click', () => {
                const guess = DOM.selectText(li);
                checkGuess(state, choices, li, guess);
            });
        });
    };

    static transitionOutOfState({from, to, element, animate}) {
        DOM.selectAll(from.container, element).forEach(li => {
            li.addEventListener('click', () => {
                if(animate) {
                    ElementStyler.moveLeft(DOM.select(from.container, '.dark'));
                    ElementStyler.moveRight(DOM.select(from.container, '.light'));
                } else {
                    ElementStyler.moveOriginal(DOM.select(from.container, '.dark'));
                    ElementStyler.moveOriginal(DOM.select(from.container, '.light'));
                };
                ElementStyler.fadeOut(DOM.select(from.container, '.dark'));
                ElementStyler.fadeOut(DOM.select(from.container, '.light'));
                setTimeout(transition.bind(null, li, from, to), 2000);
            });
        });
    }; 
};

function transition(element, from, to) {
    from.clear();
    if(to instanceof Quiz) {
    const quizCategory = DOM.selectText(element).split(' ')[1].toLowerCase();
        to.build(from, quizCategory);
    } else {
        to.build(from);
    }
}

function checkGuess(state, choices, li, guess) {
    state.scorecard.incramentCount();
    if (state.question.isCorrect(guess)) {
        ElementStyler.correctQuestion(li)
        state.scorecard.incramentCorrect();
        removeListeners(state,choices, !showAnswer());
    } else {
        ElementStyler.wrongQuestion(li);
        state.scorecard.incramentWrong();
        removeListeners(state,choices, showAnswer());
    };
};

function removeListeners(state, choices, highlight) {
    choices.forEach(li => {
        const guess = DOM.selectText(li);
        if(highlight) showCorrect(state, guess, li);
        DOM.cloneToRemoveListener(li)
    });
};

function showCorrect(state, guess, element) {
    if(state.question.isCorrect(guess)) {
        ElementStyler.correctQuestion(element)
    };
};

function showAnswer() {
    return true;
};