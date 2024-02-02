import { useState } from 'react';
import PropTypes from 'prop-types';

const Navbar = ( {newDrawingFunc , saveImageFunc, clearDrawingFunc }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className='mb-2 bg-teal-700 flex justify-between items-center'>
            <div className='container p-2 mx-auto flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <img src='./kufify.svg' alt='kufify logo' className='h-10' />
                    <h1 className='font-bold text-white'>KUFIfy</h1>
                </div>
                <div id="navbar-default" className={`absolute right-0 top-10 sm:bg-transparent sm:relative sm:inline sm:top-0 ${isMenuOpen ? '' : 'hidden'}`}>
                        <div className='flex flex-col items-center h-full text-center sm:inline sm:w-full text-white'>
                            <ul className='p-2 flex flex-col gap-2 text-sm sm:flex-row sm:justify-center md:gap-5 bg-teal-700'>
                                <li>
                                    <a 
                                        href='#'
                                        onClick={newDrawingFunc}
                                    >
                                        New Draw
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href='#'
                                        onClick={saveImageFunc}
                                    >
                                        Download Image
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href='#'
                                        onClick={clearDrawingFunc}
                                    >
                                        Clear Drawing
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-8 h-8 justify-center text-sm rounded-lg bg-white sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                    onClick={toggleMenu}
                >
                    {!isMenuOpen ? (
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    ) : (
                        <svg
                            className="block h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    )}
                </button>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    newDrawingFunc:PropTypes.func,
    saveImageFunc:PropTypes.func,
    clearDrawingFunc:PropTypes.func
}

export default Navbar