import { useState } from 'react'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className='p-2 bg-teal-700 flex justify-between items-center'>
            <div className='text-white'>
                <h1 className='font-black'>KUFIfy</h1>
            </div>

            <div id="navbar-default" className={`absolute right-0 top-12 sm:bg-transparent sm:relative sm:inline sm:top-0 ${isMenuOpen ? '' : 'hidden'}`}>
                    <div className='flex flex-col items-center h-full text-center sm:inline sm:w-full text-white'>
                        <ul className='p-2 flex flex-col sm:flex-row sm:justify-center gap-4 lg:gap-12 bg-teal-700'>
                            <li>
                                <a className="text-sm md:text-lg" href='#'>
                                    New Drawing
                                </a>
                            </li>
                            <li>
                                <a className="text-sm md:text-lg" href='#'>
                                    Download Image
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
        </nav>
    )
}

export default Navbar