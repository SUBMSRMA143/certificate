// import React from 'react'
// import { Link } from 'react-router-dom'

// const Navbar = () => {
//     return (
//         <div className="fixed left-0 flex w-[100vw] items-center justify-around gap-6 p-4 bg-gray-300">
//             <Link to={"/"}>
//                 <h1 className="text-3xl text-blue-900 font-medium">Number Trainer</h1>
//             </Link>
//             <div className="buttons flex gap-10">
//                 <Link to={"/squares-trainer"}>
//                     <button className='cursor-pointer text-2xl'>Square Trainer</button>
//                 </Link>
//                 <Link to={"/cubes-trainer"}>
//                     <button className='cursor-pointer text-2xl'>Cube Trainer</button>
//                 </Link>
//             </div>
//         </div>
//     )
// }

// export default Navbar

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="text-3xl font-medium text-blue-700 hover:text-blue-900 transition">
                    Number Trainer
                </Link>
                <div className="flex gap-6">
                    <Link to="/squares-trainer"> 
                        <button className="px-4 cursor-pointer py-2 text-lg font-medium text-white bg-blue-500 rounded hover:bg-blue-700 transition">
                            Square Trainer
                        </button>
                    </Link>
                    <Link to="/cubes-trainer"> 
                        <button className="px-4 cursor-pointer py-2 text-lg font-medium text-white bg-green-500 rounded hover:bg-green-600 transition">
                            Cube Trainer
                        </button>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
