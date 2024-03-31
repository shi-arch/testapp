import { Mute, Video, EndCall } from "../../svgComponents/index.js";
//import Peer from "simple-peer";
import Peer from 'peerjs';
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
//import dotenv from 'dotenv'
//dotenv.config()

let endpoint = 'http://localhost:8080'
const socket = io.connect('http://localhost:8080')

const CallInterface = () => {
  const selectedUserData = useSelector(state => state.chatSlice.selectedUserData);
  const [isTyping, setIsTyping] = useState(false);
  const [videoCall, setVideoCall] = useState(false);
  const [userSocketId, setUserSocketId] = useState("");
  const [userId, setUserId] = useState(0)
  const [mySocketId, setMySocketId] = useState(null)
  const [socketConnected, setSocketConnected] = useState(null)
  const [disconnect, setDisconnect] = useState(false)


  const [me, setMe] = useState("")
	const [stream, setStream] = useState()
	const [receivingCall, setReceivingCall] = useState(false)
	const [caller, setCaller] = useState("")
	const [callerSignal, setCallerSignal] = useState()
	const [callAccepted, setCallAccepted] = useState(false)
	const [idToCall, setIdToCall] = useState("")
	const [callEnded, setCallEnded] = useState(false)
	const [name, setName] = useState("")
	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef = useRef()

	useEffect(() => {
		socket.on("me", (id) => {
			setMe(id)
			console.log('socket id', id)
		})

		socket.on("callUser", (data) => {
			console.log('call user data', data)
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
			setReceivingCall(true)
		})

		socket.on("closeCall", () => {
			console.log('call ended')
			// setCallEnded(true)

			setCallAccepted(false)
			setReceivingCall(false)
			setCaller("")
			// reload window
			// window.location.reload();
		})
	}, [])

	useEffect(() => {
		if (receivingCall && !callAccepted) {
			answerCall();
		}
	}, [receivingCall, callAccepted]);





	const callUser = (id) => {
		navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
			setStream(stream)
      myVideo.current.srcObject = stream
			const peer = new Peer({
				initiator: true,
				trickle: false,
				stream: stream
			})
			peer.on("signal", (data) => {
				socket.emit("callUser", {
					userToCall: id,
					signalData: data,
					from: me,
					name: name
				})
			})
			peer.on("stream", (stream) => {
				userVideo.current.srcObject = stream
			})
			socket.on("callAccepted", (data) => {
				setCallAccepted(true)
				console.log('data from call accepted', data)
				setCaller(data.from)
				peer.signal(data.signal)
			})
			connectionRef.current = peer
		})
	}

	const answerCall = () => {

		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller, from: me })
		})

		peer.on("stream", (stream) => {
			try {
				userVideo.current.srcObject = stream
			} catch (error) {
				console.log(error)
			}

		})

		try {
			peer.signal(callerSignal)
			connectionRef.current = peer
		} catch (error) {
			console.log(error)
		}

	}

	const leaveCall = () => {
		console.log('')
		setCallEnded(false)
		setCaller(null)
		setCallAccepted(false)
		setReceivingCall(false)
		socket.emit("endCall", { to: caller })
		connectionRef.current.destroy()
		// window.location.reload();
	}



  return (
    <div className="call-container">
      <div className="images-con">
        {
          stream ? <video
            ref={myVideo}
            style={{ width: '100%', height: 'auto' }}
            autoPlay
            playsInline
            muted
          /> : <img
            src="https://res.cloudinary.com/dysnxt2oz/image/upload/v1710222111/Rectangle_28_1_gisnki.png"
            className="image"
            alt="person1"
          />
        }
        {
          callAccepted ? <video
            ref={userVideo}
            style={{ width: '100%', height: 'auto' }}
            autoPlay
            playsInline
            muted
          /> : <img
            src="https://res.cloudinary.com/dysnxt2oz/image/upload/v1710222352/Rectangle_29_zq40pr.png"
            className="image"
            alt="person2"
          />
        }

      </div>
      <div className="call-controllers">
        <div className="calls">
          <div>
            <Mute />
          </div>
          <div onClick={callAccepted && !callEnded ? leaveCall : () => callUser(idToCall)}>
            <Video />
          </div>
          <div onClick={() => setDisconnect(true)}>
            <EndCall />
          </div>

        </div>
      </div>
      {receivingCall && !callAccepted ?
        <div className="caller">
          <h4>{name} is calling...</h4><button type="button" onClick={answerCall} className="accept">Answer</button>          
        </div>
        : null}
    </div>
  )

};

export default CallInterface;
