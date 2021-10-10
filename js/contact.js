const form = document.querySelector("#contactform");
const magnus = document.querySelector("#name");
const nameerror = document.querySelector("#nameError");
const subject = document.querySelector("#subject");
const subjecterror = document.querySelector("#subjectError");
const email = document.querySelector("#email");
const emailerror = document.querySelector("#emailError");
const adress = document.querySelector("#adress");
const adresserror = document.querySelector("#adressError");
const button = document.querySelector("button");

function validateForm() {
  event.preventDefault();

  if(checkLength(name.value, 0) === true){
    nameerror.style.display ="none";
  }else {
    nameerror.style.display="block";
  }

  if(checkLength(subject.value, 0) === true){
    subjecterror.style.display ="none";
  }else { 
    subjecterror.style.display="block";
  }

    if(validateEmail(email.value) === true){
      emailerror.style.display = "none";
    }else {
      emailerror.style.display = "block";
    }

  if(checkLength(adress.value, 0) === true){
    adresserror.style.display ="none";
  }else {
    adresserror.style.display="block";
  }
}

form.addEventListener("submit", validateForm);

function checkLength(value,length){
  if(value.trim().length > length) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email){
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}