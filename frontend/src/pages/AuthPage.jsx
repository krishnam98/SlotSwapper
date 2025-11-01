import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { Calendar, Mail, Lock, User } from "lucide-react";
import { useEffect } from "react";

export default function AuthPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [isLogin, setIsLogin] = useState(true);
    const { error, success, loading } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (success) {
            navigate("/");
        }
    })

    const submitHandler = async (e) => {
        e.preventDefault();

        if (isLogin) {
            const resp = await dispatch(login({ email: form.email, password: form.password }));
            if (success) {
                navigate("/")
            }
        }
        else {
            const resp = await dispatch(signup({ name: form.name, email: form.email, password: form.password }));
            if (success) {
                navigate("/")
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center gap-2 mb-2">
                        <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-md">
                            <Calendar className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800">SlotSwapper</h1>
                    </div>
                    <p className="text-sm text-gray-600">Manage and swap your time slots easily</p>
                </div>

                {/* Auth Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>

                    <form onSubmit={submitHandler} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        placeholder="Enter your name"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    placeholder="Enter your email"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    placeholder="Enter your password"
                                    type="password"
                                    value={form.password}
                                    onChange={e => setForm({ ...form, password: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Please wait..." : (isLogin ? "Log In" : "Sign Up")}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}