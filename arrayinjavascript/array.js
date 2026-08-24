// arr = [1, 2, 3, 4, 5];
// console.log(arr[0]); // Output: 1
// n = arr.length;
// console.log(n); // Output: 5
// arr.push(6);
// console.log(arr);
// arr.pop();
// console.log(arr);
// arr.shift();
// console.log(arr);
// arr.unshift(0);
// console.log(arr);

// arr = [1, 2, 3, 4, 5];
// // console.log(arr);

// // brr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
// // console.log(brr);

// //for of loop
// for (let i of arr) {
//     console.log(i);
// }

let x = document.getElementById("ele1");
x.addEventListener("click", function () {
    x.style.color = "yellow";
    x.style.backgroundColor = "red";
})

let y = document.getElementById("ele2");
y.addEventListener("mousemove", function () {
    y.style.color = "blue";
    y.style.backgroundColor = "aqua";
})

y.addEventListener("mouseleave", function () {
    y.style.color = "black";
    y.style.backgroundColor = "white";
})

let z = document.getElementById("ele3");
z.addEventListener("click", function () {
    z.style.color = "white";
    z.style.backgroundColor = "purple";
})

z.addEventListener("click", function () {
    x.style.color = "yellow";
    x.style.backgroundColor = "red";
    x.innerHTML = "AYUSH"
})