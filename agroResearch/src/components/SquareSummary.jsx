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
        navigate('/squares-trainer');
    };

    // const handleEnter = () => {
    //     handleRestart();
    // }

    return (
        <div className="min-h-screen  flex items-center justify-center gap-6 bg-gray-100">
        <div className="flex  items-center mt-[60px] gap-40">
            <div className="text-xl space-y-2">
                <h1 className="text-4xl font-bold pb-6">Quiz Summary</h1>
                <p>Total Questions: {numbers.length}</p>
                <p>Correct Answers: ✅ {correct.length}</p>
                <p>Incorrect Answers: ❌ {incorrect.length}</p>
                <p>Time Taken: ⏱ {liveSeconds} seconds</p>
                <button
                    onClick={handleRestart}
                    // onKeyDown={handleEnter}
                    autoFocus
                    className="mt-8 cursor-pointer px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Restart Quiz
                </button>
            </div>

            {incorrect.length > 0 && (
                <div className=" max-w-2xl bg-white shadow-md rounded-lg p-4 mt-6">
                    <h2 className="text-2xl font-semibold mb-4">Review Mistakes</h2>
                    <ul className="space-y-2">
                        {incorrect.map((item, index) => (
                            <li key={index} className="bg-red-100 p-2 rounded text-center text-2xl">
                                <p>Q: {item.question} × {item.question}</p>
                                <p> your ans : {item.answer} ❌ , correct ans : {item.expected} ✅</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            </div>


        </div>
    );
};

export default SquareSummary;
