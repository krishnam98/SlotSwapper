import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../store/AuthSlice";


export default function AuthPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [isLogin, setIsLogin] = useState(true);
    const { error, success, loading } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const submitHandler = (e) => {
        e.preventDefault();

        if (isLogin) {
            const resp = dispatch(login({ email: form.email, password: form.password }));
            if (success) {
                alert("Login Success");
            }

        }
        else {
            const resp = dispatch(signup({ name: form.name, email: form.email, password: form.password }));
            if (success) {
                alert("Signup Success");
            }
        }
    }


    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">{"Log In / Sign Up"}</h2>
            <form onSubmit={submitHandler} className="space-y-3">

                {!isLogin && (<input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full p-2 border rounded" />)}


                <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full p-2 border rounded" />
                <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                    className="w-full p-2 border rounded" />
                <button className="w-full p-2 bg-blue-600 text-white rounded">{isLogin ? "Log In" : "Sign Up"}</button>
            </form>

            <div className="mt-3 text-sm text-center">
                <button onClick={() => {
                    setIsLogin(!login)
                }} className="text-blue-600">
                    {isLogin ? "Create an account" : "Already have an account? Log in"}
                </button>
            </div>

        </div>
    );
}
