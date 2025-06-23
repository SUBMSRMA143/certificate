// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { resetQuiz } from '../features/quizSlice';
// import { useNavigate } from 'react-router-dom';

// const SquareSummary = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const {
//         numbers,
//         correct,
//         incorrect,
//         liveSeconds,
//     } = useSelector((state) => state.quiz);

//     const handleRestart = () => {
//         dispatch(resetQuiz());
//         navigate('/squares-trainer');
//     };

//     // const handleEnter = () => {
//     //     handleRestart();
//     // }

//     return (
//         <div className="min-h-screen  flex items-center justify-center gap-6 bg-gray-100">
//         <div className="flex  items-center mt-[60px] gap-40">
//             <div className="text-xl space-y-2">
//                 <h1 className="text-4xl font-bold pb-6">Quiz Summary</h1>
//                 <p>Total Questions: {numbers.length}</p>
//                 <p>Correct Answers: ✅ {correct.length}</p>
//                 <p>Incorrect Answers: ❌ {incorrect.length}</p>
//                 <p>Time Taken: ⏱ {liveSeconds} seconds</p>
//                 <button
//                     onClick={handleRestart}
//                     // onKeyDown={handleEnter}
//                     autoFocus
//                     className="mt-8 cursor-pointer px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700"
//                 >
//                     Restart Quiz
//                 </button>
//             </div>

//             {incorrect.length > 0 && (
//                 <div className=" max-w-2xl bg-white shadow-md rounded-lg p-4 mt-6">
//                     <h2 className="text-2xl font-semibold mb-4">Review Mistakes</h2>
//                     <ul className="space-y-2">
//                         {incorrect.map((item, index) => (
//                             <li key={index} className="bg-red-100 p-2 rounded text-center text-2xl">
//                                 <p>Q: {item.question} × {item.question}</p>
//                                 <p> your ans : {item.answer} ❌ , correct ans : {item.expected} ✅</p>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//             </div>


//         </div>
//     );
// };

// export default SquareSummary;


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetQuizRestart } from '../features/quizSlice';
import { useNavigate } from 'react-router-dom';

const SquareSummary = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { numbers, correct, incorrect, liveSeconds, queType } = useSelector((state) => state.quiz);

    const handleRestart = (type) => {
        dispatch(resetQuizRestart(`${type}`));
        navigate(`/${queType.toLowerCase()}-trainer`);
    };

    const total = numbers.length;
    const correctCount = correct.length;
    const incorrectCount = incorrect.length;
    const scorePercent = Math.round((correctCount / total) * 100);

    return (
        <div className="sm:min-h-screen mt-40 sm:mt-10 flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl space-y-6 text-center">
                <h1 className="text-4xl font-bold text-blue-700">✅ Quiz Summary</h1>

                <div className="flex justify-center flex-wrap gap-4 text-lg font-medium">
                    <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                        Total Questions: {total}
                    </div>
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
                        Correct: {correctCount}
                    </div>
                    <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full">
                        Incorrect: {incorrectCount}
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
                        Score: {scorePercent}%
                    </div>
                    <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full">
                        Time Taken: ⏱ {liveSeconds}s
                    </div>
                </div>

                <button
                    onClick={() => handleRestart(queType)}
                    autoFocus
                    className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    🔁 Restart Quiz
                </button>

                {incorrectCount > 0 && (
                    <div className="text-left mt-8">
                        <h2 className="text-2xl font-semibold mb-4 text-red-600">❌ Review Mistakes</h2>
                        <ul className="space-y-4">
                            {incorrect.map((item, index) => (
                                <li
                                    key={index}
                                    className="bg-red-50 border border-red-300 rounded-lg p-4"
                                >
                                    <p className="text-xl font-semibold">
                                        {queType === "Squares"
                                            ? `${item.question} × ${item.question}`
                                            : `${item.question} × ${item.question} × ${item.question}`}
                                    </p>

                                    <p className="mt-2 text-lg">
                                        ❌ Your Answer: <span className="text-red-600">{item.answer}</span>
                                    </p>
                                    <p className="text-lg">
                                        ✅ Correct Answer: <span className="text-green-600">{item.expected}</span>
                                    </p>
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
