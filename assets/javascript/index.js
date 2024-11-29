
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

// dynamically update budgetslider label based on user input
const budgetSlider = document.getElementById("customRange2") // get the range
const budgetLabel = document.getElementById("budgetValue") // get label
budgetLabel.textContent = `£${budgetSlider.value}` // set default label value
budgetSlider.addEventListener('input', () =>{
    budgetLabel.textContent = `£${budgetSlider.value}` // update based on user input
});

const destinationButton = document.getElementById("findButton")
destinationButton.addEventListener('click', () => {
    possibleDestinations()
})

function possibleDestinations(){
    const userBudget = parseInt(budgetSlider.value) // get budget entered by user
    filterDestinationsByBudget = destinations.filter((destination) => destination.budget <= userBudget) //filter destinations by budget

}