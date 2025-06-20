import React, { useEffect, useRef, useState } from 'react';
import {
    finishQuiz,
    nextQuestion,
    submitAnswer,
    updateTimer,
    updateInput,
    pauseTimer,
    resumeTimer,
} from '../features/quizSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SquareQuiz = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const nextBtnRef = useRef(null);

    const {
        numbers,
        currentIndex,
        userInput,
        feedback,
        // showNext,
        finished,
        liveSeconds,
        timerRunning,
    } = useSelector((state) => state.quiz);

    // ⚠️ LOCAL STATE to ensure sync flow with Enter
    const [isSubmitPhase, setIsSubmitPhase] = useState(true);

    // ⏱️ Timer logic
    useEffect(() => {
        if (!timerRunning || finished) return;
        const interval = setInterval(() => {
            dispatch(updateTimer(liveSeconds + 1));
        }, 1000);
        return () => clearInterval(interval);
    }, [dispatch, timerRunning, finished, liveSeconds]);

    // 👁️ Focus logic
    useEffect(() => {
        if (!finished && isSubmitPhase && inputRef.current) {
            inputRef.current.focus();
        }
        if (!finished && !isSubmitPhase && nextBtnRef.current) {
            nextBtnRef.current.focus();
        }
    }, [isSubmitPhase, finished]);

    const question = numbers[currentIndex];
    const expectedAnswer = question * question;

    const handleSubmit = () => {
        if (userInput.trim() === '') return;
        dispatch(submitAnswer({
            expected: expectedAnswer.toString(),
            answer: userInput.trim(),
        }));
        dispatch(pauseTimer());
        setIsSubmitPhase(false); // 👈 switch to next phase
    };

    const handleNext = () => {
        if (currentIndex + 1 < numbers.length) {
            dispatch(nextQuestion());
            dispatch(resumeTimer());
            setIsSubmitPhase(true); // 👈 back to submit phase
        } else {
            dispatch(finishQuiz());
            navigate("/squares-quiz/quiz-summary");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (isSubmitPhase) {
                handleSubmit();
            } else {
                handleNext();
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-10 p-4 bg-gray-100">
            <h1 className="text-3xl font-bold">
                What is the square of <span className="text-5xl text-blue-600">{question}</span>?
            </h1>

            <input
                ref={inputRef}
                type="number"
                value={userInput}
                onChange={(e) => dispatch(updateInput(e.target.value))}
                onKeyDown={handleKeyDown}
                className="p-2 text-xl border border-gray-400 rounded"
            />

            <div className="text-xl font-medium min-h-[28px]">{feedback}</div>

            <button
                onClick={handleSubmit}
                disabled={!isSubmitPhase}
                className={`px-6 py-2 text-white rounded ${!isSubmitPhase
                    ? 'bg-green-300 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                    }`}
            >
                Submit
            </button>

            <button
                ref={nextBtnRef}
                onClick={handleNext}
                disabled={isSubmitPhase}
                className={`px-6 py-2 text-white rounded ${isSubmitPhase
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                    }`}
            >
                Next
            </button>

            <div className="text-sm text-gray-500">Time: {liveSeconds}s</div>
        </div>
    );
};

export default SquareQuiz;
