import React, { useState } from "react";

export default function CreatePost({ onPostCreated }) {
  const [text, setText] = useState("");

  const handlePost = () => {
    // This is where you call your backend API
    const newPost = {
      _id: Date.now(),
      username: "You",
      text: text,
      likes: [],
      comments: [],
      createdAt: new Date(),
    };
    onPostCreated(newPost);
    setText("");
  };

  return (
    <div
      style={{
        background: "white",
        padding: "15px",
        borderRadius: "12px",
        marginBottom: "20px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h4 style={{ margin: "0 0 10px 0" }}>Create Post</h4>
      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          fontSize: "16px",
          resize: "none",
        }}
      />
      <hr style={{ border: "0.5px solid #eee" }} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handlePost}
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "8px 20px",
            borderRadius: "20px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
}
