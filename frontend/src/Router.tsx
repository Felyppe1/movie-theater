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
import { Upcoming } from "./pages/Upcoming";
import { MovieTheaters } from "./pages/MovieTheaters";
import { AdminConfigurations } from "./pages/AdminConfigurations";
import { LoadingDisplay } from "./components/ui/LoadingDisplay";
import { useAppDependencies } from "./hooks/useAppDependencies";
import { PageInProgress } from "./pages/PageInProgress";

export function Router() {
  const { isLoading } = useAppDependencies()

  if (isLoading) return <LoadingDisplay />

  return (
    <Routes>
      <Route path="/" element={<WebLayout />} >
        <Route index element={<Home />} />
        <Route path="em-cartaz/" element={<PlayingNow />} />
        <Route path="em-breve/" element={<Upcoming />} />
        <Route path="cinemas/" element={<MovieTheaters />} />
        <Route path="sessoes/" element={<PageInProgress />} />
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
        <Route element={<RequireAuth allowedRoles={['ADMIN']} forceProtection />}>
          <Route path='configuracoes/' element={<AdminConfigurations />} />
        </Route>
      </Route>
    </Routes>
  )
}