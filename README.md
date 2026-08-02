# Quiz App

A lightweight JavaScript quiz application with multiple categories and question sets.

## Project structure

- `index.html` - main page markup
- `styles.css` - app styling
- `index.js` - application entry point
- `src/` - modular JavaScript source files
  - `state.js` - manages quiz state
  - `category/category.js` - handles category selection and loading
  - `common/events.js` - shared event handling utilities
  - `common/utilities.js` - helper utilities
  - `quiz/question.js` - question rendering and logic
  - `quiz/quiz.js` - quiz flow and navigation
  - `quiz/scorecard.js` - score and results display
- `data/` - JSON question banks per category
  - `england.json`
  - `general.json`
  - `india.json`

## Usage

1. Open `index.html` in a browser.
2. Choose a category.
3. Answer the quiz questions.
4. View your score at the end.

## Notes

- Add or update question data in the `data/` folder.
- Use the existing module structure in `src/` when expanding features.
