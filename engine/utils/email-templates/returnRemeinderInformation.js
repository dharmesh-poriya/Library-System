function generateBookOverdueTemplate(bookname) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Book Overdue Notification</title>
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
        .button-container {
          text-align: center;
          margin: 20px 0;
        }
        .button {
          background-color: #ff6347; /* Tomato color */
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
          font-size: 16px;
          font-weight: bold;
        }
        .button:hover {
          background-color: #e53e3e; /* Darker shade of Tomato */
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
          <h1>Book Overdue Notification</h1>
        </div>
        <div class="message">
          <p>Hello!</p>
          <p>The book "<strong>${bookname}</strong>" is overdue and needs to be returned as soon as possible.</p>
          <p>Please return the book to avoid any late fees or penalties.</p>
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

<<<<<<< HEAD:engine/utils/email-templates/returnInformation.js
module.exports = { generateBookOverdueTemplate };
=======
module.exports = { generateReturnBookEmail };
>>>>>>> aead0b11d9f217a70f1cdccfd397db758787b53a:engine/utils/email-templates/returnRemeinderInformation.js
