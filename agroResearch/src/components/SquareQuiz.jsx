import React, { useEffect, useRef } from 'react';
import {
    finishQuiz,
    nextQuestion,
    submitAnswer,
    updateTimer,
    updateInput,
    pauseTimer,
    resumeTimer,
    // setShowNext,
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
        showNext,
        finished,
        liveSeconds,
        timerRunning
    } = useSelector((state) => state.quiz);

    // Timer updates
    useEffect(() => {
        if (!timerRunning || finished) return;

        const interval = setInterval(() => {
            dispatch(updateTimer(liveSeconds + 1));
        }, 1000);

        return () => clearInterval(interval);
    }, [dispatch, timerRunning, finished, liveSeconds]);

    // Auto focus on input or next button
    useEffect(() => {
        if (!finished && !showNext && inputRef.current) {
            inputRef.current.focus();
        }
        if (showNext && nextBtnRef.current) {
            nextBtnRef.current.focus(); // ✅ Focus moves to Next automatically
        }
    }, [showNext, finished]);


    const question = numbers[currentIndex];
    const expectedAnswer = question * question;

    const handleSubmit = () => {
        if (userInput.trim() !== '') {
            dispatch(
                submitAnswer({
                    expected: expectedAnswer.toString(),
                    answer: userInput.trim()
                })
            );
            dispatch(pauseTimer());
            // setTimeout(() => {
            //     nextBtnRef.current?.focus(); // ✅ Focus Next button AFTER render
            // }, 0);
        }
    };


    const handleNext = () => {
        if (currentIndex + 1 < numbers.length) {
            dispatch(nextQuestion());
            dispatch(resumeTimer()); // Resume timer
        } else {
            dispatch(finishQuiz());
            navigate("/squares-quiz/quiz-summary");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !showNext) {
            handleSubmit();
        }
        else if (e.key === 'Enter' && showNext) {
            handleNext();
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-10 p-4 bg-white">
            <h1 className="text-3xl font-bold">
                What is {question} × {question}?
            </h1>

            <input
                ref={inputRef}
                type="number"
                value={userInput}
                onChange={(e) => dispatch(updateInput(e.target.value))}
                onKeyDown={handleKeyDown}
                className="p-2 text-xl border border-gray-400 rounded"
                autoFocus
            // disabled={showNext}
            />

            {/* Always show space for feedback */}
            <div className="text-xl font-medium min-h-[28px]">{feedback}</div>

            <button
                onClick={handleSubmit}
                // disabled={showNext}
                className={`px-6 py-2 text-white rounded ${!showNext
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-green-300 cursor-not-allowed'
                    }`}
            >
                Submit
            </button>
            <button
                ref={nextBtnRef}
                onClick={handleNext}
                onKeyDown={handleKeyDown}
                disabled={showNext}
                className={`px-6 py-2 text-white rounded ${showNext
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-300 cursor-not-allowed'
                    }`}
            >
                Next
            </button>


            <div className="text-sm text-gray-500">Time: {liveSeconds}s</div>
        </div>
    );
};

export default SquareQuiz;



// import React, { useEffect, useRef } from 'react'
// import { finishQuiz, nextQuestion, submitAnswer, updateTimer, updateInput, pauseTimer, resumeTimer } from '../features/quizSlice'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const SquareQuiz = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const inputRef = useRef(null);
//     const nextBtnRef = useRef(null);

//     const {
//         numbers,
//         currentIndex,
//         userInput,
//         feedback,
//         showNext,
//         finished,
//         liveSeconds,
//         timerRunning
//     } = useSelector((state) => state.quiz);

//     useEffect(() => {
//         if (!timerRunning || finished) return;

//         const interval = setInterval(() => {
//             dispatch(updateTimer(liveSeconds + 1));
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [dispatch, timerRunning, finished, liveSeconds]);


//     useEffect(() => {
//         if (!finished && !showNext && inputRef.current) {
//             inputRef.current.focus();
//         }
//         if (showNext && nextBtnRef.current) {
//             nextBtnRef.current.focus();
//         }
//     }, [showNext, finished]);

//     const question = numbers[currentIndex];
//     const expectedAnswer = question * question;

//     const handleSubmit = () => {
//         if (userInput.trim() !== "") {
//             dispatch(
//                 submitAnswer({
//                     expected: expectedAnswer.toString(),
//                     answer: userInput.trim(),
//                 })
//             );
//             dispatch(pauseTimer()); // ✅ pause after submitting
//         }
//     }


//     const handleNext = () => {
//         if (currentIndex + 1 < numbers.length) {
//             dispatch(nextQuestion());
//             dispatch(resumeTimer()); // ✅ resume before next question
//         } else {
//             dispatch(finishQuiz());
//             // no resume, quiz is over
//             navigate("./summary");
//         }
//     }


//     const handleKeyDown = (e) => {
//         if (e.key === "Enter") {
//             handleSubmit();
//             // if (showNext) {
//             //     handleNext();
//             // }
//             // else {
//             //     handleSubmit();
//             // }
//         }
//     }
//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center gap-10 p-4 bg-white">
//             <h1 className="text-3xl font-bold">What is {question} X {question}?</h1>
//             <input
//                 ref={inputRef}
//                 type="number"
//                 value={userInput}
//                 onChange={(e) => dispatch(updateInput(e.target.value))}
//                 onKeyDown={handleKeyDown}
//                 className="p-2 text-xl border border-gray-400 rounded"
//                 disabled={showNext}
//             />
//             <div className="text-xl font-medium">{feedback}</div>

//             <button
//                 ref={nextBtnRef}
//                 onClick={handleNext}
//                 className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
//             >
//                 Next
//             </button>

//             <button
//                 onClick={handleSubmit}
//                 className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
//             >
//                 Submit
//             </button>

//             <div className="text-sm text-gray-500">Time: {liveSeconds}s</div>
//         </div>
//     )
// }

// export default SquareQuiz
