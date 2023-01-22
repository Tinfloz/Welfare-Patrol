import React from 'react';
import { Flex, HStack, IconButton } from "@chakra-ui/react";
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
                    <>
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
                            >
                                <HStack spacing="10vh">
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
                                </HStack>
                            </Flex>
                        </Flex>
                    </>
                ): (
                    null
                ) 
            }
        </>
    )
}

export default Navbar