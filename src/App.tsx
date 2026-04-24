import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { HomePage } from './pages/HomePage'
import { TopicPage } from './pages/TopicPage'
import { ReadPage } from './pages/ReadPage'
import { QuizPage } from './pages/QuizPage'
import { ResultPage } from './pages/ResultPage'
import { DashboardPage } from './pages/DashboardPage'

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/topic/:topicId',
        element: <TopicPage />,
      },
      {
        path: '/topic/:topicId/read',
        element: <ReadPage />,
      },
      {
        path: '/topic/:topicId/quiz',
        element: <QuizPage />,
      },
      {
        path: '/topic/:topicId/result',
        element: <ResultPage />,
      },
      {
        path: '*',
        element: <HomePage />,
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
