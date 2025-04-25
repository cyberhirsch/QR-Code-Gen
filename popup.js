document.addEventListener('DOMContentLoaded', function () {
    var generateButton = document.getElementById('generate');
    generateButton.addEventListener('click', function() {
        var text = document.getElementById('text').value;
        generateQRCode(text, 'qrcode', 400, 400, true); // Visible small QR code
        generateQRCode(text, 'qrcodeLarge', 1024, 1024, false); // Hidden large QR code
    });

    var downloadButton = document.getElementById('download');
    downloadButton.addEventListener('click', function() {
        downloadQRCode('qrcodeLarge');
    });

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        var activeTabUrl = activeTab.url;
        document.getElementById('text').value = activeTabUrl;
        generateQRCode(activeTabUrl, 'qrcode', 400, 400, true);
        generateQRCode(activeTabUrl, 'qrcodeLarge', 1024, 1024, false);
    });
});

function generateQRCode(text, elementId, width, height, isVisible) {
    var qrcodeContainer = document.getElementById(elementId);
    qrcodeContainer.innerHTML = '';
    if (text) {
        new QRCode(qrcodeContainer, {
            text: text,
            width: width,
            height: height,
            colorDark : "#000000",
            colorLight : "#ffffff"
        });
    }
    qrcodeContainer.style.display = isVisible ? 'block' : 'none';
}

function downloadQRCode(elementId) {
    var qrcodeImage = document.querySelector(`#${elementId} img`);
    if (qrcodeImage) {
        var downloadLink = document.createElement('a');
        downloadLink.href = qrcodeImage.src;
        downloadLink.download = 'LargeQRCode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}
