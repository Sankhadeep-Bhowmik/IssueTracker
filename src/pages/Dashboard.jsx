import CreateIssue from "../issues/CreateIssue";
import Navbar from "../layout/Navbar";
import IssueList from "../issues/IssueList";

const Dashboard = ({ user }) => {
  return (
    <>
      <Navbar user={user} />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <CreateIssue user={user} />
        <IssueList/>
      </div>
    </>
  );
};

export default Dashboard;
