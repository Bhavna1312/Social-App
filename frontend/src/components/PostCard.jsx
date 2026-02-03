import React from "react";
import "./PostCard.css";

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      {/* Header: User Info */}
      <div className="post-header">
        <img
          src={post.userAvatar || "https://via.placeholder.com/40"}
          alt="avatar"
          className="avatar"
        />
        <div className="user-info">
          <span className="user-name">{post.username}</span>
          <span className="post-date">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
        <button className="follow-btn">Follow</button>
      </div>

      {/* Content: Text and Image */}
      <div className="post-content">
        <p>{post.text}</p>
        {post.image && (
          <img src={post.image} alt="post" className="post-image" />
        )}
      </div>

      {/* Footer: Likes and Comments */}
      <div className="post-actions">
        <div className="action-item">
          <span>❤️ {post.likes.length}</span>
        </div>
        <div className="action-item">
          <span>💬 {post.comments.length}</span>
        </div>
        <div className="action-item">
          <span>🔗 Share</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
