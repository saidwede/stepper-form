var currentTab = 0; // Current tab is set to be the first tab (0)

showTab(currentTab);

function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    var j;
        for (j = 0; j < x.length; j++) {
            if(j<currentTab){
                x[j].style.transform = "translateX(-120%)";
            }else if(j > currentTab){
                x[j].style.transform = "translateX(120%)";
            }
            if(j == currentTab){
                x[j].style.display = "block";
            }else{
                x[j].style.display = "none";
            }
        }
    setTimeout(() =>{
        x[n].style.display = "block";
        x[n].style.transform = "translateX(0%)";
        // ... and fix the Previous/Next buttons:
        if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
        } else {
        document.getElementById("prevBtn").style.display = "inline";
        }
        if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Soumettre";
        } else {
        document.getElementById("nextBtn").innerHTML = "Continuer";
        }
        // ... and run a function that displays the correct step indicator:
        fixStepIndicator(n);
    }, 100);
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    // if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    // if (currentTab >= x.length) {
    //   //...the form gets submitted:
    //   document.getElementById("regForm").submit();
    //   return false;
    // }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        if(i <= currentTab){
            x[i].className = "step active-step";
        }else{
            x[i].className = "step";
        }
    }
    if(((currentTab+1)*72)<180){
        document.getElementById('rect1').style.transform = "rotate("+((currentTab+1)*72)+"deg)";
        document.getElementById('rect3').style.transform = "rotate("+180+"deg)";
        document.getElementById('rect2').style.display = "block";
    }else{
        document.getElementById('rect1').style.transform = "rotate("+180+"deg)";
        document.getElementById('rect2').style.display = "none";
        document.getElementById('rect3').style.transform = "rotate("+((currentTab+1)*72)+"deg)";
    }
    if(currentTab == 2){
        document.getElementById('rect1').style.transition = "none";
    }else{
        document.getElementById('rect1').style.transition = "transform 0.3s ease-in";
    }
    document.getElementById("stepNum").textContent = currentTab+1+" sur 5";

    var steTitles = document.getElementsByClassName("step-title");
    document.getElementById("currentStep").innerText = steTitles[currentTab].innerText;
    if(currentTab == 4){
        document.getElementById("nextStep").innerText = "Fin";
    }else{
        document.getElementById("nextStep").innerText = "suivant: "+steTitles[currentTab+1].innerText;
    }
    //... and adds the "active" class to the current step:
  }

  function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      // If a field is empty...
      if (y[i].value == "") {
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // and set the current valid status to false:
        valid = false;
      }
    }
    return valid; // return the valid status
  }
