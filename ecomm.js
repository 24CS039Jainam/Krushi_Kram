let cart = [];

function proceedToPayment() {
    // Calculate the total amount
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    // Create a bill summary
    const billSummary = `Bill Summary:\n\n` +
        cart.map((item, index) => `${index + 1}. ${item.name} - Rs.${item.price}`).join('\n') +
        `\n\nTotal Amount: Rs.${totalAmount}`;

    // Generate the QR code
    const qrCodeElement = document.getElementById('qr-code');
    qrCodeElement.innerHTML = ''; // Clear previous QR code
    QRCode.toCanvas(billSummary, { width: 200 }, (error, canvas) => {
        if (error) {
            console.error('Error generating QR code:', error);
            alert('Failed to generate QR code. Please try again.');
        } else {
            qrCodeElement.appendChild(canvas);
        }
    });

    // Show the QR code modal
    document.getElementById('qr-modal').style.display = 'block';
}

function closeQRModal() {
    document.getElementById('qr-modal').style.display = 'none';
}