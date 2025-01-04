import { useUser } from "../../context/UserContext";
import { useLocation } from "react-router-dom";
const Home = () => {
  const { user, isLoggedIn } = useUser();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome, {user.email}!</h1>
      ) : (
        <h1>Please log in.</h1>
      )}
    </div>
  );
};

export default Home;
