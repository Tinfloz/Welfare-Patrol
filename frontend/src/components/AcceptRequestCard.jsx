import React from 'react'
import { Flex, HStack, Icon, Text } from '@chakra-ui/react'
import { FiUser } from "react-icons/fi"
import { BsArrowCounterclockwise } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { timeSince } from '../helpers/time.since';

const AcceptRequestCard = ({ posted, duration, welfareRequest, hidden }) => {

    return (
            <Flex
                justify="space-between"
                px="1vh"
                py="2vh"
                alignItems="center"
            >
                <HStack>
                    <Icon
                        as={posted ? (FiUser) : (duration ? (BsArrowCounterclockwise) : (HiOutlineLocationMarker))}
                    />
                    <Text fontSize={"sm"}>
                        {posted ? "POSTED BY" : (duration ? "DURATION" : "ADDRESS")}
                    </Text>
                </HStack>
                <Text fontSize={"sm"}>
                    {
                        posted ? welfareRequest?.welfareRequest?.postedBy?.name : (duration ? `${timeSince(welfareRequest?.welfareRequest?.createdAt.split("T")[0])}` : (hidden ? "Hidden" : welfareRequest?.welfareRequest?.address))
                    }
                </Text>
            </Flex>
    )
}

export default AcceptRequestCard