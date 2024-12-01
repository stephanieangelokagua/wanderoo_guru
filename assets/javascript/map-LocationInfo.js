
document.addEventListener('DOMContentLoaded', function () {

/*
* Leaflet map functionality to display a map with a marker at the selected location
* when the user selects a location from the dropdown menu
* and disable map interactions when the user is not interacting with the map
*/

    var map = L.map('map', {
        center: [51.509865, -0.118092], // Default to London
        zoom: 1,
        zoomControl: false, // Disable zoom control
        attributionControl: true, // Enable attribution control
        scrollWheelZoom: false, // Disable scroll wheel zoom
        dragging: false // Disable dragging
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Marker variable to hold the current marker on the map
    var marker;
    // Function to update the map with a new marker
    function updateMap(lat, lng) {
        // Enable map interactions
        map.scrollWheelZoom.enable();
        map.dragging.enable();

        // If a marker already exists, remove it from the map
        if (marker) {
            map.removeLayer(marker);
        }
        // Add a new marker at the specified latitude and longitude
        marker = L.marker([lat, lng]).addTo(map);
        // Center the map on the new marker with a zoom level of 4
        map.setView([lat, lng], 4);
    }

/*
* Dropdown menu functionality to update the map based on the selected location
* and display the corresponding destination information
* when the user selects a location from the dropdown menu
*/

    // Event listener for the dropdown menu
    document.getElementById('holiday-locations').addEventListener('change', function () {
        // Get the selected location from the dropdown menu
        var location = this.value;
        // Switch statement to update the map based on the selected location
        switch (location) {
            case 'london':
                updateMap(51.509865, -0.118092); // London coordinates
                break;
            case 'paris':
                updateMap(48.864716, 2.349014); // Paris coordinates
                break;
            case 'new-york':
                updateMap(40.7128, -74.0060); // New York coordinates
                break;
            case 'crete':
                updateMap(35.15585, 24.89502); // Crete coordinates
                break;
            case 'venice':
                updateMap(45.438759, 12.327145); // Venice coordinates
                break;
            case 'mallorca':
                updateMap(39.56939, 2.65024); // Mallorca coordinates
                break;
            case 'istanbul':
                updateMap(41.01384, 28.94966); // Istanbul coordinates
                break;
            case 'lisbon':
                updateMap(38.71667, -9.13333); // Lisbon coordinates
                break;
        }
    });

/*
* Modal functionality for displaying destination information when user
* clicks on "Learn More" button on a card
*/
    
    // Function to show the modal with image and text from the clicked card
    function showModal(imageSrc, title, text) {
       
        var modal = document.getElementById('destinationModal');
        modal.querySelector('img').src = imageSrc;
        modal.querySelector('h2').innerText = title;
        modal.querySelector('p').innerText = text;
        modal.style.display = 'block';
        displayCost();
    }

function displayCost() {
    var costElement = document.createElement('p');
    costElement.innerText = "Budget: £1000"; // Example cost
    costElement.style.fontWeight = 'bold';
    costElement.style.backgroundColor = 'var(--orange)';
    costElement.style.color = 'var(--green)';
    document.getElementById('destinationModal').appendChild(costElement); // Clear previous content


}

    // Add event listeners to buttons to show the modal
    document.querySelectorAll('.card .btn').forEach(function (button) {
        button.addEventListener('click', function () {
            var card = this.closest('.card');
            var imageSrc = card.querySelector('img').src;
            var title = card.querySelector('.card-title').innerText;
            var text = card.querySelector('.card-text').innerText;
            showModal(imageSrc, title, text);
        });
    });

/*
* Modal functionality for closing the modal when the close button is clicked
* or when the "Book Now" button is clicked
* and displaying an alert to confirm the booking
*/

    // Close modal when the close button is clicked
    document.getElementById('close-modal').addEventListener('click', function () {
        var modal = document.getElementById('destinationModal');
        modal.style.display = 'none';
    });

    // Close modal when the "Book Now" button is clicked
    document.getElementById('book-now').addEventListener('click', function () {
        alert('Booking confirmed!');
        var modal = document.getElementById('destinationModal');
        modal.style.display = 'none';
    });
});