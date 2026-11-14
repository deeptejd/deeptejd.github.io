async function updateNowPlaying() {
    const el = document.getElementById("now-playing")
    if(!el) return;

    try {
        const res = await fetch("https://now-playing.deeptejdhauskar2003.workers.dev");
        const data = await res.json();
        const track = data?.recenttracks?.track?.[0];
        if (!track) return;

        const isNowPlaying = track["@attr"]?.nowplaying === "true";
        const art = track.image?.find(i => i.size === "extralarge")?.["#text"] || track.image?.find(i => i.size === "large")?.["#text"] || "";
        
        el.querySelector(".now-playing-art").style.backgroundImage = art ? `url(${art})` : "none";

        el.querySelector(".now-playing-label").textContent = isNowPlaying ? "now playing" : "last played";
        el.classList.toggle("is-playing", isNowPlaying); 

        el.querySelector(".now-playing-track").textContent = track.name;
        el.querySelector(".now-playing-track").href = track.url || "#";

        el.querySelector(".now-playing-artist").textContent = track.artist["#text"] || "";   
    } catch (error) {
        console.error("Last.fm error:", err);
    }
}

updateNowPlaying()
setTimeout(() => { updateNowPlaying() }, 30_000);