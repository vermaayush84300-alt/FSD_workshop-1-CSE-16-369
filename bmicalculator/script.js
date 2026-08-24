

function calculateBMI() {
    let weight = Number(document.getElementById("weight").value);
    let height = Number(document.getElementById("height").value);
    height = height / 100; // Convert cm to m
    let bmi = weight / (height * height);
    let result = "";
    if (bmi < 18.5) {
        result = "You are underweight.";
    }
    else if (bmi >= 18.5 && bmi < 25) {
        result = "You have a normal weight.";
    }
    else if (bmi >= 25 && bmi < 30) {
        result = "You are overweight.";
    }
    else {
        result = "You are obese.";
    }

    document.getElementById("answer").innerHTML = "Your BMI = " + bmi.toFixed(2) + "<br>" + result;
}