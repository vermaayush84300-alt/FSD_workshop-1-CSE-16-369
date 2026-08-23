//    event emitter emmit on off 

import { EventEmitter } from "node:events";
const task = new EventEmitter();
task.on("greet", (name) => {
    console.log(`hello , ${name}! Welcome to the session`);
});

task.on('exit', (reason) => {
    console.log(`Session ending.reason: ${reason}`);
});
task.on('greet', () => {
    console.log(" Class started by chandrahas mishra");
});
task.on('exit', () => {
    console.log("class finished by fsd teacher");
});

task.on("start", (course) => {
    console.log(`Now new era begin ${course}`);
});

task.emit("greet", "Student");
task.emit("exit", "class completed");
task.emit("start", " class start")