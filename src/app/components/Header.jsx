"use client"; // This is a client component
import React, {useState, useEffect} from "react";
import { useMediaQuery } from 'react-responsive'

import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

import Image from 'next/image';


function Header() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    const isBigScreen = useMediaQuery({ minWidth: 1824 });
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
    const isTablet = useMediaQuery({ minWidth : 767 ,maxWidth: 1224 });
    const isMobile = useMediaQuery({ maxWidth: 766 })

    if (!isClient) {
        return null; // Render nothing on the server
    }

    return (
        <div>
            {isBigScreen && 
                <header className="bg-customBlue text-white py-4 px-10 flex justify-between items-center">
                    <div className="font-bold text-xl">MY LOGO</div>
                    <nav className="space-x-4">
                        <a href="#" className="hover:underline">What’s tarot</a>
                        <a href="#" className="hover:underline">Support us</a>
                        <a href="#" className="hover:underline">About us</a>
                    </nav>
                </header>
            }
            {isDesktopOrLaptop &&
                <header className="bg-customBlue text-white py-4 px-10 flex justify-between items-center">
                    <div className="font-bold text-xl">MY LOGO</div>
                    <nav className="space-x-4">
                        <a href="#" className="hover:underline">What’s tarot</a>
                        <a href="#" className="hover:underline">Support us</a>
                        <a href="#" className="hover:underline">About us</a>
                    </nav>
                </header>
            }
            {isTablet &&
                <header className="bg-customBlue text-white py-4 px-5 flex justify-between items-center">
                    <div className="font-bold text-xl">MY LOGO</div>
                    <nav className="space-x-4">
                        <nav className="space-x-4">
                            <a href="#" className="hover:underline">What’s tarot</a>
                            <a href="#" className="hover:underline">Support us</a>
                            <a href="#" className="hover:underline">About us</a>
                        </nav>
                    </nav>
                </header>
            }
            {isMobile &&
                <header className="bg-customBlue text-white py-4 px-5 flex justify-between items-center">
                    <div className="font-bold text-xl">MY LOGO</div>
                    <nav className="space-x-4">
                        <Menu menuButton={<MenuButton><Image className="w-6 h-6" src="icons8-menu-50.png" alt="menu" /></MenuButton>} transition>
                            <MenuItem>What’s tarot</MenuItem>
                            <MenuItem>Support us</MenuItem>
                            <MenuItem>About us</MenuItem>
                        </Menu>
                    </nav>
                </header>
            }
        </div>

    );
}

export default Header;