import { useNavigate, Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
import "./Layout.css";

/*<li>
    <Link to="/admin">Admin Page</Link>
  </li>*/

export default function Layout() {
  const { setAuth } = useContext(AuthContext);
  const { auth } = useAuth();
  const navigate = useNavigate();
  console.log(auth);
  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/");
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Logo</Link>
          </li>
          <li>
            <Link to="/prodaj">Продаж</Link>
          </li>
          <li>
            <Link to="/orenda">Оренда</Link>
          </li>
          <li>
            <Link to="/myposters">Мої оголошення</Link>
          </li>
          <li>
            <Link to="/profile">Профіль</Link>
          </li>

          <div className="rightPos">
            {auth.user ? (
              <li>
                <div className="flexGrow">
                  <button onClick={logout}>Sign Out</button>
                </div>
              </li>
            ) : (
              <li className="loginOrRegister">
                <Link to="/login">Login</Link>
                <p>or</p>
                <Link to="/register">Register</Link>
              </li>
            )}
          </div>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
