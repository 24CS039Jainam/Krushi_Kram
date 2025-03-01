document.addEventListener("DOMContentLoaded", function () {
    // Load FastBots AI Chatbot
    const botScript = document.createElement("script");
    botScript.src = "https://app.fastbots.ai/embed.js";
    botScript.setAttribute("data-bot-id", "cm7q71wwz11hdrik5rxeeobym");
    botScript.defer = true;
    document.body.appendChild(botScript);

    // Corrected Slogans
    const slogans = [
        "Innovating the Future of Farming",
        "Sowing the Seeds of Success",
        "Harvesting a Brighter Tomorrow",
        "Smart Solutions for Sustainable Farming",
        "Empowering Farmers, Transforming Lives",
        "Your Trusted Partner in Agriculture"
    ];

    let sloganIndex = 0;
    let charIndex = 0;
    const typingElement = document.getElementById("typing-text");
    let isDeleting = false;

    function typeWriter() {
        if (!typingElement) return; // Ensure the element exists

        const currentSlogan = slogans[sloganIndex];
        if (isDeleting) {
            typingElement.textContent = currentSlogan.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentSlogan.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 100; // Typing speed (faster when deleting)

        if (!isDeleting && charIndex === currentSlogan.length) {
            speed = 2000; // Pause before deleting
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            sloganIndex = (sloganIndex + 1) % slogans.length; // Move to next slogan
            speed = 500; // Pause before next typing cycle
        }

        setTimeout(typeWriter, speed);
    }

    // Start typing effect
    typeWriter();
});
