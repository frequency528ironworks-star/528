// AI Design Assistant Chat Logic
document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // 1. Add user message to chat container
        addMessage(message, 'user');
        userInput.value = '';

        // 2. Add a loading/typing indicator for the AI
        const loadingId = addLoadingMessage();

        try {
            // 3. Send the message securely to your Formspree/Custom backend proxy
            const response = await fetch(https://formspree.io/f/maqgwqpy, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    _subject: "New AI Chat Assistant Interaction"
                })
            });

            removeLoadingMessage(loadingId);

            if (response.ok) {
                // If using a conversational webhook proxy, parse response text here.
                // For a temporary placeholder while your endpoint logic connects:
                addMessage("Thank you for sharing your vision! Our design center has received your request, and we will contact you shortly with your custom concepts.", 'ai');
            } else {
                addMessage("I'm having trouble connecting to my design center right now. Please try again!", 'ai');
            }

        } catch (error) {
            console.error('Error:', error);
            removeLoadingMessage(loadingId);
            addMessage("Connection error. Let's try that again.", 'ai');
        }
    }

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        
        if (sender === 'user') {
            msgDiv.style.background = 'rgba(212, 175, 55, 0.15)';
            msgDiv.style.border = '1px solid rgba(212, 175, 55, 0.3)';
            msgDiv.style.alignSelf = 'flex-end';
            msgDiv.style.maxWidth = '85%';
            msgDiv.style.padding = '8px 12px';
            msgDiv.style.borderRadius = '6px';
            msgDiv.style.color = '#ffffff';
        } else {
            msgDiv.style.background = '#161616';
            msgDiv.style.borderLeft = '2px solid #d4af37';
            msgDiv.style.alignSelf = 'flex-start';
            msgDiv.style.maxWidth = '85%';
            msgDiv.style.padding = '8px 12px';
            msgDiv.style.borderRadius = '6px';
            msgDiv.style.color = '#e8e8e8';
        }
        
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addLoadingMessage() {
        const id = 'loading-' + Date.now();
        const loadingDiv = document.createElement('div');
        loadingDiv.id = id;
        loadingDiv.style.background = '#161616';
        loadingDiv.style.alignSelf = 'flex-start';
        loadingDiv.style.padding = '8px 12px';
        loadingDiv.style.borderRadius = '6px';
        loadingDiv.style.color = '#888';
        loadingDiv.style.fontStyle = 'italic';
        loadingDiv.textContent = "Analyzing your vision...";
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return id;
    }

    function removeLoadingMessage(id) {
        const element = document.getElementById(id);
        if (element) element.remove();
    }
});
