document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');
    const taskList = document.getElementById('task-list');
    const startVPSButton = document.getElementById('start-vps');
    const stopVPSButton = document.getElementById('stop-vps');
    const restartVPSButton = document.getElementById('restart-vps');

    let socket = null;

    function connectWebSocket() {
        socket = new WebSocket('ws://localhost:8000/ws');

        socket.onopen = () => {
            console.log('WebSocket connection established.');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'task_update') {
                updateTask(data.task_id, data.status);
            } else if (data.type === 'chat_response') {
                displayBotMessage(data.message);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed. Attempting to reconnect...');
            setTimeout(connectWebSocket, 3000); // Reconnect after 3 seconds
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    connectWebSocket();

    sendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            displayUserMessage(message);
            sendMessage(message);
            chatInput.value = '';
        }
    });

    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });

    startVPSButton.addEventListener('click', () => {
        sendVPSCommand('start');
    });

    stopVPSButton.addEventListener('click', () => {
        sendVPSCommand('stop');
    });

    restartVPSButton.addEventListener('click', () => {
        sendVPSCommand('restart');
    });

    function sendMessage(message) {
        fetch('/api/v1/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        })
        .then(response => response.json())
        .then(data => {
            // Handle response (e.g., display bot message)
            console.log('Chat response:', data);
           // displayBotMessage(data.response);
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
    }

    function sendVPSCommand(command) {
        fetch(`/api/v1/vps/${command}`, {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            console.log(`VPS ${command} command response:`, data);
            addTask(data.task_id, `VPS ${command}`);
        })
        .catch(error => {
            console.error(`Error sending ${command} command:`, error);
        });
    }

    function displayUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function displayBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'bot');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addTask(taskId, taskName) {
        const taskItem = document.createElement('li');
        taskItem.id = `task-${taskId}`;
        taskItem.textContent = `${taskName} (Pending)`;
        taskList.appendChild(taskItem);
    }

    function updateTask(taskId, status) {
        const taskItem = document.getElementById(`task-${taskId}`);
        if (taskItem) {
            taskItem.textContent = `${taskItem.textContent.split(' (')[0]} (${status})`;
        }
    }
});