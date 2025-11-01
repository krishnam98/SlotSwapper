import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/AuthSlice';
import { useDispatch } from 'react-redux';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth');
    };

    return (
        <header className="bg-white shadow p-4 relative">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-2 sm:px-6">
                <Link to="/" className="text-base sm:text-xl font-bold hover:text-blue-600">
                    SlotSwapper
                </Link>
                <nav className="flex gap-2 sm:gap-6 items-center text-xs sm:text-base">
                    <>
                        <Link to="/" className="hover:text-blue-600 cursor-pointer hidden sm:inline">
                            Dashboard
                        </Link>
                        <Link to="/marketplace" className="hover:text-blue-600 cursor-pointer hidden sm:inline">
                            Marketplace
                        </Link>
                        <Link to="/notifications" className="hover:text-blue-600 cursor-pointer hidden sm:inline">
                            Notifications
                        </Link>
                        <button
                            className="sm:hidden hover:text-blue-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            Menu
                        </button>
                        <button
                            className="text-xs sm:text-base hover:text-blue-600"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                </nav>
            </div>

            {isMenuOpen && (
                <div className="sm:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50">
                    <div className="flex flex-col py-2">
                        <Link
                            to="/"
                            className="hover:bg-gray-100 cursor-pointer px-4 py-3"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/marketplace"
                            className="hover:bg-gray-100 cursor-pointer px-4 py-3"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Marketplace
                        </Link>
                        <Link
                            to="/notifications"
                            className="hover:bg-gray-100 cursor-pointer px-4 py-3"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Notifications
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;