import React from 'react';
import { Flex, HStack, IconButton } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { IoIosText } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";

const Navbar = () => {
    return (
        <>
            <Flex
                justify="center"
                alignItems="center"
                h="15vh"
            >
                <Flex
                    style={{ background: "#F8D9D2" }}
                    borderRadius="1.5vh"
                    justify="center"
                    alignItems="center"
                    borderWidth="1px"
                    borderColor="gray.300"
                    w="90vh"
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
    )
}

export default Navbar