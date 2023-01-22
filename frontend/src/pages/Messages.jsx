import React, {useEffect, useState} from 'react';
import {
  VStack,
  Flex,
  Text,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Icon,
  Box,
  Circle
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiCheckDouble } from 'react-icons/bi';
import { BsFillCircleFill } from 'react-icons/bs';
import fetchApi from "../components/FetchCustom";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Messages = () => {
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("welfarePatrol-user");
    const fn = () => {
      fetchApi("/api/chats", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.json())
      .then((json) => {
        if (json.chats){
          setChats(json.chats);
          setUserId(json.userId);
        } else {
          console.error("Failed!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    if (token){
      fn();
    } else {
      navigate("/login")
    }
  },[navigate])


  return (
    <>
      <Flex height="90vh"  justifyContent="center" mt="10vh" width={"100vw"}>
        <VStack spacing="2vh" align="left">
          <Text as="b" fontSize="3vh" align={"left"}>
            Messages
          </Text>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineSearch bg="white" />}
            />
            <Input type="text" placeholder="Search" />
          </InputGroup>
          <Divider orientation="horizontal" />
          {
            chats.map(({chat, lastMessage, messages}, id)=>{
              console.log(lastMessage);
              let date;
              if (lastMessage){
               date = new Date(lastMessage.createdAt);
              }
              return (
                <MessageBlock
                key={id}
                chatId={chat._id}
                name={chat.sender.name} 
                time={lastMessage ? `${date?.getHours()}:${date?.getMinutes()}` : ""} 
                lastMessage={lastMessage?.content} 
                sent={lastMessage?.sender === chat.receiver["_id"]}
                messages={messages}
                userId={userId}
                />
              )
            })
          }
        </VStack>
      </Flex>
      <Navbar/>
    </>
  );
};

const MessageBlock = ({chatId, name, time, lastMessage, sent, messages, userId}) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/chat/${chatId}`, {state: {messages, name, chatId, userId}});
  }
  return (         
  <VStack spacing={"1vh"} align={"left"} width="100%" onClick={onClick}>
   <Flex width="100%" justifyContent={"space-between"} marginTop={"0px"}>
    <Text as="b" fontSize="2vh">
      {name}
    </Text>
    <Text fontSize="2vh">
      {time}
    </Text>
  </Flex>
  <Flex width="100%" justifyContent="flex-start">
    {
      sent ? (
        <>
        <Icon
        as={BiCheckDouble}
        marginRight="1vh"
        />
        <Text fontSize="2vh" as={`${sent ? "": "b"}`} color="gray.600">{lastMessage}</Text>
        </>
      ):(<Flex justifyContent={"space-between"} alignItems="center" width={"100%"}>
        <Text fontSize="2vh" as={`${sent ? "": "b"}`} color="gray.600">{lastMessage ? lastMessage : "New Contact"}</Text>

          <Icon
          as={BsFillCircleFill}
          fill="red.200"
          bg="red.200"
          borderRadius="50%"
          fontSize={"1vh"}
          />
      </Flex>)
    }
  </Flex>
  <Divider orientation="horizontal" />
  </VStack>
  )
}

export default Messages;
