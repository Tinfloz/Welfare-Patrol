import React, { useState } from 'react';
import { Box, Flex, HStack, IconButton } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { IoIosText } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <Flex
        position="fixed"
        bottom="0"
        w="100%"
        justify={"center"}
        alignItems={"center"}
        zIndex="2"
      >
            <Box>
                <Flex
                    justify="center"
                    alignItems="center"
                    h="12vh"
            
                >
                    <Flex
                        style={{ background: "#F8D9D2" }}
                        borderRadius="15vw"
                        justify="center"
                        alignItems="center"
                        borderWidth="1px"
                        borderColor="gray.300"
                        w="97vw"
                        h="10vh"
                        zIndex="2"
                        position={"absolute"}
                    >
                        <Flex justifyContent={"space-evenly"} w="100%">
                            <IconButton
                                icon={<AiFillHome size="4vh" style={{ fill: "white" }} />}
                                style={{ background: "#F8D9D2" }}
                                onClick={()=>navigate("/home")}
                            />
                            <IconButton
                                icon={<IoIosText size="4vh" style={{ fill: "white" }} />}
                                style={{ background: "#F8D9D2" }}
                                onClick={()=>navigate("/messages")}

                            />
                            <IconButton
                                icon={<RiAccountCircleFill size="4vh" style={{ fill: "white" }} />}
                                style={{ background: "#F8D9D2" }}
                                onClick={()=>navigate("/profile")}

                            />
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
            </Flex>
    )
}

export default Navbar