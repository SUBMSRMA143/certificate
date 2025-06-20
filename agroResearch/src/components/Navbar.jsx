import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="fixed left-0 flex w-[100vw] items-center justify-around gap-6 p-4 bg-gray-300">
            <Link to={"/"}>
                <h1 className="text-3xl text-blue-900 font-medium">Number Trainer</h1>
            </Link>
            <div className="buttons flex gap-10">
                <Link to={"/squares-trainer"}>
                    <button className='cursor-pointer text-2xl'>Square Trainer</button>
                </Link>
                <Link to={"/cubes-trainer"}>
                    <button className='cursor-pointer text-2xl'>Cube Trainer</button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
