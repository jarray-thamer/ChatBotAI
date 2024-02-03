/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, IconButton, Typography } from "@mui/material";
import ChatItem from "../components/chat/ChatItem";
import { IoSend } from "react-icons/io5";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteAllChats,
  getAllChats,
  logoutUser,
  sendChatRequest,
} from "../helpers/api-communicator";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    console.log("before", chatMessages);

    const chatData = await sendChatRequest(content);
    console.log("chatData: ", chatData);

    setChatMessages([...chatData.chats]);
    console.log("after", chatMessages);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting chats", { id: "deleteChats" });
      await deleteAllChats();
      setChatMessages([]);
      toast.success("Chats successfully deleted", { id: "deleteChats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deleteChats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading chats", { id: "loadChats" });
      getAllChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadChats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed !", { id: "loadChats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100¨%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: { md: 1, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "black",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "95%",
            padding: "12px",
            borderRadius: 8,
            border: "black solid 1px",
            backgroundColor: "transparent",
            display: "flex",
            margin: "auto",
            marginTop: "20px",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: " transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "black",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ mx: 1, color: "black" }}>
            <IoSend />
          </IconButton>
        </div>
        <Button
          onClick={handleDeleteChats}
          sx={{
            width: "200px",
            my: "12px",
            color: "black",
            fontWeight: "700",
            borderRadius: 3,
            mx: "auto",
            bgcolor: "#ff3333",
            ":hover": { bgcolor: "#ff6666" },
          }}
        >
          Clear Conversation
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
