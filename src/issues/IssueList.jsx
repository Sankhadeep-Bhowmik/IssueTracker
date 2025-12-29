import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import IssueCard from "./IssueCard";

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "issues"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setIssues(data);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading issues...</p>;

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">All Issues</h3>

      {issues.length === 0 ? (
        <p className="text-gray-500">No issues found</p>
      ) : (
        issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))
      )}
    </div>
  );
};

export default IssueList;
