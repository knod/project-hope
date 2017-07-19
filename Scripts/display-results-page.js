//enter 0 as default value for all text input fields
var inputTypeNumber = document.querySelectorAll('input[type=number]'); 
for(var i=0; i<inputTypeNumber.length; i++){
    inputTypeNumber[i]. defaultValue = 0; 
}

//HTML IDs AND THEIR VARIABLE NAMES: Resources
var resourceEligibilityMessage = document.getElementById("resourceEligibilityMessage");
var resourceEligibilityEval = document.getElementById("resourceEligibilityEval");
var seniorOrDisabledMessage = document.getElementById("seniorOrDisabledMessage"); 
var resourceLimitMessage = document.getElementById("resourceLimitMessage"); 
var resourceEligibilityMessage_disqualifyingResources = document.getElementById("resourceEligibilityMessage_disqualifyingResources"); 

//HTML IDs AND THEIR VARIABLE NAMES: Gross Income
var grossIncomeEligibilityMessage = document.getElementById("grossIncomeEligibilityMessage");
var grossIncomeEligibilityEval = document.getElementById("grossIncomeEligibilityEval");
var householdNumberMessage = document.getElementById("householdNumberMessage"); 
var grossIncomeLimitMessage = document.getElementById("grossIncomeLimitMessage");  
var grossIncome = document.getElementById("grossIncome"); 

//HTML IDs AND THEIR VARIABLE NAMES: Net Income 
var netIncomeEligibilityMessage = document.getElementById("netIncomeEligibilityMessage");
var netIncomeEligibilityEval = document.getElementById("netIncomeEligibilityEval");
var netIncomeHouseholdNumberMessage = document.getElementById("netIncomeHouseholdNumberMessage");
var netIncomeLimitMessage = document.getElementById("netIncomeLimitMessage");
var netIncome = document.getElementById("netIncome");



function displayResultsPage(){
    document.getElementById("intakePage").style.display = "none"; 
    document.getElementById("resultsPage").style.display = "initial";
    displayEligibilityDetails(); 
}

function displayEligibilityDetails(){
    var finalEligibilityEval = document.getElementById("finalEligibilityEval");
    if (resourceEligible == true && grossIncomeEligible == true && netIncomeEligible == true){
        finalEligibilityEval.innerHTML = "";
    } else {
        finalEligibilityEval.innerHTML = "not";
        ineligibilityExplainer(); 
    }
}

function ineligibilityExplainer(){
    document.getElementById("allotmentContainer").style.display="none"; 
    document.getElementById("ineligibilityExplainerContainer").style.display="initial"; 
    resourceIneligibilityExplainer(); 
    grossIncomeIneligibilityExplainer(); 
    netIncomeIneligibilityExplainer(); 
}

function resourceIneligibilityExplainer(); {
    //use conditionals to check IF resource eligible
        //IF true return
        //IF false, explain ineligibility to user
}

function grossIncomeIneligibilityExplainer();{
    //use conditionals to check IF resource eligible
    //IF true return
    //IF false, explain ineligibility to user
} 

function netIncomeIneligibilityExplainer();{
    //use conditionals to check IF resource eligible
    //IF true return
    //IF false, explain ineligibility to user
}




//FUNCTION CALLS HELPER FUNCTIONS THAT DISPLAY ELIGIBILITY TO USER
//function displayEligibility(){
//    resultsPageDisplay(); 
//    resourceEligibilityDisplayMessage();
//    grossIncomeEligibilityDisplayMessage();
//    netIncomeEligibilityDisplayMessage()
//}
//HELPER FUNCTIONS THAT DISPLAY ELIGIBILITY STATUS, BY CATEGORY, TO THE USER: 
//Eligibility Criteria: Resources
//function resourceEligibilityDisplayMessage(){
//    if(client.resources == 3251){
//        resourceEligibilityMessage.style.display = "none";
//        resourceEligibilityMessage_disqualifyingResources.style.display = "initial"; 
//    } else { 
//        resourceEligibilityMessage.style.display = "initial";
//        resourceEligibilityMessage_disqualifyingResources.style.display = "none";
//        resourceEligibilityEval.innerHTML = (resourceEligible == true) ? "":" not";
//        seniorOrDisabledMessage.innerHTML = (client.senior==1 || client.disabled==1) ? "":" do not";
//        resourceLimitMessage.innerHTML =  (client.senior || client.disabled) ? "3,250":"2,250";
//    }
//}
//
////FUNCTIONS THAT DISPLAY ELIGIBILITY STATUS TO THE USER:Gross Income
// Eligibility Criteria:
//function grossIncomeEligibilityDisplayMessage(){
//    grossIncomeEligibilityMessage.style.display = "initial"; 
//    grossIncomeEligibilityEval.innerHTML = (grossIncomeEligible == true) ? "":" not";
//    grossIncomeLimitMessage.innerHTML = grossIncomeLimitValue; 
//    householdNumberMessage.innerHTML = client.householdSize;
//    grossIncome.innerHTML = client.grossIncome;
//}
//
////FUNCTIONS THAT DISPLAY ELIGIBILITY STATUS TO THE USER:Net Income
//Eligibility Criteria:
//function netIncomeEligibilityDisplayMessage(){
//    netIncomeEligibilityMessage.style.display = "initial"; 
//    netIncomeEligibilityEval.innerHTML = (netIncomeEligible == true) ? "":" not";
//    netIncomeLimitMessage.innerHTML = netIncomeLimitValue; 
//    netIncomeHouseholdNumberMessage.innerHTML = client.householdSize;
//    netIncome.innerHTML = client.netIncome;
//}
//
