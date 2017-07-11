function resourceEligibilityDisplayMessage(){
    if(client.resources == 3251){
        resourceEligibilityMessage.style.display = "none";
        resourceEligibilityMessage_disqualifyingResources.style.display = "initial"; 
    } else { 
        resourceEligibilityMessage.style.display = "initial";
        resourceEligibilityMessage_disqualifyingResources.style.display = "none";
        resourceEligibilityEval.innerHTML = (resourceEligible == true) ? "":" not";
        seniorOrDisabledMessage.innerHTML = (client.senior==1 || client.disabled==1) ? "":" do not";
        resourceLimitMessage.innerHTML =  (client.senior || client.disabled) ? "3,250":"2,250";
    }
}

function grossIncomeEligibilityDisplayMessage(){
    grossIncomeEligibilityMessage.style.display = "initial"; 
    grossIncomeEligibilityEval.innerHTML = (grossIncomeEligible == true) ? "":" not";
    grossIncomeLimitMessage.innerHTML = grossIncomeLimitValue; 
    householdNumberMessage.innerHTML = client.householdSize;
    grossIncome.innerHTML = client.grossIncome;
}

function netIncomeEligibilityDisplayMessage(){
    netIncomeEligibilityMessage.style.display = "initial"; 
    netIncomeEligibilityEval.innerHTML = (netIncomeEligible == true) ? "":" not";
    netIncomeLimitMessage.innerHTML = netIncomeLimitValue; 
    netIncomeHouseholdNumberMessage.innerHTML = client.householdSize;
    netIncome.innerHTML = client.netIncome;
}

/*Display Functions for Net Income Deduction Questions*/
//Dependent Care Deduction Display
document.getElementById("deductionDependentCareQuestion").addEventListener("click", displayDependentCareFollowUp);
function displayDependentCareFollowUp(){
    var deductionDependentCareFollowUp = document.getElementById("deductionDependentCareFollowUp");
    if(document.getElementById("workTrainingClassesYes").checked){
        deductionDependentCareFollowUp.style.display = "initial";
    } else {
        deductionDependentCareFollowUp.style.display = "none"
    }
}
//Child Support Deduction Display  
document.getElementById("deductionChildSupportQuestion").addEventListener("click", displayChildSupportFollowUp);
function displayChildSupportFollowUp(){
    var deductionChildSupportFollowUp = document.getElementById("deductionChildSupportFollowUp");
    if(document.getElementById("childSupportYes").checked){
        deductionChildSupportFollowUp.style.display = "initial";
    } else {
        deductionChildSupportFollowUp.style.display = "none";
    }
}
//Medical Expense Deduction Display, Question  
document.getElementById("questionDisabledStatus").addEventListener("click", displayMedicalExpenseQuestion);
document.getElementById("questionSeniorStatus").addEventListener("click", displayMedicalExpenseQuestion);
function displayMedicalExpenseQuestion(){
    var medicalExpenseQuestion = document.getElementById("medicalExpenseQuestion");
    if (document.getElementById("seniorTrue").checked == true || document.getElementById("disabledTrue").checked == true){   
        medicalExpenseQuestion.style.display = "initial"; 
    } else {
        medicalExpenseQuestion.style.display = "none"
    }
};

//Medical Expense Deduction Display, Follow Up
document.getElementById("medicalExpenseQuestion").addEventListener("click", displayMedicalExpenseFollowUp);
function displayMedicalExpenseFollowUp(){
    var deductionMedicalExpenseFollowUp = document.getElementById("deductionMedicalExpenseFollowUp");
    if (document.getElementById("medicalExpenseYes").checked == true){   
        deductionMedicalExpenseFollowUp.style.display = "initial"; 
    } else {
        deductionMedicalExpenseFollowUp.style.display = "none"
    }
};
medicalExpenseYes

var deductionMedExpenseFollowUp = deductionMedExpenseFollowUp



//Shelter Cost Deduction Display   
document.getElementById("shelterRentOrOwnQuestion").addEventListener("click", rentOrOwnDisplayFollowUp )
function rentOrOwnDisplayFollowUp(){
    if(document.getElementById("rentResponse").checked){
        document.getElementById("rentFollowUp").style.display = "initial";
        document.getElementById("ownFollowUp").style.display = "none";
        document.getElementById("shelterMortgageCost").value = 0; 
        document.getElementById("shelterHomeTaxesCost").value = 0; 
    } else if (document.getElementById("ownResponse").checked){
        document.getElementById("ownFollowUp").style.display = "initial";
        document.getElementById("rentFollowUp").style.display = "none";
        document.getElementById("shelterRentCost").value = 0;       
    } else {
        document.getElementById("rentFollowUp").style.display = "none";
        document.getElementById("ownFollowUp").style.display = "none";
        document.getElementById("shelterRentCost").value = 0;
        document.getElementById("shelterMortgageCost").value = 0; 
        document.getElementById("shelterHomeTaxesCost").value = 0;
    }
}












