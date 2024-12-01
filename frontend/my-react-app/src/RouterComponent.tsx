import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Payment from './payment/payment';
import Edit from './edit/edit';
import Review from './review/review';
import History from './review/pages/review_history/history';
import Home from './Home';

const RouterComponent: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />, // Home page
    },
    {
      path: '/payment',
      element: <Payment />, // Main Payment page
    },
    {
      path: '/review',
      element: <Review />, // Main Review page
    },
    {
      path: '/review/history',
      element: <History />, // Review History page
    },
    {
      path: '/edit',
      element: <Edit />, // Review History page
    },
    {
      path: '*',
      element: <h2>404 - Page Not Found</h2>, // Fallback for unmatched routes
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default RouterComponent;
