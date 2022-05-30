import { useState, useEffect } from "react";
// import gestaltSimilarity from "gestalt-pattern-matcher";

const MAX_TURNS = 6;

const getSongNameArtist = (s) => {
    const artists = s.track.artists.map(a => a.name).join(' ');
    return `${s.track.name} - ${artists}`;
}

const findCommon = (str1 = '', str2 = '') => {
    const s1 = [...str1];
    const s2 = [...str2];
    const arr = Array(s2.length + 1).fill(null).map(() => {
       return Array(s1.length + 1).fill(null);
    });
    for (let j = 0; j <= s1.length; j += 1) {
       arr[0][j] = 0;
    }
    for (let i = 0; i <= s2.length; i += 1) {
       arr[i][0] = 0;
    }
    let len = 0;
    let col = 0;
    let row = 0;
    for (let i = 1; i <= s2.length; i += 1) {
       for (let j = 1; j <= s1.length; j += 1) {
          if (s1[j - 1] === s2[i - 1]) {
             arr[i][j] = arr[i - 1][j - 1] + 1;
          }
          else {
             arr[i][j] = 0;
          }
          if (arr[i][j] > len) {
             len = arr[i][j];
             col = j;
             row = i;
          }
       }
    }
    if (len === 0) {
       return "";
    }
    let res = "";
    while (arr[row][col] > 0) {
       res = s1[col - 1] + res;
       row -= 1;
       col -= 1;
    }
    return res;
};

const PercentageBar = ({percent}) => {
    const prettyPercent = Math.round(percent * 100) + "%";
    return <div>
            <div className="loadingBarContainer">
                <div className="loadingBar" style={{width: prettyPercent}}>
                    {prettyPercent}
                </div>
            </div>
        </div>
}

const SongPlayer = ({audio, maxTime, volume, setVolume}) => {
    let audioTimeout = null;
    audio.volume = volume;

    const updateVolume = e => {
        setVolume(e.target.value / 100);
        audio.volume = e.target.value / 100;
    }

    const handleTogglePlay = () => {
        if (audio.paused) { // play music
            audio.currentTime = 0;
            audio.play();
            audioTimeout = setTimeout(() => {
                audio.pause();
            }, maxTime);
        } else { // pause music
            clearTimeout(audioTimeout);
            audio.pause();
        }
    }

    return <div>
        <button onClick={handleTogglePlay}>Play music</button><br />
        <label htmlFor="volume">Volume: </label>
        <input onChange={updateVolume} type="range" id="volume" name="volume" min="0" max="100" value={volume * 100}/>
    </div>
}

const getNClosestSongs = (songList, searchInput, k) => {
    const songs = [...songList];
    const result = new Array(5);
    for (let i = 0; i < k; i++) { // loops each time extracting the best matching song. Loops O(kn) times < O(n*logn) from sorting
        const scores = songs.map(s => findCommon(searchInput.toLowerCase(), getSongNameArtist(s)).length);
        const max = Math.max(...scores);
        const index = scores.indexOf(max);
        result[i] = songs[index];
        songs.splice(index, 1);
    }
    return result;
}

const getSongTime = (guesses) => {
    let a = 0;
    let b = 1;
    for (let i = 0; i < (MAX_TURNS - guesses + 2); i++) {
        a = a + b;
        [a, b] = [b, a];
    }
    return a;
}

const PlaydleMain = ({playlist, authToken, removeAuth}) => {
    const [songs, setSongs] = useState([]);
    const [songsFetched, setSongsFetched] = useState(false);
    const [targetSong, setTargetSong] = useState(null);
    const [unusedSongs, setUnusedSongs] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [guessesLeft, setGuessesLeft] = useState(MAX_TURNS);
    const [volume, setVolume] = useState(0.5);
    const [audio, setAudio] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        
        const controller = new AbortController();

        const requestParams = {
            method: "GET",
            headers: new Headers({
                "Authorization": "Bearer " + authToken,
                "Content-Type": "application/json"
            }),
            signal: controller.signal
        }

        const fetchSongs = (url, timeout = 1000) => {
            fetch(url, requestParams)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status !== 401 && response.status !== 403) {
                    setTimeout(() => fetchSongs(Math.min(10000, timeout + 1000)), timeout)
                    throw new Error(`Too many requests, waiting ${timeout}s before retrying`);
                } else {
                    removeAuth();
                    throw new Error(`request status ${response.status} is not OK`);
                }
            })
            .then(data => {
                if (data.previous === null) {
                    setSongs(data.items);
                } else {
                    setSongs(old => [...old, ...data.items]);
                }
                if (data.next === null) {
                    setSongsFetched(true);
                    return;
                }
                fetchSongs(data.next);
            })
            .catch(err => {
                console.log(err);
            });
        }

        fetchSongs(playlist.tracks.href);

        return () => controller.abort();

    }, [authToken, playlist, removeAuth]);

    useEffect(() => {
        setAudio(new Audio(targetSong?.track?.preview_url));
    }, [targetSong]);

    const generateNewTargetSong = () => {
        const newUnusedSongs = (unusedSongs.length === 0) ? [...songs] : [...unusedSongs];
        const newTarget = newUnusedSongs.splice(Math.floor(Math.random()*newUnusedSongs.length), 1)[0];
        setUnusedSongs(newUnusedSongs);
        setTargetSong(newTarget);
        setGuessesLeft(MAX_TURNS);
        setSuccess(false);
    }

    useEffect(() => {
        generateNewTargetSong();
        // eslint-disable-next-line
    }, [songsFetched]);

    if (!songsFetched) {
        return <PercentageBar percent={songs.length / playlist.tracks.total}/>
    }
    if (success) {
        return <div>
            <h2>Success</h2>
            <div>{`The target song was: ${targetSong.track.name} - ${targetSong.track.artists.map(a => a.name).join(' ')}`}</div>
            <div>{`guessed in ${MAX_TURNS - guessesLeft + 1} turns`}</div>
            <button onClick={generateNewTargetSong}>New Song</button>
        </div>
    }
    if (guessesLeft === 0) {
        return <div>
            <h2>Fail</h2>
            <div>{`The target song was: ${targetSong.track.name} - ${targetSong.track.artists.map(a => a.name).join(' ')}`}</div>
            <button onClick={generateNewTargetSong}>New Song</button>
        </div>
    }
    return <div>
            <SongPlayer audio={audio} maxTime={1000 * getSongTime(guessesLeft)} volume={volume} setVolume={setVolume} />
            <div>{`Guesses left: ${guessesLeft}`}</div><br />
            <div>Guess:</div>
            <input type="text" value={searchInput} onChange={e => setSearchInput(e.target.value)}/><br />
            <div>{getNClosestSongs(songs, searchInput, 5).map(s => {
                return <div key={getSongNameArtist(s)} className="playdleGuess" onClick={() => {
                    if (s === targetSong) {
                        setSuccess(true);
                    } else {
                        setGuessesLeft(old => old - 1);
                    }
                }}>{getSongNameArtist(s)}</div>
            })}</div>
        </div>
}

export default PlaydleMain;