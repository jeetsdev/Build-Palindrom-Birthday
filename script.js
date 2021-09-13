const inputForm = document.forms[0];
const userDOB = document.querySelector("#user-dob");
const outputSec = document.querySelector(".output");
const imgLoading = document.querySelector(".loading-img");

const dayesInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

inputForm.addEventListener('submit', () => {
    outputSec.style.display = 'none';
    imgLoading.style.display = "block"; // Show the loading 
    let userDate = userDOB.value;
    birthDateArr = userDate.split('-');
    let birthYear = birthDateArr[0];
    let birthMonth = birthDateArr[1];
    let birthDate = birthDateArr[2];
    setTimeout(() => {
        setDates(birthYear, birthMonth, birthDate);
    }, 4000);
})

function setDates(birthYear, birthMonth, birthDate) {
    let temp = checkDates(birthYear, birthMonth, birthDate);
    setTimeout(() => {
        if (temp) {
            let outputText = `Yay !!! Your birthdate in ${temp} format is a Palindrome number.`;
            showOutput(outputText);
        } else {
            let nextPalindromeNum = getNextPalindrome(birthYear, birthMonth, birthDate);
            let outputText = `Oops !!! Your birthdate is not a Palindrome number. The nearest Palindrome number is ${nextPalindromeNum[0]}, Just ${nextPalindromeNum[1]} days ${nextPalindromeNum[2]} your birthDate.`;
            showOutput(outputText);
        }
    }, 0)
}

function checkDates(y, m, d) {
    let firstFormat = y + m + d;
    let secondFormat = d + m + y;
    // substr to removing part of string 
    let thirdFormat = m + d + y.substr(2);
    let fourthFormat = parseInt(m) + d + y;
    if (isPalindrome(firstFormat)) {
        return (`${y}-${m}-${d}`);
    } else if (isPalindrome(secondFormat)) {
        return (`${d}-${m}-${y}`);
    } else if (isPalindrome(thirdFormat)) {
        return (`${m}-${d}-${y.substr(2)}`);
    } else if (isPalindrome(fourthFormat)) {
        return (`${parseInt(m)}-${d}-${y}`);
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

function showOutput(text) {
    imgLoading.style.display = "none";
    outputSec.style.display = "block";
    outputSec.textContent = text;
}

function getNextPalindrome(y, m, d) {
    let yearForward = parseInt(y);
    let monthForward = parseInt(m);
    let dayForward = parseInt(d);
    let yearBack = parseInt(y);
    let monthBack = parseInt(m);
    let dayBack = parseInt(d);
    for (let index = 1; index > 0; index++) {

        //! Forward checking...

        dayForward = dayForward + 1;
        if (dayForward > dayesInMonths[monthForward - 1]) {
            dayForward = 1;
            monthForward += 1;
            if (monthForward > 12) {
                yearForward += 1;
                monthForward = 1;
            }
        }
        let yearForwardStr = yearForward.toString();
        let monthForwardStr = monthForward.toString();
        let dayForwardStr = dayForward.toString();
        if (monthForwardStr.length === 1) {
            monthForwardStr = "0" + monthForwardStr;
        }
        if (dayForwardStr.length === 1) {
            dayForwardStr = "0" + dayForwardStr;
        }
        let nextDate = checkDates(yearForwardStr, monthForwardStr, dayForwardStr);
        if (nextDate) {
            console.log(`${nextDate},${index}`)
            return [`${nextDate}`, index, "After"];
        }

        //! Backward checking...

        dayBack -= 1;
        console.log("In backward sec");
        if (dayBack < 1) {
            monthBack -= 1;
            if (monthBack < 1) {
                monthBack = 12;
                yearBack -= 1;
                if (yearBack < 1) {
                    dd
                    break;
                }
            }
            dayBack = dayesInMonths[monthBack - 1]; // setting backDates
        }
        let yearBackStr = yearBack.toString();
        let monthBackStr = monthBack.toString();
        let dayBackStr = dayBack.toString();
        if (monthBackStr.length === 1) {
            monthBackStr = "0" + monthBackStr;
        }
        if (dayBackStr.length === 1) {
            dayBackStr = "0" + dayBackStr;
        }
        let backDate = checkDates(yearBackStr, monthBackStr, dayBackStr);
        if (backDate) {
            console.log(`${backDate},${index}`)
            return [`${backDate}`, index, "Earlier"];
        }
    }
}