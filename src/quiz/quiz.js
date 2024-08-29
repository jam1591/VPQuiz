import { DOM, ElementStyler } from "../common/utilities.js";
import { QuizScorecard } from "./scorecard.js";
import { QuestionGenerator } from "./question.js";
import { EventHandler } from "../common/events.js";

export class Quiz {
    constructor(container) {
        this.container = container;
        this.category = null;
        this.scorecard = new QuizScorecard();
        this.question = null;
    };

    async build(nextState, category) {
        this.category = category;
        this.question = await QuestionGenerator.generate(this.category);
        DOM.replaceHTML(DOM.select(this.container, '.dark'), htmlStructureDark(this));
        DOM.replaceHTML(DOM.select(this.container, '.light'), htmlStructureLight(this));
        ElementStyler.fadeIn(DOM.select(this.container, '.light'));
        ElementStyler.fadeIn(DOM.select(this.container, '.dark'));
        EventHandler.resetQuestion(this);
        EventHandler.setupChoices(this);
        EventHandler.transitionOutOfState({
            from: this,
            to: nextState,
            element: '#back',
            animate: right()
        })
    };

    clear() {
        DOM.replaceHTML(DOM.select(this.container, '.dark'), "");
        DOM.replaceHTML(DOM.select(this.container, '.light'), "");
        this.scorecard.clear();
    }

    update(question) {
        this.question = question;
        DOM.replaceText(DOM.select(this.container, '#title'), question.title);
        DOM.replaceHTML(DOM.select(this.container, '#choices'), htmlStructureQuestionChoices(question));
        ElementStyler.fadeInQuestion(DOM.select(this.container, '.light'));
        ElementStyler.fadeInQuestion(DOM.select(this.container, '.dark'));
    };
};

function right() {
    return false;
};

function htmlStructureDark(state) {
    return `
        <button id="back" class="btn-dark btn-pd-5 fade" >BACK</button>
        <p id="title" class="title-medium fade fade-question">${state.question.title}</p>
        <p id="scorecard" class="font-medium fade">${state.scorecard.print()}</p>
    `;
};

function htmlStructureLight(state) {
    return `
        <ul id="choices" class="list fade fade-question">
            ${htmlStructureQuestionChoices(state.question)}
        </ul>
        <button id="reset" class="btn-light btn-pd-20 fade" >Next Question</button>
    `;
};

function htmlStructureQuestionChoices(question) {
    let section = "";

    for (let i = 0; i < question.choices.length; i++) {
        const choice = question.choices[i];
        section += `<li class="list-item">${choice}</li>`
    }

    return section;
};