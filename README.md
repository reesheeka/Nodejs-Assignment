# Nodejs-Assignment

# MongoDB API Project with ExpressJS, TypeScript, and Mongoose

## Project Description

This project implements a RESTful API for managing users, categories, and questions. The backend is built using **ExpressJS** with **TypeScript**, and **MongoDB** for data storage. The project includes endpoints for user, profile management, category and question handling, and the ability to upload questions in bulk via a CSV file.

## Technologies Used:

- **Node.js** (v18+)
- **Express.js**
- **MongoDB** (with Mongoose for ODM)
- **TypeScript**
- **CSV-Parse** (for bulk CSV question imports)

## Prerequisites

Before you start, ensure that you have the following installed on your local machine:

- **Node.js** (v18 or above)
- **MongoDB** (Local or Cloud-based instance like MongoDB Atlas)

## Setup Instructions

### 1. Clone the Repository

Clone this repository to your local machine:

git clone <repository-url>
cd <project-directory>

### 2. Install dependencies

npm install

### 3. Create a .env file in the root of the project directory and add the following variables:

MONGO_URI= mongodb+srv://reesheeka:rishika123@cluster0.6sez6kq.mongodb.net/assignmentDB
PORT = 3000
JWT_SECRET= hgnisakihsir

### 4. start the server

npm run dev

## API Endpoints

# 1. Register User

Method: POST
Endpoint: /v1/users/register
Description: Register a new user by providing a username, email, and password. Validation check for required fields and user email exist check. Used bcryptjs package for password hashing.
Validation Checks:
Ensure all required fields (username, email, password) are present.
Validate email format.
Check if the email already exists in the database.
Testing Criteria:
Test with valid inputs to ensure the user is registered successfully.
Test with missing or invalid inputs to validate proper error handling.
Test with duplicate emails to confirm the error message.

# 2. Login User

Method: POST
Endpoint: /v1/users/login
Description: Login a user with email and password and obtain a JWT token.
Validation Checks:
Ensure email and password are provided.
Verify the email exists in the database.
Check if the provided password matches the hashed password in the database.
Testing Criteria:
Test with valid credentials to ensure successful login.
Test with invalid email or password to confirm proper error handling.

# 3. View User Profile

Method: GET
Endpoint: /v1/users/:userId
Description: View a user's profile by providing the userId in the URL parameters.
Validation Checks:
Validate the provided userId.
Ensure the user exists in the database.
Testing Criteria:
Test with a valid userId to fetch the user profile.
Test with an invalid or non-existent userId to validate error handling.

# 4. Edit User Profile

Method: PUT
Endpoint: /v1/users/profile
Description: Edit the user profile (username, email, profile picture).
Validation Checks:
Ensure email is provided for lookup.
Validate uploaded profile picture format and size (if provided).
Testing Criteria:
Test with valid email and fields to update the profile successfully.
Test with an invalid email to ensure proper error handling.
Test profile picture upload with valid and invalid file formats.

# 5. Create a New Category

Method: POST
Endpoint: /v1/categories/create
Description: Creates a new category. Each category must have a unique name. validation for required fields and existing category name.
Testing Criteria:
Valid Input: Send a valid request body with name and description. Verify that the category is created successfully.
Duplicate Category Name: Attempt to create a category with an already existing name. Ensure the API returns an error message.
Missing Name: Omit the name field in the request body. Verify the API responds with the appropriate error message.

# 6. Get all category

Method: GET
Endpoint: /v1/categories/getAll
Description: Retrieves all the categories from the database.
Testing Criteria:
Retrieve Categories: Ensure the endpoint returns all available categories with proper data fields (\_id, name, description, createdAt, updatedAt).
Empty Collection: If no categories exist in the database, verify that the API responds with an empty array in the data field.

# 8. Bulk Insert Questions

Method: POST
Endpoint: /v1/questions/bulk-insert
Description: Import multiple questions from a CSV file. Each question can be assigned to multiple categories.
Validation Checks:
Ensure a file is uploaded.
Validate that each question has both text and categories fields in the CSV file.
Verify that all referenced categories exist in the database.
Testing Criteria:
Upload a valid CSV file with correctly formatted data. Verify that questions are inserted, and each question is linked to the appropriate categories.
Test with a CSV containing non-existent categories to check for appropriate error handling.
Test without uploading a file to confirm the API rejects the request.

# 9. Get Questions for Each Category

Method: GET
Endpoint: /api/categories/questions
Description: Retrieves all categories along with their associated questions.
Validation Checks:
Ensure all categories are returned, even if they have no associated questions.
Verify that the questions field only includes the \_id and text for each question.
Testing Criteria:
Verify the response includes all categories, sorted alphabetically.
Confirm that the questions array for each category contains all linked questions.
Test with an empty database to ensure the response gracefully handles the absence of categories or questions.

# 10. Create Answer

Method: POST
Endpoint: /v1/answers/create
Description: Creates a new answer for a specific question by a user
Validation Checks:
Ensure userId, questionId, and answer fields are provided in the request body.
Verify that the provided userId and questionId exist in the database.
Testing Criteria:
Test with valid inputs to ensure the answer is created successfully.
Test with missing fields (userId, questionId, answer) to validate proper error handling.
Test with non-existent userId or questionId to check error messages.

# 11. Get All Users' Answers

Method: GET
Endpoint: /v1/answers/get
Description: Fetches all questions along with users' answers and user details.
Validation Checks:
Ensure questions without answers are included with an empty answers array.
Verify user details are linked correctly with each answer.
Testing Criteria:
Test when there are questions with and without answers to ensure accurate representation.
Validate that answers include the correct answer text and associated userDetails.
Test with an empty database to confirm graceful handling of no data.

## Shared postman collection with you for all api end points

## .csv file example
text,categories
"What is Node.js?","Backend, JavaScript"
"Explain TypeScript?","Frontend, JavaScript"
"Introduction to MongoDB","Database, Backend"
