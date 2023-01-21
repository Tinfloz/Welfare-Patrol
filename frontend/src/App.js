import React, { lazy, Suspense } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Fallback from './pages/Fallback';
import Navbar from './components/Navbar';
// import CreateRequest from './pages/CreateRequest';
const Home = lazy(() => import('./pages/Home'));
const Splash = lazy(() => import('./pages/Splash'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Login = lazy(() => import('./pages/Login'));
const CreateRequest = lazy(() => import("./pages/CreateRequest"));
const AcceptRequest = lazy(() => import("./pages/AcceptRequests"));
const Chat = lazy(() => import("./pages/Chat"));


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Suspense fallback={<Fallback />}>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/create/request" element={<CreateRequest />} />
              <Route path="/accept/request" element={<AcceptRequest />} />
              <Route path="/" element={<Splash />} />
              <Route path='/chat' element={<Chat />} />
            </Routes>
            <Flex
              position="fixed"
              bottom="0"
              w="100%"
              justify={"center"}
              alignItems={"center"}
            >
              <Navbar />
            </Flex>
          </Router>
        </Suspense>
      </Box>
    </ChakraProvider>
  );
}

export default App;
