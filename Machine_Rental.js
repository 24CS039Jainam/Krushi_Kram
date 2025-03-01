function calculateTotal(machine) {
    let companySelect = document.getElementById(machine + "-company");
    let price = companySelect.value;
    let days = document.getElementById(machine + "-days").value;
    let total = parseInt(days) * parseFloat(price);
    document.getElementById(machine + "-total").innerText = `Total: ₹${total}`;
}

// Function to handle Rent button click
function handleRent(machine) {
    let companySelect = document.getElementById(machine + "-company");
    let selectedOption = companySelect.options[companySelect.selectedIndex];

    let price = parseInt(selectedOption.value);
    let trader = selectedOption.getAttribute("data-company");
    let ownerEmail = selectedOption.getAttribute("data-owner"); // Get the owner's email
    let days = document.getElementById(machine + "-days").value;
    let total = parseInt(days) * price;

    let confirmRent = confirm(`Are you sure you want to rent the ${machine} from ${trader} for ${days} days?\nTotal cost: ₹${total}`);
    
    if (confirmRent) {
        sendEmail(machine, price, trader, days, total, ownerEmail);
    } else {
        alert(`Rental request for ${machine} was canceled.`);
    }
}

// Function to send email to the correct owner
function sendEmail(machine, price, trader, days, total, ownerEmail) {
    let subject = `Machinery Rental Request: ${machine}`;

    let body = `Hello,\n\nI would like to rent the following machinery:\n\n` +
               `🚜 Machine: ${machine}\n` +
               `📅 Days: ${days}\n` +
               `💰 Price per Day: ₹${price}\n` +
               `💵 Total Price: ₹${total}\n` +
               `👨‍🌾 Trader: ${trader}\n\n` +
               `Please confirm the availability.\n\nThank you!`;

    // Open mail client with pre-filled details
    window.location.href = `mailto:${ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Show success message
    alert(`Thank you! Your rental request for ${machine} has been sent to ${ownerEmail}.`);
}
