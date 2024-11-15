let confirmationCode = null;

document.getElementById("sendButton").addEventListener("click", function() {
    const amount = document.getElementById("amount").value;
    const currency = document.getElementById("currency").value;

    // Генерация кода подтверждения
    confirmationCode = Math.floor(100000 + Math.random() * 900000); // Генерируем случайный код

    alert("Ваш код подтверждения: " + confirmationCode);

    // Переход ко второму окну с вводом кода
    document.getElementById("formWindow").style.display = "none";
    document.getElementById("confirmationCodeContainer").style.display = "block";
});

document.getElementById("confirmCodeButton").addEventListener("click", function() {
    const inputCode = document.getElementById("confirmationCode").value;

    if (inputCode == confirmationCode) {
        // Переход к прогресс-бару
        document.getElementById("confirmationCodeContainer").style.display = "none";
        document.querySelector(".progress-bar-container").style.display = "block";

        // Плавное изменение прогресса
        setTimeout(function() {
            document.querySelector(".progress").style.width = "100%";
        }, 100);

        // Показываем квитанцию
        setTimeout(function() {
            document.querySelector(".progress-bar-container").style.display = "none";
            document.getElementById("confirmationPanel").style.display = "block";

            // Заполняем данные квитанции
            document.getElementById("amountConfirmation").textContent = document.getElementById("amount").value;
            document.getElementById("currencyConfirmation").textContent = document.getElementById("currency").value;
            document.getElementById("recipient").textContent = "fnm04.sh";
            document.getElementById("transactionTime").textContent = new Date().toLocaleString();
            document.getElementById("transactionIdValue").textContent = "TXN123456789";

            // Генерация QR кода
            const qrCodeContainer = document.getElementById("qrCode");
            QRCode.toCanvas(qrCodeContainer, `TransactionID: TXN123456789\nAmount: ${document.getElementById("amount").value}\nCurrency: ${document.getElementById("currency").value}`, function(error) {
                if (error) console.error(error);
            });
        }, 2000);
    } else {
        alert("Неверный код подтверждения");
    }
});
