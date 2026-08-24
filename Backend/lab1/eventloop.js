console.log("start");

process.nextTick(() => {
    console.log("nextTick");
});

setTimeout(() => {
    console.log("first setTime out");
}, 9000);
setTimeout(() => {
    console.log("second setTime out");
}, 0);

setImmediate(() => {
    console.log("setImmidiate");
});

console.log("end");