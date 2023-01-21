import React from 'react'
import { Flex, HStack, Icon, Text } from '@chakra-ui/react'
import { FiUser } from "react-icons/fi"
import { BsArrowCounterclockwise } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useLocation } from 'react-router-dom';

const AcceptRequestCard = ({ posted, duration }) => {

    const { state } = useLocation();

    function timeSince(timeStamp) {

        timeStamp = new Date(timeStamp)
        const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

        var now = new Date(),
            secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
        if (secondsPast < 60) {
            return secondsPast + 's';
        }
        if (secondsPast < 3600) {
            return rtf.format(-1 * parseInt(secondsPast / 60), 'minute');
        }
        if (secondsPast <= 86400) {
            return rtf.format(-1 * parseInt(secondsPast / 3600), 'hour');
        }
        if (secondsPast <= 2628000) {
            return rtf.format(-1 * parseInt(secondsPast / 86400), 'day');
        }
        if (secondsPast <= 31536000) {
            return rtf.format(-1 * parseInt(secondsPast / 2628000), 'month');
        }
        if (secondsPast > 31536000) {
            return rtf.format(-1 * parseInt(secondsPast / 31536000), 'year');
        }
    };

    return (
        <>
            <Flex
                justify="space-between"
                p="2vh"
            >
                <HStack>
                    <Icon
                        as={posted ? (FiUser) : (duration ? (BsArrowCounterclockwise) : (HiOutlineLocationMarker))}
                    />
                    <Text>
                        {posted ? "POSTED BY" : (duration ? "DURATION" : "ADDRESS")}
                    </Text>
                </HStack>
                <Text>
                    {
                        posted ? "Dave H." : (duration ? "3 days ago" : "1874 Rue Dufresne")
                    }
                </Text>
            </Flex>
        </>
    )
}

export default AcceptRequestCard