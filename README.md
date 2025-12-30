Core Features Implemented



1️⃣ Create Issue


Each issue contains the following fields:

Title

Description

Priority (Low / Medium / High)

Status (Open / In Progress / Done)

Assigned To (email or name)

Created Time (Firestore timestamp)

Created By (logged-in user’s email)



2️⃣ Similar Issue Detection


To avoid duplicate issues:

When a user creates an issue, the app checks existing issues in Firestore.

Issue titles are compared using basic string matching.

If a similar issue exists, the user is shown a confirmation warning and can choose whether to proceed.

This approach keeps the solution simple while still being practical and user-friendly.



3️⃣ Issue List


All issues are fetched from Firestore in real time.

Issues are displayed in newest-first order.

Each issue card shows key details such as title, priority, status, and assignee.



4️⃣ UI & UX


Tailwind CSS is used for consistent styling.

Clean form layout for issue creation.

Error messages are shown clearly for validation and authentication issues.



🗂️ Firestore Data Structure


Collection: issues

Each document in the issues collection has the following structure:


{

  "title": "Login page error",

  "description": "Login fails with invalid API key",

  "priority": "High",

  "status": "Open",

  "assignedTo": "admin@example.com",

  "createdAt": "Timestamp",

  "createdBy": "user@example.com"

}



This structure is simple, scalable, and easy to query.



⚙️ Environment Variables


Firebase configuration is handled using environment variables:

VITE_FIREBASE_API_KEY

VITE_FIREBASE_AUTH_DOMAIN

VITE_FIREBASE_PROJECT_ID

VITE_FIREBASE_STORAGE_BUCKET

VITE_FIREBASE_MESSAGING_SENDER_ID

VITE_FIREBASE_APP_ID



These variables are configured locally using .env and added manually in Vercel for production deployment.



⚠️ Challenges Faced


Understanding Firebase environment variable handling in Vite and Vercel.

Ensuring the UI remained consistent when integrating new logic.

Designing similar issue detection without over-engineering the solution.



🔮 What I Would Improve Next


If given more time, I would make the following improvements to enhance the application:


Advanced Issue Similarity Detection
Improve the current title-based matching by using keyword extraction or fuzzy matching to detect similar issues more accurately.


Strict Status Workflow Enforcement
Enforce proper status transitions such as Open → In Progress → Done to better reflect real-world issue lifecycles.


Filtering and Search
Add filters for issue status and priority, along with a search feature to quickly find specific issues.


Role-Based Access Control
Introduce roles like Admin and User to control who can assign issues or change statuses.


UI/UX Enhancements
Add loading indicators, empty-state messages, and confirmation modals to improve overall user experience.