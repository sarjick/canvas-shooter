var Observable = function() {
    var me = this;

    me.events = [];
    me.listeners = [];
};

Observable.prototype.on = function(eventName, callback) {
    var me = this,
        e = {};

    e[eventName] = callback;
    me.events.push(e);

    if (!me.listeners) {
        me.listeners = [];        
    }
    else {
        if (me.listeners.indexOf(me) === -1) {
            me.listeners.push(me);
        }
    }
};

Observable.prototype.fire = function(eventName, data) {
    var me = this,
        listeners = me.listeners,
        currentEvents;

    for (var i = 0; i < listeners.length; i++) {
        currentEvents = listeners[i].events;

        for (var j = 0; j < currentEvents.length; j++) {
            if (typeof currentEvents[j][eventName] === "function") {
                currentEvents[j][eventName](data);
            }
        }
    }
};

Observable.prototype.unsubscribe = function(eventName) {
    var me = this,
        listeners = me.listeners,
        currentEvents;

    for (var i = 0; i < listeners.length; i++) {
        if (listeners[i] === me) {
            currentEvents = listeners[i].events;

            for (var j = 0; j < currentEvents.length; j++) {
                if (typeof currentEvents[j][eventName] === "function") {
                    currentEvents.splice(j, 1);
                }
            }

            if (currentEvents.length === 0) {
                listeners.splice(i, 1);
            }
        }
    }
};
