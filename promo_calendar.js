import artists from './artistes.js'; // Assuming artistes.js exports the artistes object
import promo from './promo.js';

let artistes = artists.Artist_1;

document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const artistList = document.getElementById("artistList");
    const monthDisplay = document.getElementById("monthDisplay");
    let currentMonth = 6; // July (0-based index)
    let currentYear = 2026;


    // Update calendar display
    function updateCalendar() {
        calendar.innerHTML = ""; // Clear previous calendar
        monthDisplay.textContent = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        for (let day = 1; day <= 10; day++) {
            const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const formattedDate = date.split("-").reverse().join("/"); // Convert to DD/MM/YYYY
            const button = document.createElement("button");
            button.textContent = day;
            button.dataset.date = date;
            button.classList.add("calendar-day");
            button.addEventListener("click", () => displayArtists(formattedDate));
            if (promo.Artist_1.promo1.reservations[formattedDate]){
                button.style.backgroundColor = "green"; // Highlight dates with bookings
            }
            calendar.appendChild(button);
        }
    }

    // Display artists not available on the selected date
    function displayArtists(date) {
        artistList.innerHTML = ""; // Clear previous list
        const formattedDate = date
        console.log(promo)
        if (promo.Artist_1.promo1.reservations[formattedDate]) {
            const booking = promo.Artist_1.promo1.reservations[formattedDate];
            console.log('location : ',booking.location);
            console.log('client : ',booking.client)
            const button = document.createElement("button");
            button.textContent = `${booking.client} -- ${booking.location}`;
            button.classList.add("artist-button");
            // button.style.backgroundColor = "green";
            artistList.appendChild(button);
        };
    }

    // Initialize calendar
    updateCalendar();
});
