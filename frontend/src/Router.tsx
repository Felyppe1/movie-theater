import { Route, Routes } from "react-router-dom";
import { Admin } from "./pages/Admin";
import { Home } from "./pages/Home";
import { AdminLayout } from "./layouts/AdminLayout";
import { WebLayout } from "./layouts/WebLayout";
import { Login } from "./pages/Login";
import { AdminMovieTheaterList } from "./pages/AdminMovieTheaterList";
import { AdminMovieTheaterDetail } from "./pages/AdminMovieTheaterDetail";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<WebLayout />} >
                <Route index element={<Home />} />
            </Route>

            <Route path="user/">
                <Route path="login/" element={<Login />} />
            </Route>

            <Route path="admin/" element={<AdminLayout />} >
                <Route index element={<Admin />} />
                <Route path='movie-theater/' element={<AdminMovieTheaterList />} />
                <Route path='movie-theater/:id' element={<AdminMovieTheaterDetail />} />
            </Route>
        </Routes>
    )
}