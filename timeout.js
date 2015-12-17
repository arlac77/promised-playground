// Promise utilities: wait and timeout
var wait = function (ms) {
    return function waiting(v) {
        return new Promise(function (f, r) {setTimeout(f, ms, v);});
    };
};
var timeout = function (ms) {
    return new Promise(function (f, r) {setTimeout(r, ms, ms);});
};


// <<examples>>
// timeout promise
Promise.race([10, timeout(100)]).then(function (v) {
    console.log("success", v);
}, function (e) {
    console.log("timeout", e);
});

// wait promise
Promise.race([wait(50)(Promise.resolve(20)), timeout(100)]).then(function (v) {
    console.log("success", v);
}, function (e) {
    console.log("timeout", e);
});

// wait promise
Promise.race([
    Promise.resolve(30).then(wait(50)), timeout(100)
]).then(function (v) {
    console.log("success", v);
}, function (e) {
    console.log("timeout", e);
});


// wait timeout
Promise.race([
    wait(50)(Promise.resolve(40)), timeout(10)
]).then(function (v) {
    console.log("success", v);
}, function (e) {
    console.log("timeout", e);
});

// wait timeout
Promise.race([
    Promise.resolve(50).then(wait(50)), timeout(20)
]).then(function (v) {
    console.log("success", v);
}, function (e) {
    console.log("timeout", e);
});
