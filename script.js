// importing elements ;
const submitBtn = document.querySelector('#submit-btn-fancy')
const form = document.querySelector('#date-form');
const dayInput = document.querySelector('#day-input');
const monthInput = document.querySelector('#month-input');
const yearInput = document.querySelector('#year-input');
const output = document.querySelector('#output');

const errorMsg = document.querySelectorAll('.error-msg');
const dayInputForStyle = document.querySelector('.day-input-box');
const monthInputForStyle = document.querySelector('.month-input-box');
const yearInputForStyle = document.querySelector('.year-input-box');

const yearsOutput = document.querySelector("#years-output")
const monthsOutput = document.querySelector("#months-output")
const daysOutput = document.querySelector("#days-output")
let isError = false;

// onSubmit 
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();

  // Clear previous errors
  clearErrors();
 
//   check the values are Null or NOt null
  if (!dayInput.value || !monthInput.value || !yearInput.value){
    alert('All fields are required!');
  }else {
    // checking is that valid year 
    const currentYear = new Date().getFullYear();
    if (Number(yearInput.value) > currentYear) {
    setError(yearInputForStyle, errorMsg[2]);
    }

    // checking month innput 
    if (monthInput.value > 12) {
        setError(monthInputForStyle, errorMsg[1]);
    }


    // february Hell
    const date = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
    if (date.getDate() != dayInput.value || (monthInput.value == 2 && dayInput.value > 29) || (monthInput.value == 2 && dayInput.value == 29 && !isLeapYear(yearInput.value))) {
        setError(dayInputForStyle, errorMsg[0]);
    }
     }
    //  end of february Hell

    // else:) .finally
    const date = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
    const age = calAge(date);
    if(!isError){
        setOutput(yearsOutput , age.years , "years")
        setOutput(monthsOutput , age.months , "months")
        setOutput(daysOutput , age.days , "days")
        }
});

// clear errors 
dayInput.addEventListener('input', clearErrors);
monthInput.addEventListener('input', clearErrors);
yearInput.addEventListener('input', clearErrors);

// set output

function setOutput(element , value , yearMonthOrDay){
    element.innerHTML = `<span class="output"> ${value} </span> ${yearMonthOrDay}`
}
setOutput(yearsOutput , "--" , 'years' )
setOutput(monthsOutput ,"--" , 'months')
setOutput(daysOutput , "--" , 'days')


// set Error to the Elements
function setError(element, errorMsg) {
    isError=true;
  element.classList.add('input-error');
  errorMsg.style.visibility = 'visible';
}


// clear error for new Inputs
function clearErrors() {
  dayInputForStyle.classList.remove('input-error');
  monthInputForStyle.classList.remove('input-error');
  yearInputForStyle.classList.remove('input-error');
  errorMsg.forEach((msg) => {
    msg.style.visibility = 'hidden';
  });
}


// checking the given year is leap year or not
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}


// calculating the age
function calAge(date) {
    const now = new Date();
    let years = now.getFullYear() - date.getFullYear();
    let months = now.getMonth() - date.getMonth();
    let days = now.getDate() - date.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }
    
    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    return { years, months, days };
}