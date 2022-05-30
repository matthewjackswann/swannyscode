import { useLocation } from "react-router";

const PlaydleRedirect = () => {
    const location = useLocation();

    const params = new URLSearchParams(location.hash.slice(1));
    if (params.get("token_type") === "Bearer" && params.get("state") === localStorage.getItem("spotifyState")) {
        localStorage.removeItem("spotifyState");
        const authToken = params.get("access_token");
        localStorage.setItem("spotifyAuthToken", authToken);
    }
    window.location = window.location.origin + window.location.pathname.slice(0, -1); // redirect must be playdle path + 'r'

    return <div>
        Redirecting to Playdle
    </div>
}

export default PlaydleRedirect;