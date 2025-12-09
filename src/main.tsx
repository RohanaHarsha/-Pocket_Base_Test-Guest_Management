import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App.tsx';
import GuestList from './pages/GuestList.tsx';
import GuestRegistration from "./pages/GuestRegistration"
import {Home} from './pages/Home.tsx';
import GuestEdit from './pages/GuestEdit.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="GuestRegistration" element={<GuestRegistration />} />
      <Route path="GuestList" element={<GuestList />} />
      <Route path="guests/:id" element={<GuestEdit />} />
    </Route>
  )
);

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
} else {
  console.error("Root element not found. Make sure there is an element with id 'root' in your HTML.");
}