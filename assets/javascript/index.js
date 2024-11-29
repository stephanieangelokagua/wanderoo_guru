
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

// Event Listener for Slider and Button
const budgetSlider = document.getElementById("customRange2");
const findButton = document.getElementById("findButton");
const cardContainer = document.getElementById("cardContainer");

// Display initial budget value
document.getElementById("budgetValue").textContent = `$${budgetSlider.value}`;

// Update displayed budget value as slider changes
budgetSlider.addEventListener("input", () => {
document.getElementById("budgetValue").textContent = `$${budgetSlider.value}`;
});

// Filter destinations on button click
findButton.addEventListener("click", () => {
const userBudget = parseInt(budgetSlider.value);

// Filter destinations based on budget
const filteredDestinations = destinations.filter((destination) => destination.budget <= userBudget);

// Clear previous results
cardContainer.innerHTML = "";

// Check if any destinations match the budget
if (filteredDestinations.length === 0) {
    cardContainer.innerHTML = "<p>No destinations available for your budget.</p>";
    return;
}

// Generate cards for filtered destinations
filteredDestinations.forEach((destination) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
    <img src="${destination.image}" class="card-img-top" alt="${destination.name}">
    <div class="card-body">
      <h5 class="card-title">${destination.name}</h5>
      <p class="card-text">Budget: $${destination.budget}</p>
      <a href="#" class="btn btn-primary">Learn More</a>
    </div>
  `;
    cardContainer.appendChild(card);
});
});