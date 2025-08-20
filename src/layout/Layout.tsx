import Navbar from "../components/Navbar.tsx";
import {Outlet} from "react-router";

export default function Layout() {
    return (
        <>
            <Navbar />
            <main className="main">
                <Outlet />
            </main>
        </>
    )
}