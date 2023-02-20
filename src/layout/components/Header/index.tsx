import React from 'react';
import { Link } from 'react-router-dom';
import MainLogo from '../../../assets/logo.png';

export default function Header() {
    return (
        <header className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 cursor-pointer">
                <img src={MainLogo} alt="logo" width="60" height="60" />

                <h1 className="text-primary-500 font-semibold text-3xl">
                    Online Store
                </h1>
            </Link>
        </header>
    );
}