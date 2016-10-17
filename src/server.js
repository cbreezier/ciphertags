import server from 'socket.io'

export default function startServer(store) {
  const io = new server().attach(8090);

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());

    // store.dispatch(action) is the standard invocation
    // We pass in store.dispatch as the function which accepts
    // one argument: the action received over the socket
    //
    // We bind the correct 'this' context for the store instead
    // of letting it inherit the current 'this'
    socket.on('action', (data) => {
      console.log('Received', data);
      store.dispatch.call(store, data);
      console.log('State is now', store.getState());
      console.log();
    });
  });
}
