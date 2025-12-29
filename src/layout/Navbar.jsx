import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Navbar = ({ user }) => {
  return (
    <nav className="flex justify-between items-center bg-white shadow px-6 py-4">
      <h1 className="font-bold text-lg">Smart Issue Board</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.email}</span>
        <button
          onClick={() => signOut(auth)}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
