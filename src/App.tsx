import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { WizardPage } from './pages/WizardPage';
import { ResultPage } from './pages/ResultPage';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'wizard', element: <WizardPage /> },
      { path: 'result', element: <ResultPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
