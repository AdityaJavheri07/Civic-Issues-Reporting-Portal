document.addEventListener("DOMContentLoaded", function () {
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

    const commonMisspellings = {
    "helo": "hello",
    "hlo": "hello",
    "hllo": "hello",
    "helo": "hello",
    "complint": "complaint",
    "complant": "complaint",
    "complnt": "complaint",
    "statys": "status",
    "stauts": "status",
    "statu": "status",
    "contct": "contact",
    "contat": "contact",
    "cntact": "contact",
    "thnks": "thanks",
    "thaks": "thanks",
    "thnk": "thanks",
    "asist": "assist",
    "asist": "assist",
    "asist": "assist",
    "regstr": "register",
    "rgister": "register",
    "regster": "register",
    "logn": "login",
    "logi": "login",
    "loggin": "login",
    "usr": "user",
    "usre": "user",
    "userr": "user",
    "complnt": "complaint",
    "cmplaint": "complaint",
    "cmplnt": "complaint",
    "submt": "submit",
    "sbmit": "submit",
    "submmit": "submit",
    "frm": "form",
    "frorm": "form",
    "frorm": "form",
    "dshboard": "dashboard",
    "dashbord": "dashboard",
    "dashboad": "dashboard",
    "municipal": "municipal",
    "municpal": "municipal",
    "municiple": "municipal",
    "portal": "portal",
    "portl": "portal",
    "portel": "portal",
    "civic": "civic",
    "civc": "civic",
    "civick": "civic",
    "issue": "issue",
    "isue": "issue",
    "isssue": "issue",
    "report": "report",
    "repot": "report",
    "reprot": "report",
    "waterlogging": "water logging",
    "waterloging": "water logging",
    "waterlog": "water logging",
    "pothole": "pothole",
    "pothol": "pothole",
    "pothole": "pothole",
    "dustbin": "dustbin",
    "dustbn": "dustbin",
    "dustbin": "dustbin",
    "traffic": "traffic",
    "trafic": "traffic",
    "traffik": "traffic",
    "contaminated": "contaminated",
    "contaminatd": "contaminated",
    "contaminated": "contaminated",
    "dumping": "dumping",
    "dumpng": "dumping",
    "dumping": "dumping",
    "streetlight": "streetlight",
    "streetlght": "streetlight",
    "streetlight": "streetlight",
    "sidewalk": "sidewalk",
    "sidewlak": "sidewalk",
    "sidewalk": "sidewalk",
    "animals": "animals",
    "animls": "animals",
    "animals": "animals",
    "others": "others",
    "othrs": "others",
    "others": "others"
};


    function correctSpelling(message) {
        const words = message.split(" ");
        const correctedWords = words.map(word => commonMisspellings[word.toLowerCase()] || word);
        return correctedWords.join(" ");
    }

    function botResponse(userMessage) {
        let botMessage = "I'm here to assist you!";
        
        // Correct common misspellings
        const correctedMessage = correctSpelling(userMessage);
        const lowerMessage = correctedMessage.toLowerCase();
        const isQuestion = correctedMessage.includes("?");

        if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
            botMessage = "Hello! How can I assist you today?";
        } else if (lowerMessage.includes("how to submit complaint") || lowerMessage.includes("submit complaint") || lowerMessage.includes("complaint") || lowerMessage.includes("steps to submit complaint")) {
            botMessage = "Register yourself, log in as an end user, fill out the complaint registration form, and then submit it.";
        } else if (lowerMessage.includes("status") || lowerMessage.includes("check status") || lowerMessage.includes("complaint status") || lowerMessage.includes("how to check status of complaint") || lowerMessage.includes("how to check status of previously lodged complaint")) {
            botMessage = "To check your complaint status, log in as an end user and click the 'Previously Lodged Complaints' button.";
        } else if (lowerMessage.includes("contact") || lowerMessage.includes("reach you") || lowerMessage.includes("email") || lowerMessage.includes("how to reach you")) {
            botMessage = "You can reach us at civicissuesportal@gmail.com.";
        } else if (lowerMessage.includes("thank you") || lowerMessage.includes("thanks") || lowerMessage.includes("thank you so much")) {
            botMessage = "You're welcome! If you have any other questions, feel free to ask.";
        } else if (lowerMessage.includes("help") || lowerMessage.includes("assist")) {
            botMessage = "I'm here to help! You can ask me about submitting complaints, checking status, or contact details.";
        } else if (isQuestion) {
            botMessage = "That's a good question! Could you please provide more details so I can assist you better?";
        } else {
            botMessage = "I'm not sure how to answer that. Try asking about complaints, status, or contact details.";
        }

        appendMessage("Chatbot", botMessage, "bot");
    }
});
