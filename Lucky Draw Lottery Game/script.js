const pickNumberBtn = document.getElementById("pickanumber");
const result = document.getElementById("result");
const Lotterysheet = document.getElementById("lotterySheetContainer");

const tick = new Audio("tap.wav");
const winningsound = new Audio("gamecompleted.wav");

let winnerHistory =
  JSON.parse(localStorage.getItem("winnerHistory")) || [];

  console.log(
  JSON.parse(localStorage.getItem("winnerHistory"))
);

const gifts = [
  "₹100 Cash",
  "Toy Car",
  "Chocolate Box",
  "₹500 Cash",
  "Smartphone Cover",
  "Book",
  "Headphones",
  "₹50 Cash",
  "Gift Voucher",
  "Watch",
  "Teddy Bear",
  "Bluetooth Speaker",
  "Movie Ticket",
  "₹200 Cash",
  "Puzzle Game",
  "Perfume",
  "Sunglasses",
  "₹1000 Cash",
  "Board Game",
  "Fitness Band",
  "Digital Clock",
  "Lamp",
  "Shopping Voucher",
  "Laptop Bag",
  "Wireless Mouse",
  "Travel Mug",
  "Notebook Set",
  "Gaming Mousepad",
  "₹250 Cash",
  "Keychain",
  "Water Bottle",
  "Portable Charger",
  "Desk Organizer",
  "Cooking Set",
  "Action Figure",
  "₹300 Cash",
  "Travel Pillow",
  "Mini Backpack",
  "Personalized Mug",
  "Gaming Controller",
  "Camera Strap",
  "Toy Robot",
  "₹750 Cash",
  "Sports Equipment",
  "Pen Set",
  "Bluetooth Earbuds",
  "Digital Photo Frame",
  "Wallet",
  "Backpack",
  "Gift Hamper"
];

// Generate lottery boxes
gifts.forEach((value, index) => {
  const boxelement = `
    <div class="box" id="${index + 1}">
      ${index + 1}. ${value}
    </div>
  `;

  Lotterysheet.insertAdjacentHTML("beforeend", boxelement);
});

// Pick Number Button
pickNumberBtn.addEventListener("click", function () {

  // Disable button during draw
  pickNumberBtn.disabled = true;

  // Remove old winner and highlights
  for (let i = 1; i <= 50; i++) {
    document.getElementById(i).classList.remove("winningbox");
    document.getElementById(i).classList.remove("highlightedBox");
  }

  let secondscount = 0;

  result.textContent = "Drawing... 5";

  const intervalid = setInterval(() => {

    // Tick sound
    tick.pause();
    tick.currentTime = 0;
    tick.play();

    secondscount++;

    const randombox = Math.floor(Math.random() * 50) + 1;

    // Highlight animation
    for (let i = 1; i <= 50; i++) {

      if (i === randombox) {
        document.getElementById(i).classList.add("highlightedBox");
      } else {
        document.getElementById(i).classList.remove("highlightedBox");
      }
    }

    // Countdown
    if (secondscount < 5) {
      result.textContent = `Drawing... ${5 - secondscount}`;
    }

    // Winner
    if (secondscount === 5) {

      const winnerNumber = randombox;
      const gift = gifts[winnerNumber - 1];

      const winnerBox =
        document.getElementById(winnerNumber);

      winnerBox.classList.remove("highlightedBox");
      winnerBox.classList.add("winningbox");

      // Winner sound
      winningsound.pause();
      winningsound.currentTime = 0;
      winningsound.play();

      // Result
      result.textContent =
        `🎉 Congratulations! You got number ${winnerNumber} and won ${gift}`;

      // Save history
      winnerHistory.push({
        number: winnerNumber,
        gift: gift,
        time: new Date().toLocaleString()
      });

      localStorage.setItem(
        "winnerHistory",
        JSON.stringify(winnerHistory)
      );

      // Confetti (requires canvas-confetti library)
      if (typeof confetti === "function") {
        confetti({
          particleCount: 150,
          spread: 120,
          origin: { y: 0.6 }
        });
      }
      

      clearInterval(intervalid);

      // Enable button again
      pickNumberBtn.disabled = false;
    }

  }, 1000);

});
document.getElementById("clearHistory")
  .addEventListener("click", () => {

    localStorage.removeItem("winnerHistory");

    winnerHistory = [];

    alert("Winner history cleared!");
  });
