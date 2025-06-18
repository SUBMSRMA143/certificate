import React from 'react'

const getRandomNumber = () => Math.floor(Math.random() * (35 - 10 + 1)) + 10;


const St = () => {
    const [number, setNumber] = React.useState(getRandomNumber());
    const [input, setInput] = React.useState('');
    const [correct, setCorrect] = React.useState(0);
    const [incorrect, setIncorrect] = React.useState(0);
    const [startTime, setStartTime] = React.useState(Date.now());
    const [liveTimer, setLiveTimer] = React.useState(0);
    const timerRef = React.useRef(null);

    React.useEffect(() => {
        setStartTime(Date.now());
        setInput('');
        setLiveTimer(0);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setLiveTimer(((Date.now() - startTime) / 1000).toFixed(2));
        }, 100);
        return () => clearInterval(timerRef.current);
    }, [number]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userAnswer = Number(input);
        const correctAnswer = number ** 2;
        if (userAnswer === correctAnswer) setCorrect((prev) => prev + 1);
        else setIncorrect((prev) => prev + 1);
        setTimeout(() => setNumber(getRandomNumber()), 1000);
    };

    return (
        <div className="min-h-screen w-[100vw] flex flex-col items-center justify-center gap-4 p-4 bg-gray-200">
            <h1 className="text-xl font-semibold">Square of: {number}</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
                <input
                    className="p-2 rounded border border-gray-400 w-72 text-center"
                    placeholder="Enter square"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className='border border-blue-500 hover:bg-blue-500 bg-blue-400 py-2 px-8 cursor-pointer'  type="submit">Submit</button>
            </form>
            <p className="text-gray-800">Time: {liveTimer} sec</p>
            <div className="flex gap-8 mt-4">
                <p className="text-green-700">Correct: {correct}</p>
                <p className="text-red-600">Incorrect: {incorrect}</p>
            </div>
        </div>
    );

}

export default St
