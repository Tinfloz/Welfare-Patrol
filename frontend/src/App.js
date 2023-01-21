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
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Fallback from './pages/Fallback';
const Home = lazy(() => import('./pages/Home'));
const Splash = lazy(() => import('./pages/Splash'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Login = lazy(() => import('./pages/Login'));

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Router>
          <Suspense fallback={<Fallback />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Splash />} />
            </Routes>
          </Suspense>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
