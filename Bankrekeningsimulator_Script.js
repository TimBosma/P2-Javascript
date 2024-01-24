// Gebruikers en hun saldo's
let users = {
    'user1': { balance: 1000, transactionHistory: [] },
    'user2': { balance: 1500, transactionHistory: [] }
};

// Huidige gebruiker
let currentUser = 'user1';

// Referenties naar UI-elementen
const usernameInput = document.getElementById('username');
const balanceDisplay = document.getElementById('balance');
const amountInput = document.getElementById('amount');
const transactionResultDisplay = document.getElementById('transactionResult');
const transactionHistoryList = document.getElementById('transactionHistory');

// Functie om van gebruiker te wisselen
function switchUser() {
    const newUsername = usernameInput.value.trim();
    if (newUsername && users[newUsername]) {
        currentUser = newUsername;
        updateUI();
    } else {
        alert('Gebruiker niet gevonden.');
    }
}

// Functie voor het bijwerken van de UI
function updateUI() {
    balanceDisplay.textContent = `Saldo: $${users[currentUser].balance.toFixed(2)}`;
    amountInput.value = ''; // Wis het invoerveld na elke transactie
    updateTransactionHistory();
}

// Functie voor geld storten
function deposit() {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        displayTransactionResult('Voer een geldig bedrag in.', 'red');
        return;
    }
    users[currentUser].balance += amount;
    users[currentUser].transactionHistory.push(`Geld gestort: $${amount}`);
    updateUI();
    displayTransactionResult(`Geld gestort: $${amount}`, 'green');
}

// Functie voor geld opnemen
function withdraw() {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        displayTransactionResult('Voer een geldig bedrag in.', 'red');
        return;
    }
    if (amount > users[currentUser].balance) {
        displayTransactionResult('Onvoldoende saldo.', 'red');
        return;
    }
    users[currentUser].balance -= amount;
    users[currentUser].transactionHistory.push(`Geld opgenomen: $${amount}`);
    updateUI();
    displayTransactionResult(`Geld opgenomen: $${amount}`, 'green');
}

// Functie voor het weergeven van transactieresultaten
function displayTransactionResult(message, color) {
    transactionResultDisplay.textContent = message;
    transactionResultDisplay.style.color = color;
    setTimeout(() => {
        transactionResultDisplay.textContent = '';
    }, 3000); // Wis het bericht na 3 seconden
}

// Functie voor het bijwerken van transactiegeschiedenis
function updateTransactionHistory() {
    transactionHistoryList.innerHTML = '';
    users[currentUser].transactionHistory.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = transaction;
        transactionHistoryList.appendChild(listItem);
    });
}
