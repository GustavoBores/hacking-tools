import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Auth from "./pages/auth"
import useAuth from "./hook/useAuth"

const queryClient: QueryClient = new QueryClient()

function App(): JSX.Element {
  const { isAuth } = useAuth()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        { isAuth() ? "" : <Auth /> }
      </QueryClientProvider>
    </>
  )
}

export default App
