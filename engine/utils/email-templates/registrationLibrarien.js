function generateLibrarianAssignmentTemplate(username) {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Congratulations!</title>
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
            background-color: #111827;
            color: #ffffff;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
          }
          .button:hover {
            background-color: #374151;
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
            <h1>Congratulations!</h1>
          </div>
          <div class="message">
            <p>Congratulations, <strong>${username}</strong>!</p>
            <p>You have been assigned as a librarian. We trust you will bring valuable contributions to our library.</p>
          </div>
          <div class="button-container">
            <a href="https://www.yourservice.com" class="button">Get Started</a>
          </div>
          <div class="footer">
            <p>If you have any questions, feel free to contact our support team.</p>
            <p>&copy; 2024 Your Service. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
}

module.exports = { generateLibrarianAssignmentTemplate };
