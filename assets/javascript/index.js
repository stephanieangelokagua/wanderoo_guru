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
function updateInputFromRange(rangeId, inputId) {
    var range = document.getElementById(rangeId);
    var input = document.getElementById(inputId);
    input.value = range.value;
}

function updateRangeFromInput(rangeId, inputId) {
    var range = document.getElementById(rangeId);
    var input = document.getElementById(inputId);
    range.value = input.value;
}

//budget calculation function
function calculateBudget() {
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
    const userBudget = parseInt(budgetSlider.value) // get budget entered by user
    const heading_div = document.createElement("div")
    const heading_for_card_section = document.createElement("h2")
    heading_for_card_section.className = "mt-5"
    heading_for_card_section.textContent = "Top Destinations for your budget!"
    heading_div.appendChild(heading_for_card_section)
    cardContainer.appendChild(heading_div)

    filterDestinationsByBudget = destinations.filter((destination) => destination.budget <= userBudget) //filter destinations by budget
    if (filterDestinationsByBudget.length === 0) {
        cardContainer.innerHTML = '<p>No destinations available for your budget!</p>'
        return;

    }

    filterDestinationsByBudget.forEach((destination) => {

        heading_for_card_section.className = "col-12"
        const column_card = document.createElement("div")
        column_card.className = "col-4"
        const card = document.createElement("div")
        card.className = "card"
        card.innerHTML = `<img src="${destination.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">${destination.name}</p>
  </div>`

        column_card.appendChild(card)
        cardContainer.appendChild(column_card)

    });


}