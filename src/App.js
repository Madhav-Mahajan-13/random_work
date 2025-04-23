import Dashboard from "./pages/Dashboard/Dashboard";
import Message from "./pages/Message/Message";
// import Orders from "./pages/Orders/Orders";
import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ShopifyBuyButton from "./pages/Orders/Orders";
import ShopifyProductWithSubscription from "./pages/Orders/shopify";
import ShopifySubscriptionProduct from "./pages/Orders/ShopifySubscriptionProduct";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/message',
    element: <Message />
  },
  // {
  //   path: '/',
  //   element: <ShopifyBuyButton/>
  // },
  // {
  //   path: '/shopify',
  //   element: <ShopifyProductWithSubscription/>
  // },
  // {
  //   path: '/products',
  //   element: <ShopifySubscriptionProduct/>
  // }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
