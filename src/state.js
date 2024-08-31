import { Category } from "./category/category.js";
import { Quiz } from "./quiz/quiz.js";

const CONTAINER = document.getElementById('container');

export class State {
    constructor() {
        this.quiz = new Quiz(CONTAINER);
        this.category = new Category(CONTAINER);
    }

    run() {
        this.category.build(this.quiz); 
    };
};