import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetQuiz } from '../features/quizSlice';
import { useNavigate } from 'react-router-dom';

const SquareSummary = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        numbers,
        correct,
        incorrect,
        liveSeconds,
    } = useSelector((state) => state.quiz);

    const handleRestart = () => {
        dispatch(resetQuiz());
        navigate('/');
    };

    return (
        <div className="min-h-screen w-[100vw] flex flex-col items-center justify-center gap-6 p-4 bg-gray-100">
            <h1 className="text-4xl font-bold">Quiz Summary</h1>

            <div className="text-xl space-y-2">
                <p>Total Questions: {numbers.length}</p>
                <p>Correct Answers: ✅ {correct.length}</p>
                <p>Incorrect Answers: ❌ {incorrect.length}</p>
                <p>Time Taken: ⏱ {liveSeconds} seconds</p>
            </div>

            {incorrect.length > 0 && (
                <div className=" max-w-2xl bg-white shadow-md rounded-lg p-4 mt-6">
                    <h2 className="text-2xl font-semibold mb-4">Review Mistakes</h2>
                    <ul className="space-y-2">
                        {incorrect.map((item, index) => (
                            <li key={index} className="bg-red-100 p-2 rounded">
                                <p>
                                    Q: {item.question} × {item.question} = ❌ {item.answer} (✅ {item.expected})
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                onClick={handleRestart}
                className="mt-8 px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
                Restart Quiz
            </button>
        </div>
    );
};

export default SquareSummary;
