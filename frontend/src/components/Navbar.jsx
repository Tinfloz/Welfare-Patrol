import React from 'react';
import { Box, Flex, HStack, IconButton } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { IoIosText } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const path = window.location.pathname

    return (
        <>
            {
                path === "/home" || path === "/messages" || path === "/profile" ?  (
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
                                    />
                                    <IconButton
                                        icon={<IoIosText size="4vh" style={{ fill: "white" }} />}
                                        style={{ background: "#F8D9D2" }}
                                    />
                                    <IconButton
                                        icon={<RiAccountCircleFill size="4vh" style={{ fill: "white" }} />}
                                        style={{ background: "#F8D9D2" }}
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Box>
                ): (
                    null
                ) 
            }
        </>
    )
}

export default Navbar