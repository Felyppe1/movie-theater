import { Outlet } from "react-router-dom"

export function WebLayout() {
    return (
        <>
            <header>Web</header>
            <main>
                <Outlet />
            </main>
        </>
    )
}