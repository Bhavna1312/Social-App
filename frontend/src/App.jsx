import React, { useState, useEffect } from "react";
// Ensure these paths match your folder structure
import Login from "./pages/login.jsx";
import Register from "./pages/Register.jsx";
import PostCard from "./components/PostCard.jsx";
import CreatePost from "./components/CreatePost.jsx";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null); // Stores logged-in user details
  const [isRegistering, setIsRegistering] = useState(false);

  // 1. Requirement: Basic authentication flow (signup -> login -> view feed) [cite: 38]
  if (!user) {
    if (isRegistering) {
      return <Register onNavigate={() => setIsRegistering(false)} />;
    }
    return (
      <Login onLogin={setUser} onNavigate={() => setIsRegistering(true)} />
    );
  }

  // 2. Mock Fetching Posts (Replace with your Render Backend API URL)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // const response = await fetch("https://your-backend.onrender.com/api/posts");
        // const data = await response.json();
        // setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // 3. UI inspired by TaskPlanet [cite: 9, 36]
  return (
    <div style={styles.container}>
      {/* TaskPlanet Style Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <span style={styles.logo}>Social</span>
          <div style={styles.headerIcons}>
            <span style={styles.coin}>🪙 50</span>
            <span style={styles.wallet}>₹0.00</span>
            <span>🔔</span>
            <div style={styles.profileCircle}></div>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        {/* Create Post Section [cite: 14, 15] */}
        <CreatePost
          user={user}
          onPostCreated={(newPost) => setPosts([newPost, ...posts])}
        />

        {/* Public Feed Section [cite: 18, 19] */}
        <div style={styles.feed}>
          {posts.length === 0 ? (
            <div style={styles.emptyState}>
              <p>No posts yet. Be the first to share something!</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                currentUser={user.username}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#F0F2F5",
    minHeight: "100vh",
    width: "100%",
    margin: 0,
    padding: 0,
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "500px", 
    margin: "0 auto",
  },
  main: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px 10px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  headerIcons: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    fontSize: "14px",
  },
  coin: { color: "#FFA500", fontWeight: "bold" },
  wallet: { color: "#28a745", fontWeight: "bold" },
  profileCircle: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "#ddd",
  },
  emptyState: {
    textAlign: "center",
    marginTop: "50px",
    color: "#65676B",
  },
};
