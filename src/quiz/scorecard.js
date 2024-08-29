export class QuizScorecard {
    constructor() {
        this.count= 0;
        this.correct = 0;
        this.wrong = 0; 
    };

    incramentCorrect() {
        this.correct++;
    };

    incramentWrong() {
        this.wrong++;
    };

    incramentCount() {
        this.count++;
    };

    print() {
        return `
            You are <strong>${this.count != 0 ? Math.round(this.correct/this.count * 100) : 0}%</strong> 
            correct (${this.correct}/${this.count})!
        `;
    };

    clear() {
        this.count = 0;
        this.correct = 0;
        this.wrong = 0;
    };
};