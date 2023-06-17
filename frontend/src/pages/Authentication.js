import { Outlet, Navigate } from "react-router-dom"

function Authentication({ loggedIn }) {
    return loggedIn ? <Outlet/> : <Navigate to = "/" />;
}

export default Authentication