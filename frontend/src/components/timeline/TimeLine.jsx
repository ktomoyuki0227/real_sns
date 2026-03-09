import React, { useContext, useEffect, useState } from 'react';
import './TimeLine.css';
import Share from '../share/Share';
import Post from '../post/Post';
// import { Posts } from '../../dummyData';
import API from '../../api';
import { AuthContext } from '../../state/AuthContext';

export default function Timeline({username}) {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = username 
          ? await API.get(`/api/posts/profile/${username}`)//プロフィールの場合
          : await API.get(`/api/posts/timeline/${user._id}`);//ホームの場合
        setPosts(
          response.data.sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
          })
        );
      } catch (err) {
        console.error("投稿の取得に失敗しました:", err);
      }
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}
