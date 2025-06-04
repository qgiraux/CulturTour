import artists from './artistes.js'; // Assuming artistes.js exports the artistes object


let artistes = artists;
document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const artistList = document.getElementById("artistList");

    // Generate calendar for July 2026
    console.log("here be debug");
    for (let day = 1; day <= 31; day++) {
        const date = `2026-07-${String(day).padStart(2, "0")}`;
        const button = document.createElement("button");
        button.textContent = day;
        button.dataset.date = date;
        button.classList.add("calendar-day");
        button.addEventListener("click", () => displayArtists(date));
        calendar.appendChild(button);
    }

    // Display artists not available on the selected date
    function displayArtists(date) {
        artistList.innerHTML = ""; // Clear previous list
        const formattedDate = date.split("-").reverse().join("/"); // Convert to DD/MM/YYYY
        Object.values(artistes).forEach(artist => {
            if (!artist.tournées || !artist.tournées[formattedDate]) {
                const button = document.createElement("button");
                button.textContent = `${artist.name} (${artist.genre})`;
                button.classList.add("artist-button");
                button.addEventListener("click", () => {
                    window.location.href = `${artist.name.replace(/\s+/g, '_')}.html`;
                });
                artistList.appendChild(button);
            }
        });
    }
});
