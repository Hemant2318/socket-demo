import { useEffect, useState } from "react";
import { socket } from "../../socket";

const Socket = () => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const handleRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const handleSendMessage = () => {
    //emit method occur when send_message method trigger
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    //on method use for read the message
    socket.on("recieve_message", (data) => {
      setMessageReceived(data?.message);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div>
      <div className="d-flex gap-2 mb-3">
        <input
          placeholder="Room Number..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={handleRoom}> Join Room</button>
      </div>

      <div className="d-flex gap-2 mb-3">
        <input
          placeholder="Message..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button onClick={handleSendMessage}> Send Message</button>
      </div>
      <h3> Message:</h3>
      {messageReceived}
    </div>
  );
};

export default Socket;
