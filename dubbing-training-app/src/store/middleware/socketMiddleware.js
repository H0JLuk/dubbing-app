/**
* Allows you to register actions that when dispatched, send the action to the
* server via a socket.io socket.
* `criteria` may be a function (type, action) that returns true if you wish to send the
*  action to the server, array of action types, or a string prefix.
* the third parameter is an options object with the following properties:
* {
*   eventName,// a string name to use to send and receive actions from the server.
*   execute, // a function (action, emit, next, dispatch) that is responsible for
*            // sending the message to the server.
* }
*
*/
export default function createSocketIoMiddleware(socket, criteria = [],
    { eventName = 'action', execute = defaultExecute } = {}) {
    const emitBound = socket.emit.bind(socket);
    return ({ dispatch }) => {
        // Wire socket.io to dispatch actions sent by the server.
        socket.on(eventName, function(action) {
            dispatch(action);
            if (action.type === 'SEND_VOICE_URL') {
                fetch(action.payload)
                    .then(response => response.blob())
                    .then(function(myBlob) {
                        var objectURL = URL.createObjectURL(myBlob);
                        dispatch({ type: 'SET_VOICE', payload: objectURL });
                    });
            } else {
                dispatch(action)
            }
        });
        return next => (action) => {
            if (evaluate(action, criteria)) {
                return execute(action, emitBound, next, dispatch, eventName);
            }

            return next(action);
        };
    };

    function evaluate(action, option) {
        if (!action || !action.type) {
            return false;
        }

        const { type } = action;
        let matched = false;
        if (typeof option === 'function') {
            // Test function
            matched = option(type, action);
        } else if (typeof option === 'string') {
            // String prefix
            matched = type.indexOf(option) === 0;
        } else if (Array.isArray(option)) {
            // Array of types
            matched = option.some(item => type.indexOf(item) === 0);
        }
        return matched;
    }
}

function defaultExecute(action, emit, next, dispatch, eventName) { // eslint-disable-line no-unused-vars
    emit(eventName, action);
    return next(action);
}
