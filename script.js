// The slogans to be typed out
const slogans = [
    "Innovating the Future of Farming",
    "Sowing the Seeds of Growth",
    "Harvesting Opportunities for All",
    "Smart Solutions for Sustainable Agriculture",
    "Empowering Farmers, Enriching Lives",
    "Your Partner in Agricultural Excellence"
];

let sloganIndex = 0; // Keeps track of the current slogan
let charIndex = 0;   // Keeps track of the current character in the slogan
const typingElement = document.getElementById("typing-text");

function typeWriter() {
    if (charIndex < slogans[sloganIndex].length) {
        typingElement.innerHTML += slogans[sloganIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100); // Adjust typing speed here (in milliseconds)
    } else {
        // After finishing one slogan, move to the next slogan
        setTimeout(clearText, 500); // Wait before clearing the text
    }
}

function clearText() {
    // Clear the text and move to the next slogan
    typingElement.innerHTML = '';
    charIndex = 0; // Reset character index
    sloganIndex++; // Move to the next slogan

    if (sloganIndex >= slogans.length) {
        sloganIndex = 0; // Loop back to the first slogan
    }

    // Start typing the next slogan
    setTimeout(typeWriter, 500); // Wait before typing the next slogan
}

// Start typing effect when the page loads
window.onload = typeWriter;
