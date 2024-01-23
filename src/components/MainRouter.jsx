import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Login } from '../pages/Login';
import { RestOfTheApp } from '../pages/RestOfTheApp';
import { BlogList } from '../pages/BlogList';
import { PostList } from '../pages/PostList';
import { PostCreate } from '../pages/PostCreate';
import { Navbar } from './Navbar';
import { BlogCreate } from '../pages/BlogCreate';

const router = createBrowserRouter([
  {
    element: <Navbar/>,
    children: [
      {
        path: '/',
        element: <RestOfTheApp />
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/blogs',
        element: <BlogList />
      },
      {
        path: '/posts/:blogId',
        element: <PostList />
      },
      {
        path: '/posts/:blogId/create',
        element: <PostCreate />
      },
      {
        path: "/blogs/create",
        element: <BlogCreate />
      }
    ]
  },
  
]);

export const MainRouter = () => {
  return <div><RouterProvider router={router}/> </div>;
};

export default MainRouter;
