import { Link } from 'react-router-dom';
import { resetQuiz, setQueType } from '../features/quizSlice';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const dispatch = useDispatch();

    const handleClick = (type) => {
        console.log(" clicked", type);
        dispatch(resetQuiz());
        dispatch(setQueType(type))
    }

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <nav className="max-w-7xl mx-auto sm:px-6 px-3 py-4 flex items-center justify-between">
                <Link to="/" className="sm:text-3xl font-medium text-blue-700 hover:text-blue-900 transition">
                    Number Trainer
                </Link>
                <div className="flex sm:gap-6 gap-2">
                    <Link to="/squares-trainer">
                        <button onClick={() => handleClick("Squares")} className="sm:px-4 px-2 cursor-pointer py-2 sm:text-lg text-[10px] font-medium text-white bg-blue-500 rounded hover:bg-blue-700 transition">
                            Square Trainer
                        </button>
                    </Link>
                    <Link to="/cubes-trainer">
                        <button onClick={() => handleClick("Cubes")} className="px-4 cursor-pointer py-2 sm:text-lg text-[10px] font-medium text-white bg-green-500 rounded hover:bg-green-600 transition">
                            Cube Trainer
                        </button>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
