import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import RegisterPage from '../pages/RegisterPage';
import CheckEmailPage from '../pages/CheckEmailPage';
import CheckPasswordPage from '../pages/CheckPasswordPage';
import Homepage from '../pages/Homepage';
import MessagePage from '../components/MessagePage';
import AuthLayouts from '../layout/layout';
import ForgotPassword from '../pages/Forgotpassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'register',
        element: (
          <AuthLayouts>
            <RegisterPage />
          </AuthLayouts>
        ),
      },

      {
        path: 'email',
        element: (
          <AuthLayouts>
            <CheckEmailPage />
          </AuthLayouts>
        ),
      },

      {
        path: 'password',
        element: (
          <AuthLayouts>
            <CheckPasswordPage />
          </AuthLayouts>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <AuthLayouts>
            <ForgotPassword />
          </AuthLayouts>
        ),
      },

      {
        path: '',
        element: <Homepage />,
        children: [
          {
            path: ':userId',
            element: <MessagePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
