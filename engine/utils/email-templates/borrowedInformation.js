function generateBorrowInfoEmail(bookTitle, borrowedDate, returnDate) {
  // Convert borrowedDate and returnDate to Date objects
  const borrowed = new Date(borrowedDate);
  const returned = new Date(returnDate);

  // Calculate the duration between borrowed and return dates
  const diffTime = Math.abs(returned - borrowed);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  // Format the duration in human-readable format
  let duration;
  if (diffYears > 0) {
    duration = `${diffYears} year${diffYears > 1 ? "s" : ""}`;
  } else if (diffMonths > 0) {
    duration = `${diffMonths} month${diffMonths > 1 ? "s" : ""}`;
  } else {
    duration = `${diffDays} day${diffDays > 1 ? "s" : ""}`;
  }

  // Generate the email HTML content
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              padding: 0;
              margin: 0;
              width: 100%;
            }
            .container {
              background-color: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
              max-width: 600px;
              margin: 40px auto;
            }
            .header {
              background-color: #d1d5db;
              color: #111827;
              padding: 20px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              color: #111827;
            }
            .message {
              font-size: 18px;
              line-height: 1.6;
              color: #4b5563;
              margin: 20px 0;
              text-align: center;
            }
            .message strong {
              color: #111827;
            }
            .footer {
              font-size: 14px;
              color: #6b7280;
              text-align: center;
              border-top: 1px solid #e5e7eb;
              padding-top: 20px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Book Borrowing Information</h1>
            </div>
            <div class="message">
              <p>Hello,</p>
              <p>You have borrowed the book "<strong>${bookTitle}</strong>".</p>
              <p>Your borrowing period started on ${borrowed.toDateString()}, and it is due to be returned by ${returned.toDateString()}.</p>
              <p>The total duration of your borrowing period is approximately ${duration}.</p>
            </div>
            <div class="footer">
              <p>If you have already returned the book or have any questions, please contact our library staff.</p>
              <p>&copy; 2024 Your Library. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
}

module.exports = { generateBorrowInfoEmail };
