// Sample data with multiple traders and Vadodara added
const data = {
    "Ahmedabad": {
        "yards": ["Yard A", "Yard B"],
        "traders": {
            "Yard A": [
                { name: "Trader 1", contact: "9876543210", crops: [{ name: "Wheat", price: "₹25" }, { name: "Rice", price: "₹30" }] },
                { name: "Trader 2", contact: "9865321470", crops: [{ name: "Corn", price: "₹20" }, { name: "Barley", price: "₹22" }] },
                { name: "Trader 3", contact: "9856123480", crops: [{ name: "Soybean", price: "₹50" }, { name: "Chickpea", price: "₹40" }] }
            ],
            "Yard B": [
                { name: "Trader 4", contact: "9845123456", crops: [{ name: "Cotton", price: "₹50" }, { name: "Sugarcane", price: "₹35" }] },
                { name: "Trader 5", contact: "9834598760", crops: [{ name: "Jowar", price: "₹28" }, { name: "Millet", price: "₹26" }] },
                { name: "Trader 6", contact: "9823456790", crops: [{ name: "Groundnut", price: "₹45" }, { name: "Mustard", price: "₹38" }] }
            ]
        }
    },
    "Surat": {
        "yards": ["Yard X", "Yard Y"],
        "traders": {
            "Yard X": [
                { name: "Trader 7", contact: "9898989898", crops: [{ name: "Mango", price: "₹40" }, { name: "Papaya", price: "₹35" }] },
                { name: "Trader 8", contact: "9890123456", crops: [{ name: "Pomegranate", price: "₹50" }, { name: "Orange", price: "₹45" }] },
                { name: "Trader 9", contact: "9887654321", crops: [{ name: "Lemon", price: "₹30" }, { name: "Grapes", price: "₹60" }] }
            ],
            "Yard Y": [
                { name: "Trader 10", contact: "9765432190", crops: [{ name: "Banana", price: "₹20" }, { name: "Guava", price: "₹25" }] },
                { name: "Trader 11", contact: "9753124680", crops: [{ name: "Coconut", price: "₹35" }, { name: "Betel Leaf", price: "₹40" }] },
                { name: "Trader 12", contact: "9741256789", crops: [{ name: "Cashew", price: "₹70" }, { name: "Almond", price: "₹80" }] }
            ]
        }
    },
    "Vadodara": {
        "yards": ["Yard P", "Yard Q"],
        "traders": {
            "Yard P": [
                { name: "Trader 13", contact: "9700012345", crops: [{ name: "Tomato", price: "₹18" }, { name: "Onion", price: "₹25" }] },
                { name: "Trader 14", contact: "9701122334", crops: [{ name: "Potato", price: "₹20" }, { name: "Carrot", price: "₹22" }] },
                { name: "Trader 15", contact: "9702233445", crops: [{ name: "Spinach", price: "₹15" }, { name: "Cabbage", price: "₹18" }] }
            ],
            "Yard Q": [
                { name: "Trader 16", contact: "9703344556", crops: [{ name: "Cucumber", price: "₹12" }, { name: "Pumpkin", price: "₹28" }] },
                { name: "Trader 17", contact: "9704455667", crops: [{ name: "Brinjal", price: "₹30" }, { name: "Bitter Gourd", price: "₹35" }] },
                { name: "Trader 18", contact: "9705566778", crops: [{ name: "Green Peas", price: "₹40" }, { name: "Sweet Corn", price: "₹50" }] }
            ]
        }
    }
};

// Populate cities dropdown
const citySelect = document.getElementById("city");
Object.keys(data).forEach(city => {
    let option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
});

// Update yards dropdown based on selected city
function updateYards() {
    const yardSelect = document.getElementById("yard");
    yardSelect.innerHTML = '<option value="">-- Select Yard --</option>';
    const selectedCity = citySelect.value;

    if (selectedCity && data[selectedCity]) {
        data[selectedCity].yards.forEach(yard => {
            let option = document.createElement("option");
            option.value = yard;
            option.textContent = yard;
            yardSelect.appendChild(option);
        });
    }
}

// Fetch and display trader data
function getTraders() {
    const city = document.getElementById("city").value;
    const yard = document.getElementById("yard").value;
    const traderTable = document.getElementById("traderTable").getElementsByTagName("tbody")[0];
    traderTable.innerHTML = "";

    if (city && yard && data[city].traders[yard]) {
        data[city].traders[yard].forEach(trader => {
            let row = traderTable.insertRow();
            row.insertCell(0).textContent = trader.name;
            row.insertCell(1).textContent = trader.contact;
            let cropDetails = trader.crops.map(crop => `${crop.name}: ${crop.price}`).join(", ");
            row.insertCell(2).textContent = cropDetails;
        });
    } else {
        alert("No traders found for the selected yard.");
    }
}
