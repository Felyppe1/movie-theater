import { Route, Routes } from "react-router-dom";
import { Admin } from "./pages/Admin";
import { Home } from "./pages/Home";
import { PlayingNow } from "./pages/PlayingNow";
import { AdminLayout } from "./layouts/AdminLayout";
import { WebLayout } from "./layouts/WebLayout";
import { Login } from "./pages/Login";
import { AdminMovieTheaterList } from "./pages/AdminMovieTheaterList";
import { AdminMovieTheaterDetail } from "./pages/AdminMovieTheaterDetail";
import { AdminMovieTheaterAdd } from "./pages/AdminMovieTheaterAdd";
import { AdminRoomDetail } from "./pages/AdminRoomDetail";
import { AdminRoomAdd } from "./pages/AdminRoomAdd";
import { AdminMovieSelection } from "./pages/AdminMovieSelection";
import { AuthenticationLayout } from "./layouts/AuthenticationLayout";
import { Signup } from "./pages/Signup";
import { RequireAuth } from "./components/RequireAuth";
import { useAuthStore } from "./store/auth";
import { useMutation } from "@tanstack/react-query";
import { LoadingDisplay } from "./components/ui/LoadingDisplay";
import { useEffect } from "react";
import { getRefreshToken } from "./api/users";
import { Upcoming } from "./pages/Upcoming";
import { MovieTheaters } from "./pages/MovieTheaters";

export function Router() {
  const refreshToken = useAuthStore(state => state.refreshToken)
  const clearAuthStore = useAuthStore(state => state.clearAuthStore)

  if (!refreshToken) {
    clearAuthStore()
  }

  const mutation = useMutation({
    mutationFn: getRefreshToken,
    onError: () => {
      clearAuthStore()
    },
    onSuccess: (response) => {
      useAuthStore.setState({ accessToken: response.new_token })
      useAuthStore.setState({ refreshToken: response.new_refresh_token })
      useAuthStore.setState({ user: response.user})
    }
  })

  useEffect(() => {
    return () => {
      if (refreshToken) mutation.mutate({ refresh_token: refreshToken })
    }
  }, [])

  if (mutation.status == 'pending') return <LoadingDisplay />
  
  return (
    <Routes>
      <Route path="/" element={<WebLayout />} >
        <Route index element={<Home />} />
        <Route path="em-cartaz/" element={<PlayingNow />} />
        <Route path="em-breve/" element={<Upcoming />} />
        <Route path="cinemas/" element={<MovieTheaters />} />
      </Route>

      <Route path="/" element={<AuthenticationLayout />}>
        <Route path="login/" element={<Login />} />
        <Route path="cadastrar/" element={<Signup />} />
      </Route>

      <Route path="admin/" element={<AdminLayout />} >
        <Route element={<RequireAuth allowedRoles={['THEATER_ADMIN', 'MOVIE_CURATOR', 'ADMIN']} />}>
          <Route index element={<Admin />} />
          <Route path='movie-theater/' element={<AdminMovieTheaterList />} />
          <Route path='movie-theater/:id/' element={<AdminMovieTheaterDetail />} />
          <Route path='movie-theater/add/' element={<AdminMovieTheaterAdd />} />
          <Route path='movie-theater/:id/room/add/' element={<AdminRoomAdd />} />
          <Route path='movie-theater/room/:id/' element={<AdminRoomDetail />} />
          <Route path='movie-selection/' element={<AdminMovieSelection />} />
        </Route>
      </Route>
    </Routes>
  )
}