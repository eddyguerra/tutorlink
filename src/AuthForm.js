import React, { useState } from "react";

const users = []; // In-memory storage for users

function AuthForm({ onAuth }) {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const payload = Object.fromEntries(data.entries());

        if (isLogin) {
            // Handle Login
            const existingUser = users.find(
                (user) => user.email === payload.email && user.password === payload.password
            );
            if (existingUser) {
                alert("Login successful!");
                onAuth(existingUser);
            } else {
                alert("Invalid credentials!");
            }
        } else {
            // Handle Signup
            const existingUser = users.find((user) => user.email === payload.email);
            if (existingUser) {
                alert("Email already registered!");
            } else {
                users.push(payload);
                alert("Signup successful!");
                onAuth(payload);
            }
        }
    };

    return (
        <div>
            <h1>{isLogin ? "Login" : "Signup"}</h1>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <>
                        <label>
                            Full Name:
                            <input type="text" name="fullName" required />
                        </label>
                        <br />
                    </>
                )}
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" required />
                </label>
                <br />
                <button type="submit">{isLogin ? "Login" : "Signup"}</button>
            </form>
            <button onClick={toggleForm}>
                {isLogin ? "Create an account" : "Already have an account?"}
            </button>
        </div>
    );
}

export default AuthForm;
