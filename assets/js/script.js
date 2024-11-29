document.addEventListener('DOMContentLoaded', function () {
    var map = L.map('map', {
        center: [51.509865, -0.118092], // Default to London
        zoom: 2, // Initial zoom level
        zoomControl: false, // Disable zoom control
        attributionControl: true // Enable attribution control
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Marker variable to hold the current marker on the map
    var marker;
    // Function to update the map with a new marker
    function updateMap(lat, lng) {
        // If a marker already exists, remove it from the map
        if (marker) {
            map.removeLayer(marker);
        }
        // Add a new marker at the specified latitude and longitude
        marker = L.marker([lat, lng]).addTo(map);
        // Center the map on the new marker with a zoom level of 10
        map.setView([lat, lng], 10);
    }

    // Event listener for the dropdown menu
    document.getElementById('holiday-locations').addEventListener('change', function() {
        // Get the selected location from the dropdown menu
        var location = this.value;
        // Switch statement to update the map based on the selected location
        switch(location) {
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
});