'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

class $Promise {
    constructor(executor) {
        // if (executor) console.dir(executor);
        this._state = 'pending';
        this._value = null;
        if (executor) this._futureVal = executor();
    }
    _internalResolve(obj) {
        if (this._state === 'pending') {
            this._value = obj;
            this._state = 'fulfilled';
        }
    }
    _internalReject(obj) {
        if (this._state === 'pending') {
            this._value = obj;
            this._state = 'rejected';
        }
    }
}





/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/