const tracksContainer = document.querySelector("#tracksContainer");
const statsContainer = document.querySelector("#statsContainer");

async function fetchData() {
    const data = await fetch("https://kitek-pg.ru/json/spotify");
    const json = await data.json();
    renderStats(json.items);
    renderTracks(json.items);
}

function formatData(ms) {
    const sec = Math.floor(ms / 1000);
    const min = Math.floor(sec / 60);
    const rest = sec % 60;
    return `${min}:${rest < 10 ? "0" : ""}${rest}`;
}

function formatTotal(ms) {
    const sec = Math.floor(ms / 1000);
    const hours = Math.floor(sec / 3600);
    const min = Math.floor((sec % 3600) / 60);
    return `${hours} ч ${min} мин`;
}

function renderTracks(items) {
    const html = items
        .map((item, index) => `
        <li class="track-item">
        <div class="track-number">${index + 1}</div>
        <div class="track-main">
            <img
                src="${item.album.images[0].url}"
                alt="${item.name}"
                class="album-art"
                loading="lazy"
            />
            <div class="track-info">
                <div class="track-name">${item.name}</div>
                <div class="track-artist">${item.artists.map((a) => a.name).join(", ")}</div>
                <div class="track-album">${item.album.name}</div>
            </div>
        </div>
        <div class="track-meta">
            <div class="duration">${formatData(item.duration_ms)}</div>
            <div class="popularity">♪ ${item.popularity}</div>
        </div>
    </li>
    `
        )
        .join("");

    tracksContainer.innerHTML = html;
}

function renderStats(items) {
    const totalMs = items.reduce((sum, item) => sum + item.duration_ms, 0);

    statsContainer.innerHTML = `
        <div class="total-tracks">Треков: ${items.length}</div>
        <div class="total-duration">Общая длительность: ${formatTotal(totalMs)}</div>
    `;
}

fetchData();
