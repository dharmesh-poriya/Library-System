"use client"

import React, { useEffect, useState } from "react";
/*
{
    "message": "User Fetched Successfully",
    "user": {
        "_id": "6693931096fcd6a4186cc046",
        "name": "Vasu",
        "password": "$2a$08$qtUaa4FrMQwNMNJShkt8wOyRgFKubT.8ZTooGB9iRtvzZpHIoqBti",
        "email": "20ceubg080@ddu.ac.in",
        "role": "User",
        "borrowedBooks": [],
        "notifications": [],
        "isVerified": true,
        "tokens": [
            {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkzOTMxMDk2ZmNkNmE0MTg2Y2MwNDYiLCJpYXQiOjE3MjA5NDc0NzMsImV4cCI6MTcyMzUzOTQ3M30.qaY5QCzH176APXGZtQblwHDHGsv3zodSpM6yX43c3QA",
                "_id": "6693931196fcd6a4186cc048"
            },
            {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkzOTMxMDk2ZmNkNmE0MTg2Y2MwNDYiLCJpYXQiOjE3MjA5NDc1NDUsImV4cCI6MTcyMzUzOTU0NX0.t1v91ladTZ425NmkRK7GgI2FGob6KkioUL0-23CXPew",
                "_id": "66939359766f5f88bdbf5554"
            },
            {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjkzOTMxMDk2ZmNkNmE0MTg2Y2MwNDYiLCJpYXQiOjE3MjA5NDg4MjIsImV4cCI6MTcyMzU0MDgyMn0.czMfG0hmVpP0XmPazS6ne8D11V6V97X3fbnfpbjIYZI",
                "_id": "6693985629ffdc7d42e27535"
            }
        ],
        "createdAt": "2024-07-14T08:57:53.857Z",
        "updatedAt": "2024-07-14T09:20:22.942Z",
        "__v": 3
    }
}
*/
const Page: React.FC = () => {
    const [userData, setUserData] = useState([]);
    const [books, setBooks] = useState([{
        _id: "",
        book: "",
        borrowDate: "",
        dueDate: "",
        status: ""
    }]);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.log(error));
    }, []);

    return (
    <div className="p-4">
      <div className="p-2">
        <h1 className="text-2xl font-bold">My Current Books</h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Book Id</th>
                <th>Issue Date</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
                {books.map((book, index) => {
                    if (book.status !== "returned") {
                        return (
                            <tr key={index}>
                                <td>{book.book}</td>
                                <td>{book.borrowDate}</td>
                                <td>{book.dueDate}</td>
                            </tr>
                        );
                    }
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="p-2">
        <h1 className="text-2xl font-bold">Books History</h1>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Book Id</th>
                <th>Issue Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {books.map((book, index) => {
                    if (book.status == "returned") {
                        return (
                            <tr key={index}>
                                <td>{book.book}</td>
                                <td>{book.borrowDate}</td>
                                <td>{book.status}</td>
                            </tr>
                        );
                    }
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
