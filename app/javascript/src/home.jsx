import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tweets, setTweets] = useState([]);

  // Fetch the current user
  useEffect(() => {
    fetch("/api/current_user")
      .then((response) => response.json())
      .then((data) => setCurrentUser(data))
      .catch((error) => console.error("Error fetching user:", error));
  }, []);

  // Fetch tweets
  useEffect(() => {
    fetch("/api/tweets")
      .then((response) => response.json())
      .then((data) => setTweets(data))
      .catch((error) => console.error("Error fetching tweets:", error));
  }, []);

  const renderAuthLinks = () => {
    if (currentUser) {
      return (
        <div>
          <p>
            Hi, <strong>{currentUser.username}</strong>!
          </p>
          <Link to="/profile">Profile</Link> |{" "}
          <a href="/logout" data-method="delete" rel="nofollow">
            Logout
          </a>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
        </div>
      );
    }
  };

  const renderTweets = () => {
    if (tweets.length === 0) {
      return <p>No tweets to display. Start following users to see their tweets!</p>;
    }
    return tweets.map((tweet) => (
      <div key={tweet.id} className="tweet">
        <p>
          <strong>@{tweet.username}</strong>: {tweet.content}
        </p>
      </div>
    ));
  };

  return (
    <div className="home">
      <header>
        <h1>Welcome to Twitter Clone</h1>
        {renderAuthLinks()}
      </header>
      <main>
        <h2>Feed</h2>
        <div className="tweets">{renderTweets()}</div>
      </main>
    </div>
  );
};

export default Home;
