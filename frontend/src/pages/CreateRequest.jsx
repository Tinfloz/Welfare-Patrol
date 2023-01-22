import React, { useState, useCallback } from 'react';
import {
  Flex,
  VStack,
  Text,
  Box,
  Heading,
  Input,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import Autocomplete from 'react-google-autocomplete';
import fetchApi from '../components/FetchCustom';
import { useNavigate } from 'react-router-dom';

const CreateRequest = () => {
  const token = localStorage.getItem('welfarePatrol-user');
  console.log(token);
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const postWelfareRequest = async () => {
    const address = localStorage.getItem('address');
    const coordA = localStorage.getItem('lat');
    const coordB = localStorage.getItem('lng');
    try {
      fetchApi(`/api/welfare`, {
        method: 'post',
        body: JSON.stringify({
          address: address,
          coordinateA: coordA,
          coordinateB: coordB,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(json => {
          if (json.message === 'Success') {
            // Change Marker
          } else {
            console.error('Failed!');
          }
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  return (
    <>
      {!isLoaded ? (
        <>
          <Flex justify="center" alignItems="Center" p="20vh">
            <Spinner
              speed="0.65s"
              thickness="4px"
              color="blue.500"
              emptyColor="gray.300"
              size="xl"
            />
          </Flex>
        </>
      ) : (
        <>
          {/* <VStack spacing="-10vh"> */}
          <Box h="60vh" w="100%" position="relative" zIndex="-10">
            <GoogleMap
              center={{ lat: 45.5307609, lng: -73.5526934 }}
              zoom={15}
              mapContainerStyle={{ width: '100%', height: '60vh' }}
              options={{
                mapTypeControl: false,
                zoomControl: false,
                streetViewControl: false,
                fullscreenControl: false,
              }}
            >
              <Marker position={{ lat: 45.5307609, lng: -73.5526934 }} />
            </GoogleMap>
          </Box>
          <Box
            h="39vh"
            borderTop="gray.300"
            borderTopWidth="1px"
            borderTopColor="gray.300"
            borderTopRadius="10vh"
            w="100%"
            justify="center"
            alignItems="center"
            zIndex="1"
          >
            <VStack p="3vh" spacing="5vh">
              <Flex justify="center" alignItems="center">
                <Heading size="md">Montreal , QC</Heading>
              </Flex>
              <Autocomplete
                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                style={{ width: '50vh' }}
                onPlaceSelected={place => {
                  console.log(place);
                  setLocation(place);
                  localStorage.setItem('address', place.formatted_address);
                  localStorage.setItem('lat', place.geometry.location.lat());
                  localStorage.setItem('lng', place.geometry.location.lng());
                }}
                options={{
                  types: ['(regions)'],
                  componentRestrictions: { country: 'ca' },
                }}
                defaultValue="Hall Building"
              />
              ;
              <Button
                w="50vh"
                borderRadius="2vh"
                borderWidth="1px"
                borderColor="gray.300"
                style={{ background: '#F8D9D2' }}
                onClick={postWelfareRequest}
                color="white"
              >
                CREATE REQUEST
              </Button>
            </VStack>
          </Box>
          {/* </VStack> */}
        </>
      )}
    </>
  );
};

export default CreateRequest;
