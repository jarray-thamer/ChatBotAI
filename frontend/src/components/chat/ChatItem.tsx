/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  return role == "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        my: 2,
        gap: 2,
        borderRadius: 4,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="Chatbot-logo.png" alt="openai" width={"42px"} />
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography fontSize={"20px"} color={"black"}>
            {content}
          </Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <></>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, gap: 2 }}>
      <Avatar
        sx={{
          ml: "0",
          bgcolor: "grey",
          color: "white",
          fontWeight: 600,
        }}
      >
        {auth?.user?.name[0].toUpperCase()}
        {auth?.user?.name[1].toUpperCase()}
      </Avatar>
      <Box>
        <Typography fontSize={"20px"} color={"black"}>
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
