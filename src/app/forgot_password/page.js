'use client'
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";


const Page = () => {
    const [email, setEmail] = useState('');
    const [otpPasswordField, setOtpPasswordField] = useState(false);
    const [newPasswords, setNewPasswords] = useState({});
    const router = useRouter();
    function handleNewPasswordForm(event) {
        setNewPasswords({
            ...newPasswords,
            [event.target.name]: event.target.value
        });
    }

    const sendEmailForForgotPassword = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/forgot_password/${email}`);
            if (response.ok) {
                setOtpPasswordField(true);
            } else {
                console.log('Failed to send OTP');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    async function handleSetNewPassword(event) {
        event.preventDefault();
        const resp = await fetch(`/api/change_forgot_password/${email}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPasswords)
        });
        if (resp.ok) {
            router.replace("/");
        }
    }

    return (
        <>
            <Navbar />
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
            <form onSubmit={sendEmailForForgotPassword} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Enter the email
                    </label>
                    <input
                        type="email"
                        value={email}
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Send OTP
                </button>
            </form>
            {
                otpPasswordField &&
                <form onSubmit={handleSetNewPassword} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            OTP
                        </label>
                        <input
                            maxLength={6}
                            onChange={handleNewPasswordForm}
                            name='otp'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Enter Password
                        </label>
                        <input
                            type='password'
                            onChange={handleNewPasswordForm}
                            name='new_password'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Re-enter Password
                        </label>
                        <input
                            type='password'
                            onChange={handleNewPasswordForm}
                            name='re_enter_new_password'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Set New Password
                        </button>
                    </div>
                </form>
            }
        </div>
        </>
    );
};

export default Page;
