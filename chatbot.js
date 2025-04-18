ocument.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;

        appendMessage("You", userMessage, "user");
        userInput.value = "";
        setTimeout(() => botResponse(userMessage), 1000);
    }

    function appendMessage(sender, message, className) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", className);
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function botResponse(userMessage) {
        let botMessage = "I'm here to assist you!";
       
        const lowerMessage = userMessage.toLowerCase();
        if (lowerMessage.includes("hello")) {
            botMessage = "Hello! How can I assist you today?";
        } else if (lowerMessage.includes("how to submit complaint")) {
            botMessage = "You can submit a complaint through the complaint form on the portal.";
        } else if (lowerMessage.includes("status")) {
            botMessage = "To check your complaint status, log in and visit the complaints section.";
        } else if (lowerMessage.includes("contact")) {
            botMessage = "You can reach us at civicissuesportal@gmail.com.";
        } else {
            botMessage = "I'm not sure how to answer that. Try asking about complaints, status, or contact details.";
        }

        appendMessage("Chatbot", botMessage, "bot");
    }
});
