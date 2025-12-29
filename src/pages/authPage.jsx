import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";


const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center gap-6">
      <Login/>
      <Signup/>
    </div>
  );
};

export default AuthPage;
