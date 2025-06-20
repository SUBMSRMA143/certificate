import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    start: '10',
    end: '20',
    started: false,
    numbers: [],
    currentIndex: 0,
    userInput: '',
    correct: [],
    incorrect: [],
    feedback: null,
    showNext: false,
    finished: false,
    liveSeconds: 0,
    timerRunning: true,
}

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setRange: (state, action) => {
            state.start = action.payload.start;
            state.end = action.payload.end;
        },
        startQuiz: (state, action) => {
            state.numbers = action.payload;
            state.started = true;
            state.currentIndex = 0;
            state.userInput = '';
            state.correct = [];
            state.incorrect = [];
            state.feedback = null;
            state.showNext = false;
            state.finished = false;
            state.liveSeconds = 0;
        },
        updateInput: (state, action) => {
            state.userInput = action.payload;
        },
        submitAnswer: (state, action) => {
            const { expected, answer } = action.payload;
            const question = state.numbers[state.currentIndex];
            if (answer === expected) {
                state.correct.push({ question, answer });
                state.feedback = '✅ Correct';
            }
            else {
                state.incorrect.push({ question, answer, expected });
                state.feedback = `❌ Wrong! Correct: ${expected}`;
            }
            state.showNext = true;
        },
        nextQuestion: (state) => {
            state.currentIndex++;
            state.userInput = '';
            state.feedback = null;
            state.showNext = false;
        },
        finishQuiz: (state) => {
            state.finished = true;
        },
        updateTimer: (state, action) => {
            if (typeof action.payload === 'function') {
                state.liveSeconds = action.payload(state.liveSeconds);
            } else {
                state.liveSeconds = action.payload;
            }
        },
        // setShowNext: (state) => {
        //     state.showNext = true;
        // },
        pauseTimer: (state) => {
            state.timerRunning = false;
        },
        resumeTimer: (state) => {
            state.timerRunning = true;
        },
        resetQuiz: () => initialState,
    },
});

export const {
    setRange,
    startQuiz,
    updateInput,
    submitAnswer,
    nextQuestion,
    finishQuiz,
    updateTimer,
    pauseTimer,
    resumeTimer,
    resetQuiz,
    // setShowNext,
} = quizSlice.actions;

export default quizSlice.reducer;