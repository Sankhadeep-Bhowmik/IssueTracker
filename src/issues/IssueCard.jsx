const IssueCard = ({ issue }) => {
  const date =
    issue.createdAt?.toDate?.().toLocaleString() || "N/A";

  return (
    <div className="border p-4 rounded-lg bg-white shadow">
      <h4 className="font-semibold text-lg">{issue.title}</h4>

      <div className="text-sm text-gray-600 mt-1">
        Priority: <span className="font-medium">{issue.priority}</span>
      </div>

      <div className="text-sm text-gray-600">
        Status: <span className="font-medium">{issue.status}</span>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        Created at: {date}
      </div>

      <div className="text-sm text-gray-500">
        Created by: {issue.createdBy}
      </div>
    </div>
  );
};

export default IssueCard;
