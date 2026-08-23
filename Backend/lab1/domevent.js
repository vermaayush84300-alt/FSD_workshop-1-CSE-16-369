import { EventEmitter } from "node:event";

function createDOMElement() {
    const emitter = new EventEmitter();
    return {
        addEventListener(eventName, callback) {
            emitter.on(eventName, callback);
        },
        removeEventListener(eventName, callback) {
            emitter.off(eventName, callback);
        },
        dispatchEvent(event) {
            emitter.emit(event.type, event);
        },
    };
}


const button = createDOMElement();
button.addEventListener('click', () => {
    console.log("button is clicked");


})

button.addEventListener('save', () => {
    console.log("content is saved");
})

function handleClick() {
    console.log("button clliked")
    console.log("saved")
}

button.addEventListener("click", handleClick);
button.addEventListener("save", handleClick);

button.dispatchEvent({
    type: "click",
});


button.dispatchEvent({
    type: "save",
});

button.removeEventListener("click", handleClick);


// button.removeEventListener("click", handleClick);
