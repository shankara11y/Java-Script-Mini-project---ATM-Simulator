const INITIAL_BALANCE = 6500;
let currentPin = "8888"; 
const screen = document.getElementById('screen');
let balance = INITIAL_BALANCE;

showWelcome();

function showWelcome() {
    balance = INITIAL_BALANCE;
    currentPin = "8888"; 
    
    screen.style.background = "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)";
    screen.innerHTML = `
        <div class="welcome-screen">
            <h1 style="font-size: 3rem; margin-top: 40px; color: white;">Welcome</h1>
            <p style="color: white;">World Leading ATM Network</p>
            <div style="margin-top: 60px; color: white;">
                <p>Please insert your card</p>
                <p style="font-size: 2rem;">↓</p>
            </div>
        </div>
    `;
}

function insertCard() {
    screen.innerHTML = `
        <div class="welcome-screen">
            <h2 style="margin-top: 100px; color: white;">Reading Card...</h2>
        </div>`;
    
    setTimeout(() => {
        showHome();
    }, 1200);
}

function showHome() {
    screen.style.background = "linear-gradient(to bottom, #a1c4fd 0%, #c2e9fb 100%)";
    screen.innerHTML = `
        <h1 style="text-align:center; font-size: 3rem; color: #333; margin-bottom: 5px;">ATM</h1>
        <p style="text-align:center; font-weight:bold; color: #555;">Current Balance: ₹${balance}</p>
        <div class="menu-grid">
            <button onclick="showPinPage()">Cash Withdrawal</button>
            <button onclick="depositCash()">Deposit Cash</button>
            <button onclick="alert('Balance: ₹' + balance)">Balance Inquiry</button>
            <button onclick="changePin()">Change PIN</button>
            <button class="back-btn" onclick="showWelcome()">Exit / Eject Card</button>
        </div>
    `;
}

function showPinPage() {
    screen.innerHTML = `
        <div style="text-align:center; margin-top: 50px;">
            <h2>Enter 4-Digit PIN</h2>
            <input type="password" id="pinInput" maxlength="4" style="font-size: 2rem; width: 150px; text-align:center;">
            <br><br>
            <button onclick="verifyPin()">Submit</button>
            <button class="back-btn" onclick="showHome()">Cancel</button>
        </div>
    `;
}

function verifyPin() {
    const enteredPin = document.getElementById('pinInput').value;
    if (enteredPin === currentPin) {
        showWithdrawAmount();
    } else {
        alert("Incorrect PIN! Try " + currentPin);
    }
}

function changePin() {
    let newPin = prompt("Enter your new 4-digit PIN:");
    if (newPin && newPin.length === 4 && !isNaN(newPin)) {
        currentPin = newPin; 
        alert("PIN successfully changed to " + currentPin);
    } else {
        alert("Invalid PIN. Must be 4 digits.");
    }
}

function showWithdrawAmount() {
    screen.innerHTML = `
        <h2 style="text-align:center; color: #333;">Select amount (Balance: ₹${balance})</h2>
        <div class="menu-grid">
            <button class="withdraw-btn" onclick="processWithdraw(100)">₹100</button>
            <button class="withdraw-btn" onclick="processWithdraw(500)">₹500</button>
            <button class="withdraw-btn" onclick="processWithdraw(2000)">₹2000</button>
            <button class="withdraw-btn" onclick="processWithdraw(5000)">₹5000</button>
            <button class="withdraw-btn" onclick="customAmount()">Other</button>
            <button class="back-btn" onclick="showHome()">Back</button>
        </div>
    `;
}

function processWithdraw(amount) {
    if (amount > balance) {
        alert("Insufficient Funds! You only have ₹" + balance);
    } else {
        balance -= amount;
        screen.innerHTML = `
            <div style="text-align:center; margin-top: 80px;">
                <h2 style="color: #27ae60;">Transaction Successful!</h2>
                <p>Withdrawing: ₹${amount}</p>
                <p>New Balance: ₹${balance}</p>
                <br>
                <button onclick="showHome()">Return to Menu</button>
                <button class="back-btn" onclick="showWelcome()">Exit</button>
            </div>
        `;
    }
}

function customAmount() {
    let amount = parseInt(prompt("Enter amount in ₹:"));
    if (!isNaN(amount) && amount > 0) {
        processWithdraw(amount);
    } else {
        alert("Invalid amount");
    }
}

function depositCash() {
    let amount = parseInt(prompt("Enter amount to deposit (₹):"));
    if (!isNaN(amount) && amount > 0) {
        balance += amount;
        alert("Successfully deposited ₹" + amount);
        showHome();
    } else {
        alert("Invalid amount entered.");
    }
}