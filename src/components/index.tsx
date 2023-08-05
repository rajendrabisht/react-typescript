"use client"
import React from 'react';


function Header() {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://ELANCO.com/" className="flex items-center">

                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        ELANCO
                    </span>
                </a>

               
            </div>
        </nav>

    );
}

export default Header;