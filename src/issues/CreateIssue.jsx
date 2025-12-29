import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useState } from "react";

const CreateIssue = ({ user }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    // Safety check
    if (!user) {
      setError("You must be logged in to create an issue.");
      return;
    }

    if (!title.trim()) {
      setError("Issue title cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await addDoc(collection(db, "issues"), {
        title: title.trim(),
        priority,
        status: "Open",
        createdBy: user.email,
        userId: user.uid,
        createdAt: Timestamp.now(),
      });

      // Reset form
      setTitle("");
      setPriority("Low");
    } catch (err) {
      console.error("Error creating issue:", err);
      setError("Failed to create issue. Check Firestore permissions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleCreate}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <h3 className="font-semibold text-lg">Create Issue</h3>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 p-2 rounded">
          {error}
        </p>
      )}

      <input
        className="w-full border p-2 rounded"
        placeholder="Issue title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="w-full border p-2 rounded"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Issue"}
      </button>
    </form>
  );
};

export default CreateIssue;
