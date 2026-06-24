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
            // 3. Send the message to your AI Assistant backend
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Note: Ensure your OpenAI API key or backend endpoint proxy is safely configured
                    'Authorization': 'Bearer YOUR_OPENAI_API_KEY' 
                },
                body: JSON.stringify({
                    model: "gpt-4",
                    messages: [
                        {
                            role: "system", 
                            content: "You are the premium AI Assistant for FREQUENCY 528 IRON. You help customers design classic wrought iron yard ornaments, mailboxes, and heavy iron greenhouses. Match a modern, high-contrast, cinematic branding style. Be professional, direct, and creative."
                        },
                        { role: "user", content: message }
                    ]
                })
            });

            const data = await response.json();
            removeLoadingMessage(loadingId);

            if (data.choices && data.choices[0].message.content) {
                addMessage(data.choices[0].message.content, 'ai');
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
        
        // Match the styling to your black & gold high-contrast theme
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
