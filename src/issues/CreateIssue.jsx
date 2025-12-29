import { useState } from "react";
import {
  addDoc,
  collection,
  Timestamp,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";

const CreateIssue = () => {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Open");
  const [assignedTo, setAssignedTo] = useState("");
  const [error, setError] = useState("");

  // 🔍 CHECK FOR SIMILAR ISSUES
  const checkSimilarIssues = async (newTitle) => {
    const q = query(collection(db, "issues"));
    const snapshot = await getDocs(q);

    const normalizedNewTitle = newTitle.toLowerCase().trim();

    return snapshot.docs.some((doc) => {
      const existingTitle = doc.data().title?.toLowerCase().trim();
      return (
        existingTitle &&
        (existingTitle.includes(normalizedNewTitle) ||
          normalizedNewTitle.includes(existingTitle))
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("You must be logged in to create an issue.");
      return;
    }

    if (!title || !description) {
      setError("Title and description are required.");
      return;
    }

    try {
      // 🔍 SIMILAR ISSUE HANDLING
      const hasSimilarIssue = await checkSimilarIssues(title);

      if (hasSimilarIssue) {
        const confirmCreate = window.confirm(
          "A similar issue already exists. Do you want to create this issue anyway?"
        );

        if (!confirmCreate) {
          return;
        }
      }

      // ✅ CREATE ISSUE IN FIRESTORE
      await addDoc(collection(db, "issues"), {
        title,
        description,
        priority,
        status,
        assignedTo,
        createdAt: Timestamp.now(),
        createdBy: user.email,
      });

      // 🔄 RESET FORM
      setTitle("");
      setDescription("");
      setPriority("Low");
      setStatus("Open");
      setAssignedTo("");
    } catch (err) {
      setError("Failed to create issue. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Create Issue
      </h2>

      {error && (
        <p className="mb-3 text-sm text-red-600 bg-red-100 p-2 rounded">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Issue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />


        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

        <input
          type="text"
          placeholder="Assigned To (email or name)"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create Issue
        </button>
      </form>
    </div>
  );
};

export default CreateIssue;