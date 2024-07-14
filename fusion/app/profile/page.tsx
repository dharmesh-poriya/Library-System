"use client"

import React, {useEffect, useState} from 'react';

const ProfilePage: React.FC = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        _id: "",
    });

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem("user")!))
    }, []);
    
    return (
        <div className="p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                <div className="flex items-center mb-4">
                    <img
                        className="w-12 h-12 rounded-full mr-4"
                        src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${user.email}`}
                        alt="User Avatar"
                    />
                    <div>
                        <h2 className="text-lg font-semibold">{user.name}</h2>
                        <p className="text-gray-500">{user._id}</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                    <p className="text-gray-500">Email: {user.email}</p>
                    {/* <p className="text-gray-500">Phone: +1 123-456-7890</p> */}
                </div>
            </div>
            <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
            </div>
        </div>
    );
};

export default ProfilePage;