'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

class $Promise {
    constructor(executor) {
        // if (executor) console.dir(executor);
        this._state = 'pending';
        this._value = undefined;
        if (executor) executor(this._internalResolve.bind(this), this._internalReject.bind(this));
        this._handlerGroups = [];
    }
    _internalResolve(obj) {
        if (this._state === 'pending') {
            this._value = obj;
            this._state = 'fulfilled';
            while(this._handlerGroups && this._handlerGroups.length){
              this._handlerGroups.shift().successCb(this._value);
            }
        }
    }
    _internalReject(obj) {
        if (this._state === 'pending') {
            this._value = obj;
            this._state = 'rejected';
            console.log('HELLO????????????')
            while (this._handlerGroups && this._handlerGroups.length){
                let shifted = this._handlerGroups.shift().errorCb;
                console.log(shifted);
                if (shifted) shifted(this._value);
                else throw new Error();
            }
        }
    }

    //THEN METHOD
    then(success, error) {
        //handler groups
        if (typeof success !== 'function') {
            success = false;
        }
        if (typeof error !== 'function') {
            error = false;
        }
        this._handlerGroups.push({successCb: success, errorCb: error});

        if (this._state === "fulfilled"){
            this._handlerGroups.shift().successCb(this._value);
        } else if (this._state === 'rejected'){
            let shifted = this._handlerGroups.shift().errorCb;
            console.log('IN THEN');
            if (shifted) shifted(this._value);
            // else throw new Error();
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
