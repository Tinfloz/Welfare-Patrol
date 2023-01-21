import { Button } from '@chakra-ui/react'
import React from 'react'

const ButtonComponent = ({ register, handleClick }) => {
    return (
        <>
            <Button
                w="50vh"
                borderRadius="1vh"
                borderWidth="1px"
                borderColor="gray.300"
                style={{ background: "#F8D9D2" }}
                onClick={handleClick}
            >
                {
                    register ? "CREATE ACCOUNT" : "SIGN IN"
                }
            </Button>
        </>
    )
}

export default ButtonComponent