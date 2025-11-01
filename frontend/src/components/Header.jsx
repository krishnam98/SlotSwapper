import { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow p-4 relative">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-2 sm:px-6">
                <div className="text-base sm:text-xl font-bold">SlotSwapper</div>
                <nav className="flex gap-2 sm:gap-6 items-center text-xs sm:text-base">
                    <>
                        <span className="hover:text-blue-600 cursor-pointer hidden sm:inline">Dashboard</span>
                        <span className="hover:text-blue-600 cursor-pointer hidden sm:inline">Marketplace</span>
                        <span className="hover:text-blue-600 cursor-pointer hidden sm:inline">Requests</span>
                        <button
                            className="sm:hidden hover:text-blue-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            Menu
                        </button>
                        <button className="text-xs sm:text-base hover:text-blue-600">Logout</button>
                    </>
                </nav>
            </div>

            {isMenuOpen && (
                <div className="sm:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
                    <div className="flex flex-col py-2">
                        <span className="hover:bg-gray-100 cursor-pointer px-4 py-3">Dashboard</span>
                        <span className="hover:bg-gray-100 cursor-pointer px-4 py-3">Marketplace</span>
                        <span className="hover:bg-gray-100 cursor-pointer px-4 py-3">Requests</span>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
