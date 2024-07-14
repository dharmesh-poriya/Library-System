"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { QrReader } from "react-qr-reader";
import axios from "axios";

const QRScan = () => {
  const [data, setData] = useState(null);
  const [booksData, setBooksData] = useState({
    userID: "",
    bookID: ""
  });

  const [scan, setScan] = useState(false);

  const makeRequest = async (address: any) => {
    try {
      axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}librarian/assignBook`, {
        bookId: booksData.bookID, userId: booksData.userID
      }, {headers: {"Authorization": `Bearer ${localStorage.getItem("userToken")}`}})
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.info("ERROR", error);
    }
  };

  const handleScan = (data: any) => {
    if (data) {
      setData(data?.text);
      makeRequest(data?.text);
      console.info("DATA", data?.text);
      setScan(false);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    makeRequest(booksData);
    console.info("FORM DATA", booksData);
  };

  const handleChange = (e: any) => {
    setBooksData({
      ...booksData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="container justify-content-center align-items-center mt-5">
        {!scan ? (
          <>
            <div className="">
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-outline-primary w-25 mt-5"
                  onClick={() => setScan(true)}
                >
                  Scan The User QR
                </button>
              </div>
              <center>
                <p className="mt-4">OR</p>
              </center>
              <div className="mx-lg-0 mx-md-0 mx-2 d-flex justify-content-center">
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="form-group">
                    <input
                      type="text"
                      name="userID"
                      value={booksData.userID}
                      onChange={handleChange}
                      className="form-control input-md"
                      placeholder="Enter userID"
                      required
                    />
                    <input
                      type="text"
                      name="bookID"
                      value={booksData.bookID}
                      onChange={handleChange}
                      className="form-control input-md"
                      placeholder="Enter bookID"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-3">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </>
        ) : (
          <>
            <QrReader
              constraints={{ facingMode: "environment" }}
              onResult={(result, error) => {
                if (!!result) {
                  handleScan(result);
                }

                if (!!error) {
                  toast.error("Error while scanning QR code");
                  console.info("ERROR", error);
                }
              }}
              className="w-50 h-75 mx-auto"
            />
            <center>
              <button
                className="btn btn-primary w-25 mt-5"
                onClick={() => setScan(false)}
              >
                Cancel
              </button>
            </center>
          </>
        )}
      </div>
    </>
  );
};

export default QRScan;