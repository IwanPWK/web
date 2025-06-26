
const socket = io("ws://localhost:3500");  // 2

const activity = document.querySelector('.activity') // 4
const msgInput = document.querySelector("input"); // 4

// 4
function sendMessage(e) {
  e.preventDefault(); //submit the form without reloading the page
  if (msgInput.value) {
    socket.emit('message', msgInput.value);
    msgInput.value = "";
  }
  msgInput.focus();
}

document.querySelector("form").addEventListener("submit", sendMessage); // 2

// 2 Listen for messages
socket.on("message", (data) => {
  activity.textContent = ""
  const li = document.createElement("li");
  li.textContent = data;
  document.querySelector("ul").appendChild(li);
});

// 4
msgInput.addEventListener('keypress', () => {
  socket.emit('activity', socket.id.substring(0, 5)) // 4 first five char to identify the current user
})

// 4
let activityTimer
socket.on("activity", name => {
  activity.textContent = `${name} is typing...`

  //Clear after 3 seconds
  clearTimeout(activityTimer)
  activityTimer = setTimeout(()=> {
    activity.textContent = ""
  }, 3000)
})