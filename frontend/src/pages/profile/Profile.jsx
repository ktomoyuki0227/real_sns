import React, { useEffect, useState } from 'react'
import Topbar from '../../components/Topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import TimeLine from '../../components/timeline/TimeLine';
import './Profile.css';
import API from '../../api';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get(`/api/users?username=${username}`);
        setUser(response.data);
      } catch (err) {
        console.error("ユーザーが見つかりません:", err);
      }
    };
    fetchUser();
  }, [username]);


  return (
    <>
      <Topbar />
      <div className="Profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={user.coverPicture ? PUBLIC_FOLDER + user.coverPicture : PUBLIC_FOLDER + "/post/3.jpeg"}
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  user.profilePicture
                    ? PUBLIC_FOLDER + user.profilePicture
                    : PUBLIC_FOLDER + "/person/noAvatar.png"
                }
                alt=""
                className='profileUserImg'
              />
            </div>
            <div className="profileInfo">
              <h4 className='profleInfoName'>{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <TimeLine username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}
