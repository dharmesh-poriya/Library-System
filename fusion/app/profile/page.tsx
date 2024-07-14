import React from 'react';

const ProfilePage: React.FC = () => {
    return (
        <div className="p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                <div className="flex items-center mb-4">
                    <img
                        className="w-12 h-12 rounded-full mr-4"
                        src="https://api.dicebear.com/9.x/lorelei/svg?seed=112"
                        alt="User Avatar"
                    />
                    <div>
                        <h2 className="text-lg font-semibold">John Doe</h2>
                        <p className="text-gray-500">Software Engineer</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                    <p className="text-gray-500">Email: john.doe@example.com</p>
                    <p className="text-gray-500">Phone: +1 123-456-7890</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;