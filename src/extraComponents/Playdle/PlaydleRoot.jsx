import { useState, useEffect } from "react";
import PlaydleMain from "./PlaydleMain";

const client_id = '912198de969b45cebd3ab7bb5bcb4052';

const getNewState = () => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for ( var i = 0; i < 32; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const PlayList = ({playlist, setSelectedPlaylist}) => {
    return <div className="playlist" onClick={() => setSelectedPlaylist(playlist)}>
        <img className="playlistIcon" alt={playlist.name} src={playlist.images[1].url}/>
        <div className="playlistInfo">
            <b className="playlistName">{playlist.name}</b>
            <span className="playlistTrackNo">Tracks: {playlist.tracks.total}</span>
        </div>
    </div>;
}

const PlaydleHeader = ({user, logout}) => {
    return <div className="playdleUser">
        <img className="playdleUserIcon" alt="user icon" src={user.images[0].url}/>
        <b>{user.display_name}</b>
        <div onClick={logout}>Log out</div>
    </div>
}

const PlaydleRoot = () => {
    const [spotifyAuthToken, setSpotifyAuthToken] = useState(localStorage.getItem("spotifyAuthToken"));
    // const [usePrivatePlaylists, setUsePrivatePlaylists] = useState(false);
    const [spotifyUser, setSpotifyUser] = useState(null);
    const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    const removeAuth = () => {
        localStorage.removeItem("spotifyAuthToken");
        setSpotifyAuthToken(null);
        setSpotifyUser(null);
        setSpotifyPlaylists([]);
        setSelectedPlaylist(-1);
    }

    const generateAuthToken = () => {
        const state = getNewState();
        localStorage.setItem("spotifyState", state);
        const redirect_url = window.location.origin + window.location.pathname + "r"; // redirect must be path + r
        let authUrl = 'https://accounts.spotify.com/authorize?response_type=token';
        authUrl += '&client_id=' + encodeURIComponent(client_id);
        authUrl += '&redirect_uri=' + encodeURIComponent(redirect_url);
        authUrl += '&state=' + encodeURIComponent(state);

        window.location = authUrl;
    }

    useEffect(() => {

        const controller = new AbortController();

        const requestParams = {
            method: "GET",
            headers: new Headers({
                "Authorization": "Bearer " + spotifyAuthToken,
                "Content-Type": "application/json"
            }),
            signal: controller.signal
        }

        const updatePlaylists = (next, timeout = 1000) => {
            if (next !== null) {
                fetch(next, requestParams)
                    .then((response) => {
                        if (response.status === 200) {
                            return response.json();
                        } else if (response.status !== 401 && response.status !== 403) {
                            setTimeout(() => updatePlaylists(next, Math.min(10000, timeout + 1000)), timeout)
                        throw new Error(`Too many requests, waiting ${timeout}s before retrying`);
                        } else {
                            removeAuth();
                            throw new Error(`request status ${response.status} is not OK`);
                        }
                    })
                    .then(data => {
                        if (data.previous === null) {
                            setSpotifyPlaylists(data.items);
                        } else {
                            setSpotifyPlaylists(old => [...old, ...data.items]);
                        }
                        updatePlaylists(data.next);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }

        const checkAuth = (timeout = 1000) => {
            fetch("https://api.spotify.com/v1/me", requestParams)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else if (response.status !== 401 && response.status !== 403) {
                        setTimeout(() => checkAuth(Math.min(10000, timeout + 1000)), timeout)
                        throw new Error(`Too many requests, waiting ${timeout}s before retrying`);
                    } else {
                        removeAuth();
                        throw new Error(`request status ${response.status} is not OK`);
                    }
                })
                .then(data => {
                    setSpotifyUser(data);
                    updatePlaylists("https://api.spotify.com/v1/me/playlists?limit=50");
                })
                .catch(err => {
                    console.log(err);
                });
        }

        if (spotifyAuthToken !== null) { // if token set then test it and get user data
            checkAuth();
        }

        return () => controller.abort();
    }, [spotifyAuthToken]);

    useEffect(() => {
        const head = document.head;
        const link = document.createElement("link");

        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = "/playdle.css";

        head.appendChild(link);

        return () => { head.removeChild(link); }
    }, []);

    if (spotifyAuthToken === null) { // get auth token page
        return <div>
            <button onClick={generateAuthToken}>Get new auth token</button>
        </div>
    } else if (spotifyUser === null) { // loading page
        return <div>Fetching user data</div>
    } else if (selectedPlaylist === null) {
        return <div>
            <PlaydleHeader user={spotifyUser} logout={removeAuth}/>
            <div className="playlistContainer">
                {spotifyPlaylists.map(p => <PlayList key={p.id} playlist={p} setSelectedPlaylist={setSelectedPlaylist}/>)}
            </div>
        </div>
    } else {
        return <div>
            <PlaydleHeader user={spotifyUser} logout={removeAuth}/>
            <div className="playdleBackButton" onClick={() => setSelectedPlaylist(null)}>
                <i className="arrow left"/>
                <span style={{paddingLeft: "10px"}}>Select different playlist</span>
            </div>
            <br />
            <PlaydleMain playlist={selectedPlaylist} authToken={spotifyAuthToken} removeAuth={removeAuth} />
        </div>
    }
}

export default PlaydleRoot;