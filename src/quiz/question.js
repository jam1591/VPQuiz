export class Question {
    constructor(data) {
        this.title = data.question;
        this.choices = data.choices;
        this.answer = data.answer;
    };

    isCorrect(guess) {
        return guess == this.answer ? true : false;
    };
};

export class QuestionGenerator {
    static async generate(category) {
        const data = await fetch(`./data/${category}.json`).then(result => result.json()).catch(error => console.log(error));
        const randomInt = Math.floor(Math.random() * data.questions.length);

        return new Question(data.questions[randomInt]);
    };
};