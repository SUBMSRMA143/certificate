import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { setRange, startQuiz } from '../features/quizSlice';


const generateShuffledNumbers = (start, end) => {
    const numbers = [];
    for (let i = start; i <= end; i++) {
        numbers.push(i);
    }
    for (let i = numbers.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
}

const SquareStartScreen = () => {
    const start = useSelector((state) => state.quiz.start);
    const end = useSelector((state) => state.quiz.end);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleStart = () => {
        const s = parseInt(start);
        const e = parseInt(end);
        if (s >= 1 && s < e) {
            const nums = generateShuffledNumbers(s, e);
            dispatch(startQuiz(nums));
            navigate('/squares-quiz');
        }
    }
    const handleKeyDown = (e) => {
        // console.log("enter pressed");

        if (e.key === 'Enter') {
            handleStart();
        }
    }

    return (
        <div className="min-h-screen w-[100vw] flex flex-col items-center justify-center gap-10 p-4 bg-gray-100">
            <h1 className="text-4xl font-bold">Start Square Training</h1>
            <div className="flex gap-4">
                <div className="flex flex-col gap-2 items-center">
                    <label htmlFor="start-from">From</label>
                    <input
                        id="start-from"
                        type="number"
                        className="p-2 rounded border border-gray-400"
                        value={start}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => dispatch(setRange({ start: e.target.value, end }))}
                        autoFocus
                    />
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <label htmlFor="end-to">To</label>
                    <input
                        id="end-to"
                        type="number"
                        className="p-2 rounded border border-gray-400"
                        value={end}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => dispatch(setRange({ start, end: e.target.value }))}
                    />
                </div>
            </div>
            <button className="px-10 cursor-pointer py-3 text-2xl rounded-2xl text-blue-900 bg-blue-300 hover:bg-blue-400"
                onKeyDown={handleKeyDown}
                onClick={handleStart}>
                Start
            </button>
        </div>
    )
}

export default SquareStartScreen
