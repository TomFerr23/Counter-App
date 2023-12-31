document.addEventListener("DOMContentLoaded", function () {
    const resetButtonContainer = document.querySelector(".buttons");

    // Create the reset button dynamically
    const resetButton = document.createElement("button");
    resetButton.className = "reset-counter";
    resetButton.id = "reset";
    resetButton.textContent = "Reset";

    // Event listener for the reset button
    resetButton.addEventListener("click", () => {
        counterValue = 0;
        clickCounter = 0;
        counterValueSpan.textContent = "0";
    });

    // Append the reset button to the buttons div
    resetButtonContainer.appendChild(resetButton);

    // Create the <span> element for counter value
    const counterValueSpan = document.createElement("span");
    counterValueSpan.id = "counter-value";
    counterValueSpan.textContent = "0";

    // Append the <span> element to the "value" div
    const valueDiv = document.querySelector(".value");
    valueDiv.appendChild(counterValueSpan);

    // Create the "+" button
    const incrementButton = document.createElement("button");
    incrementButton.id = "increment";
    incrementButton.textContent = "+";
    incrementButton.addEventListener("click", incrementCounter);

    // Create the "-" button
    const decrementButton = document.createElement("button");
    decrementButton.id = "decrement";
    decrementButton.textContent = "-";
    decrementButton.addEventListener("click", decrementCounter);

    // Append the buttons to the "buttons" div
    const buttonsDiv = document.querySelector(".buttons");
    buttonsDiv.appendChild(decrementButton);
    buttonsDiv.appendChild(incrementButton);

    const valueElement = document.getElementById("counter-value");
    const clickSound = document.getElementById("clickSound");
    const body = document.body;
    const counter = document.querySelector(".counter");
    const historyList = document.getElementById("history-list");

    // Create the "Switch Theme" button
    const switchThemeButton = document.createElement("button");
    switchThemeButton.id = "switchTheme";
    switchThemeButton.textContent = "Switch Theme";

    // Find the "theme-switch" div by class
    const themeSwitchDiv = document.querySelector(".theme-switch");

    // Append the button to the "theme-switch" div
    themeSwitchDiv.appendChild(switchThemeButton);

    // 

    let counterValue = 0;
    let isLightTheme = body.classList.contains("light-theme");
    const counterHistory = [];

    function updateCounterDisplay() {
        valueElement.textContent = counterValue;
        setValueTextColor(getValueTextColor("#000000", "#9292ff"), isLightTheme ? "#000000" : "#e1e1ff");
    }

    function incrementCounter() {
        counterValue++;
        updateCounterDisplay();
        playClickSound();
        applyButtonTemporaryColor(incrementButton, "#30ffb0"); // Temporary color change
        counterHistory.push(counterValue); // Store the current value
        updateCounterHistory();
    }

    function decrementCounter() {
        if (counterValue > 0) {
            counterValue--;
            updateCounterDisplay();
            playClickSound();
            applyButtonTemporaryColor(decrementButton, "#e95c57"); // Temporary color change
            counterHistory.push(counterValue); // Store the current value
            updateCounterHistory();
        }
    }

    function playClickSound() {
        clickSound.currentTime = 0; // Rewind the sound to the beginning
        clickSound.play();
    }

    function applyButtonTemporaryColor(button, tempColor) {
        button.style.backgroundColor = tempColor;
        setTimeout(() => {
            setButtonColors();
        }, 300);
    }

    function setButtonColors() {
        incrementButton.style.backgroundColor = getButtonColor("#c4c4c4", "#5A80FF");
        decrementButton.style.backgroundColor = getButtonColor("#f8f8f8", "#dfebf8");
        switchThemeButton.style.backgroundColor = getButtonColor("#c4c4c4", "#5A80FF");
        setValueTextColor(getValueTextColor("#c4c4c4", "#e1e1ff"), isLightTheme ? "#000000" : "#e1e1ff");
    }

    function getButtonColor(lightColor, darkColor) {
        return isLightTheme ? lightColor : darkColor;
    }

    function getValueTextColor(lightColor, darkColor) {
        return isLightTheme ? lightColor : darkColor;
    }

    function setValueTextColor(color, shadowColor) {
        valueElement.style.color = color;
    }

    incrementButton.addEventListener("click", incrementCounter);
    decrementButton.addEventListener("click", decrementCounter);

    switchThemeButton.addEventListener("click", () => {
        isLightTheme = !isLightTheme;
        body.classList.toggle("light-theme");
        counter.classList.toggle("light-theme");
        setButtonColors();
    });

    function updateCounterHistory() {
        historyList.innerHTML = "";

        counterHistory.forEach((value, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `Step ${index + 1}: ${value}`;
            historyList.appendChild(listItem);
        });
    }

    updateCounterDisplay();

    // achievements.js code
    const achievements = [
        {
            name: "First Achievement",
            requiredClicks: 15,
            message: "Congratulations you unlocked: First Achievement",
            image: "img/icon-badge.png"
        },
        {
            name: "Super Bonus Achievement",
            requiredClicks: 50,
            message: "Congratulations, did you really hit that 50 times?",
            image: "img/jimmy.jpg"
        }
    ];

    let card1Displayed = false; // Flag to control card-1 display
    let card2Displayed = false; // Flag to control card-2 display
    let clickCounter = 0; // Track click count

    function checkAchievements() {
        const counterValue = clickCounter;

        achievements.forEach((achievement) => {
            if (counterValue >= achievement.requiredClicks) {
                if (achievement.name === "First Achievement" && !card1Displayed) {
                    unlockAchievement(achievement, "card-1");
                    card1Displayed = true;
                } else if (achievement.name === "Super Bonus Achievement" && !card2Displayed) {
                    unlockAchievement(achievement, "card-2");
                    card2Displayed = true;
                }
            }
        });
    }

    function unlockAchievement(achievement, cardId) {
        // Display achievement card with the given message
        const achievementCard = document.createElement("div");
        achievementCard.classList.add("achievement-card");
        achievementCard.id = cardId;
        achievementCard.innerHTML = `
            <img src="${achievement.image}" alt="Achievement Icon">
            <p>${achievement.message}</p>
        `;
        document.body.appendChild(achievementCard);

        // Timeout to apply a class that triggers the sliding-in animation
        setTimeout(() => {
            achievementCard.classList.add("slide-in");
        }, 100);

        // Remove the card after a few seconds
        setTimeout(() => {
            document.body.removeChild(achievementCard);
        }, 5000);
    }

    // Event listener for checking achievements on every button click
    incrementButton.addEventListener("click", () => {
        clickCounter++; // Increment the click count
        updateCounterDisplay();
        checkAchievements();
    });

    decrementButton.addEventListener("click", () => {
        if (clickCounter > 0) {
            clickCounter--; // Decrement the click count
            updateCounterDisplay();
            checkAchievements();
        }
    });

    // Initial check for achievements when the page loads
    checkAchievements();
});
