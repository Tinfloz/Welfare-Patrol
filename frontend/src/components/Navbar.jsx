import React from 'react';
import { Flex, HStack, IconButton } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

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
                            icon={<AiOutlineHome size="3vh" />}
                            style={{ background: "#F8D9D2" }}
                        />
                        <IconButton
                            icon={<BiMessageRounded size="3vh" />}
                            style={{ background: "#F8D9D2" }}
                        />
                        <IconButton
                            icon={<CgProfile size="3vh" />}
                            style={{ background: "#F8D9D2" }}
                        />
                    </HStack>
                </Flex>
            </Flex>
        </>
    )
}

export default Navbar