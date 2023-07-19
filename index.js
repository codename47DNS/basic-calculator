// Html Elements
const btn = document.querySelectorAll(".calc-btn"),
answer = document.querySelector(".answer"),
equ = document.querySelector(".equ");

// Global Declaration
var originalEquation = "0",
userEquation = "0",
isResult = true,
i = 0;

// Add Actions
for(i = 0; i < btn.length;i++)
{
    btn[i].onclick = buttonUsed;
}

// Check Any Special Keys Used Or Not
function buttonUsed()
{
    if(!this.value)
    this.value = this.innerHTML;

    validateInput(this.value,this.innerHTML);
}

window.onkeydown = function(e)
{
    for(i = 0; i < btn.length;i++)
    {
        if(e.key == btn[i].value || e.key == btn[i].innerHTML || e.keyCode == 13 && btn[i].value == '=')
        {
            btn[i].click();
            return false;
        }
    }
}

function validateInput(originalValue,userValue)
{
    // Get Result
    if(originalValue == '=')
    {
        getResult();
        return false;
    }

    // Write Value To Display
    else
    {
        // Add White Space
        if(originalValue.match(/[\/ \* \- \+]/))
        {
            userValue = " "+userValue+" ";
            isResult = false;
        }

        // Check Result Or Not
        else if(isResult)
        {
            clearValues();
            isResult = false;
        }

        userEquation += userValue;
        originalEquation += originalValue;
    }

    // Prevent User To Add Multiple Operator(Divide,Plus,Minus And Multiplication)
    //originalEquation.replace(/[\/ \* \- \+][\/ \* \- \+]/,originalValue);

    originalEquation = originalEquation.replace(/[^\s \d][^\s \d]/,originalValue);
    userEquation = userEquation.replace(/[^\s \d]\s\s[^\s \d]/,userValue.trim());

    console.log(originalEquation.match(/[\d\D\d\.{2,}]*/g));

    answer.innerHTML = userEquation;
}

function clearValues()
{
    userEquation = "";
    originalEquation = "";
}

function getResult()
{
    const result = eval(originalEquation);
    
    equ.innerHTML = userEquation+" &equals;";

    userEquation = result;
    originalEquation = result;
    answer.innerHTML = result;

    isResult = true;
}