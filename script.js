const inputForm = document.forms[0];
const userDOB = document.querySelector("#user-dob");
const outputSec = document.querySelector(".output");
const imgLoading = document.querySelector(".loading-img");
console.log(inputForm);
inputForm.addEventListener('submit', () => {
    imgLoading.style.display = "block";
    let userDate = userDOB.value;
    birthDateArr = userDate.split('-');
    let birthYear = birthDateArr[0];
    let birthMonth = birthDateArr[1];
    let birthDate = birthDateArr[2];
    let flage = checkDates(birthYear, birthMonth, birthDate);
    setTimeout(()=>{if (flage) {
        console.log("true here", flage);
        showOutput(flage);
    } else {
        getNextPalindrome();
    }},3000)
})
// 2011/12/10
function checkDates(a, b, c) {
    let firstFormat = a + b + c;
    let secondFormat = c + b + a;
    // substr to removing part of string 
    let thirdFormat = b + c + a.substr(2);
    let fourthFormat = parseInt(b) + c + a;
    if (isPalindrome(firstFormat)) {
        return (`${a}-${b}-${c}`);
    } else if (isPalindrome(secondFormat)) {
        return (`${c}-${b}-${a}`);
    } else if (isPalindrome(thirdFormat)) {
        return (`${b}-${c}-${a.substring(2)}`);
    } else if (isPalindrome(fourthFormat)) {
        return (`${Number(b)}-${c}-${a}`);
    } else {
        return false;
    }
}


function isPalindrome(num) {
    let numArr = num.split('')
    let temp = numArr.reverse();
    let reverseNum = temp.join('');
    if (reverseNum === num) {
        return true;
    }

}

function showOutput(num) {
    imgLoading.style.display = "none";
    outputSec.style.visibility = "visible";
    outputSec.textContent = num;
}

function getNextPalindrome(){
   console.log();
}