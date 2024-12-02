document.addEventListener('DOMContentLoaded', function () {
    const destinations = [{
        name: "Paris",
        budget: 1500,
        image: "assets/images/France-Paris-640-427.webp"
    },
    {
        name: "Crete",
        budget: 1000,
        image: "assets/images/Greece-Crete-640-427.webp"
    },
    {
        name: "Venice",
        budget: 2000,
        image: "assets/images/Italy-Venice-640-427.webp"
    },
    {
        name: "Lisbon",
        budget: 1000,
        image: "assets/images/Portugal- Lisbon-640-427.webp"
    },
    {
        name: "Mallorca",
        budget: 1000,
        image: "assets/images/Spain-Mallorca-640-427.webp"
    },
    {
        name: "Istanbul",
        budget: 1000,
        image: "assets/images/Turkey-Istanbul-640-427.jpg"
    },
    {
        name: "London",
        budget: 1200,
        image: "assets/images/UK-London-640x427.webp"
    },
    {
        name: "New York",
        budget: 1800,
        image: "assets/images/USA-NewYork-640x427.webp"
    }
    ];

// range value live update function
window.updateInputFromRange = function(rangeId, inputId) {
    var range = document.getElementById(rangeId);
    var input = document.getElementById(inputId);
    input.value = range.value;
}

window.updateRangeFromInput = function (rangeId, inputId) {
    var range = document.getElementById(rangeId);
    var input = document.getElementById(inputId);
    range.value = input.value;
}

//budget calculation function
window.calculateBudget = function () {
    let duration = parseInt(document.getElementById("duration").value);
    let numPeople = parseInt(document.getElementById("people").value);
    let costTransport = parseInt(document.getElementById("flights").value);
    let foodCostPd = parseInt(document.getElementById("range1Value").value);
    let transportCostPd = parseInt(document.getElementById("range2Value").value);
    let attractionCostPd = parseInt(document.getElementById("range3Value").value);
    if (isNaN(duration) && isNaN(numPeople) && isNaN(costTransport)) {
        document.getElementById("budgetResult").innerText = "Your trip needs at least a one day duration, at least one person and a valid transport cost (if free input 0)";
    } else if (isNaN(duration) || isNaN(numPeople)) {
        document.getElementById("budgetResult").innerText = "Your trip needs at least a one day duration and atleast one person";
    } else if (isNaN(costTransport)) {
        document.getElementById("budgetResult").innerText = "Your trip needs a valid transport cost, if free input 0";
    } else if (duration === 0 || numPeople === 0) {
        document.getElementById("budgetResult").innerText = "Your trip needs at least a one day duration and at least one person";
    } else {
        let budget = (costTransport * numPeople) + ((duration * numPeople)) * ((foodCostPd + transportCostPd + attractionCostPd));
        document.getElementById("budgetResult").innerHTML = `Your Budget: £${budget}`;
    }
}

    // dynamically update budgetslider label based on user input
    const budgetSlider = document.getElementById("customRange2") // get the range
    const budgetLabel = document.getElementById("budgetValue") // get label
    budgetLabel.textContent = `£${budgetSlider.value}` // set default label value
    budgetSlider.addEventListener('input', () => {
        budgetLabel.textContent = `£${budgetSlider.value}` // update based on user input
    });

    const destinationButton = document.getElementById("findButton")
    destinationButton.addEventListener('click', () => {
        possibleDestinations()
    })

    const cardContainer = document.getElementById("cardContainer")

    function possibleDestinations() {
        cardContainer.innerHTML = ``
        const userBudget = parseInt(budgetSlider.value) // get budget entered by user
        const heading_div = document.createElement("div")
        const heading_for_card_section = document.createElement("h2")
        heading_for_card_section.className = "mt-"
        heading_for_card_section.textContent = "Top Destinations for your budget!"
        heading_div.appendChild(heading_for_card_section)
        cardContainer.appendChild(heading_div)
        filterDestinationsByBudget = destinations.filter((destination) => destination.budget <= userBudget) //filter destinations by budget
        if (filterDestinationsByBudget.length === 0) {
            cardContainer.innerHTML = '<p style="color: red; text-align: center; font-size: 1.5em;">No destinations available for your budget!</p>'
            return;
        }
        filterDestinationsByBudget.forEach((destination) => {
            heading_for_card_section.className = "col-12"
            const column_card = document.createElement("div")
            column_card.className = "col-lg-4"
            const card = document.createElement("div")
            card.className = "card"
            card.innerHTML = `<img src="${destination.image}" class="card-img-top" alt="...">
    <div class="card-body">
    <p class="card-text">${destination.name} </p>
    <p class="card-text">Perfect for a £${destination.budget} budget!</p>
    <button id="book-now" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Book Now</button>
    </div>`
            column_card.appendChild(card)
            cardContainer.appendChild(column_card)
        });
    }

    // Function to display modal with destination budgets
    function displayBudgetModal() {
        const modal = document.getElementById("budgetModal");
        const modalBody = document.getElementById("budgetModalBody");
        modalBody.innerHTML = ""; // Clear previous content
        destinations.forEach(destination => {
            const budgetInfo = document.createElement("p");
            budgetInfo.textContent = `${destination.name}: £${destination.budget}`;
            modalBody.appendChild(budgetInfo);
        });
        modal.style.display = "block"; // Show the modal
    }

    // Event listener for modal close button
    document.getElementById("closeModal").addEventListener("click", () => {
        document.getElementById("budgetModal").style.display = "none";
    });

    // Add event listener to a button to trigger the modal
    document.getElementById("showBudgetButton").addEventListener("click", displayBudgetModal);

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
        /* Add budget information to the modal and style*/
        var displayLocationBudget = document.createElement('p');
        displayLocationBudget.innerText = 'Perfect location for a budget of £' + destinations.find(destination => destination.name === title).budget;
        displayLocationBudget.style.backgroundColor = 'var(--orange)';
        displayLocationBudget.style.fontSize = '1.2em';
        modal.insertBefore(displayLocationBudget, modal.firstChild);
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
        document.getElementById('destinationModal').removeChild(document.getElementById('destinationModal').firstChild);
    });

    // Close modal when the "Book Now" button is clicked
    document.getElementById('book-now').addEventListener('click', function () {
        var modalToggle = new bootstrap.Modal(document.getElementById('exampleModalToggle'));
        modalToggle.show();
        var modal = document.getElementById('destinationModal');
        modal.style.display = 'none';
        document.getElementById('destinationModal').removeChild(document.getElementById('destinationModal').firstChild);
    });
});
