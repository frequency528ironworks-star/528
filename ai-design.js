// AI Design Assistant Chat
document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');

    // Sample AI responses for demonstration
    const aiResponses = [
        "That sounds like a beautiful project! Tell me more about the style you're envisioning.",
        "Great idea! What dimensions are you thinking for this piece?",
        "I love that! Would you prefer a modern or ornate style?",
        "Excellent choice! What's the primary location for this installation?",
        "That's very creative! What colors or finishes appeal to you?",
        "Fantastic! Do you have any inspiration images or references?",
        "I can definitely help with that! When are you looking to complete this project?",
        "Our team can absolutely create that for you! Would you like to move forward with a design package?"
    ];

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        
        if (message === '') return;

        // Add user message to chat
        addMessage(message, 'user-message');
        userInput.value = '';

        // Simulate AI response delay
        setTimeout(() => {
            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            addMessage(randomResponse, 'ai-message');
        }, 500);
    }

    function addMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${className}`;
        messageDiv.innerHTML = `<p>${escapeHtml(text)}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
