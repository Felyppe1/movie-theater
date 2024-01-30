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

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<WebLayout />} >
                <Route index element={<Home />} />
                <Route path="em-cartaz/" element={<PlayingNow />} />
            </Route>

            <Route path="user/">
                <Route path="login/" element={<Login />} />
            </Route>

            <Route path="admin/" element={<AdminLayout />} >
                <Route index element={<Admin />} />
                <Route path='movie-theater/' element={<AdminMovieTheaterList />} />
                <Route path='movie-theater/:id/' element={<AdminMovieTheaterDetail />} />
                <Route path='movie-theater/add/' element={<AdminMovieTheaterAdd />} />
                <Route path='movie-theater/:id/room/add/' element={<AdminRoomAdd />} />
                <Route path='movie-theater/room/:id/' element={<AdminRoomDetail />} />
                <Route path='movie-selection/' element={<AdminMovieSelection />} />
            </Route>
        </Routes>
    )
}