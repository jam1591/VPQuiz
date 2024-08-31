import { DOM } from "../common/utilities.js";
import { ElementStyler } from "../common/utilities.js";
import { EventHandler } from "../common/events.js";

export class Category {
    constructor(container) {
        this.container = container;
        this.categories = ['🦁 India', '🍺 England'];
        this.title = "Welcome to my Quiz! This is a random title I had to write to fill the space...";
        this.description = "by: Vaidotas Petraitis";
    };

    build(nextState) {
        DOM.insert(DOM.select(this.container, '.dark'), htmlStructureDark(this));
        DOM.insert(DOM.select(this.container, '.light'), htmlStructureLight(this));
        ElementStyler.fadeIn(DOM.select(this.container, '.light'));
        ElementStyler.fadeIn(DOM.select(this.container, '.dark'));
        EventHandler.transitionOutOfState({
            from: this, 
            to: nextState, 
            element: '.light ul li',
            animate: left()
        });
    }

    clear() {
        DOM.replaceHTML(DOM.select(this.container, '.dark'), "");
        DOM.replaceHTML(DOM.select(this.container, '.light'), "");
    }
};

function left() {
    return true;
};

function htmlStructureDark(state) {
    return `
        <h1 class="fade">VP QUIZ</h1>
        <p id="title" class="title-small fade">${state.title}</p>
        <p class="fade">${state.description}</p>
    `;
};

function htmlStructureLight(state) {
    return `
        <h1 class="fade">CATEGORY</h1>
        <ul id="choices" class="list fade">
            ${htmlStructureQuestionChoices(state)}
        </ul>
        <p class="fade">Please select above to proceed...</p>
    `;
};

function htmlStructureQuestionChoices(state) {
    let section = "";

    for (let i = 0; i < state.categories.length; i++) {
        const category = state.categories[i];
        section += `<li class="btn-light btn-pd-20">${category}</li>`
    }

    return section;
};