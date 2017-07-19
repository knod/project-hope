//FUNCTIONS THAT DISPLAY NET INCOME DEDUCTION QUESTIONS 
//questions are dynamically hidden or displayed depending upon user input

//Dependent Care Deduction Display
//Disaplyed if user says "yes" they are working, receiving job training, or taking classes
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
//Displayed if user says "yes" to being legally obligated to paying child support
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
//Displayed if user has an elderly or disabled household member
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
//Displayed if user has elderly OR senior household member AND says "yes" to spending out of pocket medical expenses for that member. 
document.getElementById("medicalExpenseQuestion").addEventListener("click", displayMedicalExpenseFollowUp);
function displayMedicalExpenseFollowUp(){
    var deductionMedicalExpenseFollowUp = document.getElementById("deductionMedicalExpenseFollowUp");
    if (document.getElementById("medicalExpenseYes").checked == true){   
        deductionMedicalExpenseFollowUp.style.display = "initial"; 
    } else {
        deductionMedicalExpenseFollowUp.style.display = "none"
    }
};
//Shelter Cost Deduction Display 
//Toggles between asking for monthly rent payment, or monthly mortgage. 
//Sets value of non-selected item 0. 
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
