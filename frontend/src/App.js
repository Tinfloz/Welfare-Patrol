import React, { lazy, Suspense, useState } from 'react';
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
import ProtectedRoute from './components/ResRoute';
// import CreateRequest from './pages/CreateRequest';
const Home = lazy(() => import('./pages/Home'));
const Splash = lazy(() => import('./pages/Splash'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Login = lazy(() => import('./pages/Login'));
const Profile = lazy(() => import('./pages/Profile'));
const CreateRequest = lazy(() => import('./pages/CreateRequest'));
const Messages = lazy(() => import('./pages/Messages')); const AcceptRequest = lazy(() => import("./pages/AcceptRequests"));
const Chat = lazy(() => import("./pages/Chat"));


function App() {

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Suspense fallback={<Fallback />}>
          <Router>
            <Routes>
              <Route path="/messages" element={<Messages />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              {/* <Route
                path="/home"
                element={
                  <ProtectedRoute token={token}>
                    <Home />
                  </ProtectedRoute>
                }
              /> */}
              <Route path="/home" element={<Home />} />
              <Route path="/create/request" element={<CreateRequest />} />
              <Route path="/accept/request"
                element={
                  <AcceptRequest />
                }
              />
              <Route path='/chat/:id' element={
                <Chat />
              } />
              <Route path="/" element={<Splash />} />
            </Routes>
          </Router>
        </Suspense>

      </Box>
    </ChakraProvider >
  );
}

export default App;
