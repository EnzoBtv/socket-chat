//Make Connection
const socket = io.connect('http://localhost:3000');

//Query DOM
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

//Emit Events
btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = '';
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

//Listen for events
socket.on('chat', (data) => {
    output.innerHTML += `<p><strong>${data.handle}:</strong>${data.message}</p>`
    feedback.innerHTML = ''
});

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data} is typing a message...`
})