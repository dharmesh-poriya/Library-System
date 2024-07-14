import BooksAnalytics from '@/app/components/Admin/Analytics/BooksAnalytics';
import UserAnalytics from '@/app/components/Admin/Analytics/userAnalytics';
import React from 'react';

// type Props = {
//     isDashboard?: boolean;
// };


const Dashboard: React.FC = () => {
    return (
        <div className='p-4 border border-blue-600 flex flex-col justify-center'>
            <div className="stats shadow md:w-auto sm:w-auto xs:w-auto lg:mx-44 bg-slate-100 border border-red-500">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value">31K</div>
                    <div className="stat-desc">1st Jan 2024 onwards</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div className="stat-title">Total Books</div>
                    <div className="stat-value">1M</div>
                    <div className="stat-desc">1st Jan 2024 onwards</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                        </svg>
                    </div>
                    <div className="stat-title">New Users</div>
                    <div className="stat-value">3,200</div>
                    <div className="stat-desc">↗︎ 200 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <div className="stat-title">Page Views</div>
                    <div className="stat-value text-secondary">2.6M</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-green-700'>
                <div className=''>
                    <UserAnalytics isDashboard={true} />
                </div>
                <div className=''>
                    <BooksAnalytics isDashboard={true} />
                </div>
            </div>

            <div className="overflow-x-auto mt-4">
                <h1 className='ml-4 text-2xl text-red-500'>Due Books</h1>
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Books Name</th>
                            <th>Author</th>
                            <th>Total Missed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="overflow-x-auto mt-4">
                <h1 className='ml-4 text-2xl text-red-500'>OverDue Books</h1>
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Books Name</th>
                            <th>Author</th>
                            <th>Total Missed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default Dashboard;