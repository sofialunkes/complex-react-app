import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import LoadingDotsIcon from "./LoadingDotsIcon";
import StateContext from "../StateContext";

function ProfileFollowing() {
  const appState = useContext(StateContext);
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchFollowers() {
      try {
        const response = await Axios.get(`/profile/${username}/following`, { cancelToken: ourRequest.token });
        setIsLoading(false);
        setFollowers(response.data);
      } catch (e) {
        console.log(e.response.data);
      }
    }
    fetchFollowers();
    return () => {
      ourRequest.cancel();
    };
  }, [username, followers]);

  if (isLoading) return <LoadingDotsIcon />;

  return (
    <div className="list-group">
      {followers.length > 0 &&
        followers.map((follower, index) => {
          return (
            <Link key={index} to={`/profile/${follower.username}`} className="list-group-item list-group-item-action">
              <img className="avatar-tiny" src={follower.avatar} />
              {follower.username}
            </Link>
          );
        })}
      {followers.length == 0 && appState.user.username == username && <p className="lead text-muted text-center">You aren&rsquo;t following anyone yet.</p>}
      {followers.length == 0 && appState.user.username != username && <p className="lead text-muted text-center">{username} isn&rsquo;t following anyone yet.</p>}
    </div>
  );
}

export default ProfileFollowing;
