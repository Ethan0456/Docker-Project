
const socket = io("http://127.0.0.1:5000")


export function receiveData() {
  socket.on('connect', function () {
    console.log('Connected to server');
  });

  socket.on('data', function (data) {
    console.log('Data received:', data);
    setTimeout(10000)
  });

  socket.on('disconnect', function () {
    console.log('Disconnected from server');
  });
}
