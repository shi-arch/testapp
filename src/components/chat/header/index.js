import { useEffect, useState } from "react";
import { Input } from "../../commonComponents/commonComponents.js";
import { useDispatch, useSelector } from "react-redux";
import { Notification, Search, Plus } from "../../svgComponents/index.js";
import { Loader, MultipleSelectChip } from '../../commonComponents/commonComponents.js'
import { recentUsers } from '../propsData';
import url4 from "../../../assets/images/recentUser1.svg";
import { postApi } from "../../../response/api.js";
import { setSearchUserData } from "../../../redux/features/chatSlice.js";
import { setAllUsers } from "../../../redux/features/loginSlice.js";
import { CreatePeerConnection, callToOtherUser, getLocalStream } from "../../../app/test/utils/webRTC/webRTCHandler.js";
const notification = true;

const Header = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [Loader, setLoader] = useState(false);
  const { token, allUsers, userDisconnected, allConnections } = useSelector(state => state.loginSlice)
  const { activeUserData } = useSelector(state => state.chatSlice)
  const { activeUsers } = useSelector(state => state.dashboardSlice)
  useEffect(() => {
    if (userDisconnected) {
      const findId = allConnections ? allConnections.find(o => {
        if (o.socketId === userDisconnected) {
          return o.id
        }
      }) : ""
      if (findId) {
        const arr = [...allUsers]
        arr.splice(findId.id, 1)
        dispatch(setAllUsers(arr))
      }
    }
  }, [userDisconnected])
  const searchUser = async () => {
    setLoader(true)
    let col = "email"
    if (isNaN()) {
      col = "Contact"
    }
    const result = await postApi('/search', { [col]: searchInput }, token)
    if (result) {
      dispatch(setSearchUserData(result.data))
    }
    setLoader(false)
  }
  const callUser = async (activeUser) => {
    callToOtherUser(activeUser);
    await getLocalStream()
    await CreatePeerConnection();
  }
  return (
    <div className="header-container">
      {/* {Loader ? <Loader /> : null} */}
      <div className="recent-user-con">
        {activeUsers.length ? activeUsers.map((eachUser) => (
          <div key={eachUser._id} onClick={() => callUser(eachUser)} className="recent-user">
            <img
              src={eachUser.profileImage ? eachUser.profileImage : url4}
              alt="recent-user-icon"
              className="user-icon"
            />
            {eachUser.isActive ? <span className="green-dot"></span> : <span className="red-dot"></span>}
            <span>{eachUser.username}</span>
          </div>
        )) : ""}
      </div>
      <div className="search-container">
        <Input
          type="search"
          css="search-input"
          onChange={setSearchInput}
          placeholder="Search user by email, contact or name"
          value={searchInput}
        />
        <div onClick={searchUser}><Search /></div>
      </div>
      <div className="new-chats-con">
        <p className="new-chat">New Chats</p>
        <Plus />
      </div>
      < MultipleSelectChip />
      <div className="notification-icon-con">
        <Notification />
        {notification ? <span className="red-dot"></span> : null}
      </div>
      <button type="button" onClick={() => {
        localStorage.setItem("userData", "")
        window.location.href = '/signup';
      }} class="reject">Logout</button>
    </div>
  );
};

export default Header;
