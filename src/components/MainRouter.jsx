import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Login } from '../pages/Login';
import { RestOfTheApp } from '../pages/RestOfTheApp';
import { SubscriberList } from '../pages/SubscriberList';
import { PostList } from '../pages/PostList';
import { PostCreate } from '../pages/PostCreate';
import { Navbar } from './Navbar';
import { BlogCreate } from '../pages/BlogCreate';
import { HomePage } from '../pages/HomePage';
import { Profile } from '../pages/Profile';
import { MyBlogs } from '../pages/MyBlogs';

const router = createBrowserRouter([
  {
    element: <Navbar/>,
    children: [
      {
        path: '/',
        element: <RestOfTheApp />
      },
      {
        path: '/home',
        element: <HomePage />
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/blogs',
        element: <SubscriberList />
      },
      {
        path: '/posts/:blogId', //sigle blog
        element: <PostList />
      },
      {
        path: '/posts/:blogId/create', //create post
        element: <PostCreate />
      },
      {
        path: "/my-blogs/create",
        element: <BlogCreate />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/my-blogs",
        element: <MyBlogs />
      }
    ]
  },
  
]);

export const MainRouter = () => {
  return <div><RouterProvider router={router}/> </div>;
};

export default MainRouter;
