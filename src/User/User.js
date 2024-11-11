import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_USER_POSTS } from '../GetUser'; 
import "./user.css";

const User = () => {
    const [userId, setUserId] = useState(1);
    const [showPosts, setShowPosts] = useState(false); 
    
    const { loading,  data } = useQuery(GET_USER, {
        variables: { id: userId }
    });

    const { data: postsData, loading: postsLoading, error: postsError } = useQuery(GET_USER_POSTS, {
        variables: { userId },
        skip: !userId 
    });

    const handleInputChange = (e) => {
        const value = e.target.value;
        setUserId(value ? parseInt(value) : "");
        setShowPosts(false); 
    };

    const handleShowPosts = () => setShowPosts(true); 
    return (
        <div className="user-container">
            <h2>User Information</h2>
            <div className="input-container">
                <label>
                    User ID:
                    <input
                        type="number"
                        value={userId}
                        onChange={handleInputChange}
                        min="1"
                    />
                </label>
            </div>

        
            {!userId && <p className="error">Add an ID</p>}


            {loading && userId ? (
                <p>Loading...</p>
            ) : data && !data.user?.id && userId ? (
                <p>User not found. Check id</p>
            ) : data && data.user ? (
                <div>
                    <p><strong>ID:</strong> {data.user.id}</p>
                    <p><strong>Name:</strong> {data.user.name}</p>
                    <p><strong>Username:</strong> {data.user.username}</p>
                    <p><strong>Email:</strong> {data.user.email}</p>
                </div>
            ) : (
                <p>No user data available</p>
            )}

            <button className="see-posts-btn" onClick={handleShowPosts}  disabled={!userId || postsLoading}>
                {postsLoading ? "Loading posts..." : "See Posts"}
            </button>

            {showPosts && (
                <div className="posts-container">
                    <h3>User Posts</h3>
                    {postsError ? (
                        <p>Error loading posts: {postsError.message}</p>
                    ) : postsData && postsData.user?.posts.data.length > 0 ? (
                        postsData.user.posts.data.map((post) => (
                            <div key={post.id} className="post">
                                <h4>{post.title}</h4>
                                <p>{post.body}</p>
                            </div>
                        ))
                    ) : (
                        <p>No posts available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default User;
