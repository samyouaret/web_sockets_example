const connection = new WebSocket("ws://localhost:8080");
const button = document.querySelector("#send");

connection.onopen = (event) => {
    console.log("WebSocket is open now.");
};

connection.onclose = (event) => {
    console.log("WebSocket is closed now.");
};

connection.onerror = (event) => {
    console.error("WebSocket error observed:", event);
};

connection.onmessage = (event) => {
    // append received message from the server to the DOM element 
    const chat = document.querySelector("#chat");
    console.log(event);
    data = JSON.parse(event.data);
    chat.innerHTML += `<p>${data.senderName}: ${data.message} <br><small>At : ${data.time}</small></p>`;
};

button.addEventListener("click", () => {
    const name = document.querySelector("#name");
    const message = document.querySelector("#message");
    let date = new Date();

    if (name.value.trim() == '' || message.value.trim() == '') {
        alert('please fill the fields');
        return;
    }
    const data = JSON.stringify({
        senderName: name.value,
        message: message.value,
        time: date.toString().substr(0, 31)
    });

    // Send composed message to the server
    connection.send(data);

    // clear input fields
    name.value = "";
    message.value = "";
});