import { useUser } from "../../context/UserContext";

const Home = () => {
  const { user, isLoggedIn } = useUser();
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome, {user.name}!</h1>
      ) : (
        <h1>Please log in.</h1>
      )}
    </div>
  );
};

export default Home;
