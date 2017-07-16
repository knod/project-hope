//All values and logic referenced from: https://www.fns.usda.gov/snap/eligibility
var deduction = {
    TwentyPercent: 0, 
    FamilySize: 0, 
    DependentCare: 0, 
    ChildSupport: 0, 
    MedExpense: 0,  
}
var shelterCostDeductionSum = 0; 
var netIncomeDeductionSum = 0; 

//Net Income Deduction, Family Size: Value depends upon user's household size
var deductionFamilySizeArray = [0, 157, 157, 157, 168, 197, 226];

//All number inputs have the default value of 0
var userResponse = document.getElementsByTagName("input");
for(var i=0; i<userResponse.length; i++){ 
    if(userResponse[i].type=="number"){
        userResponse[i].defaultValue = 0;
    } else if(userResponse[i].type=="radio"){
        userResponse[i].checked = true; 
    }
}

//If user changes input value, fire retrieveInput function   
for(var i=0; i<userResponse.length; i++){ 
    userResponse[i].addEventListener("change", retrieveInput);
}
//If user changes household size, fire retrieveInput function 
document.getElementById("householdSize").addEventListener("change", retrieveInput); 

//RetrieveInput function: Update client Object with user inputs
function retrieveInput(){
    client.senior = parseInt(document.querySelector('input[name="senior"]:checked').value);
        client.disabled = parseInt(document.querySelector('input[name="disabled"]:checked').value);
        client.resources = parseInt(document.querySelector('input[name="resourcesAmount"]:checked').value);
        client.householdSize = parseInt(document.getElementById("householdSize").value);
        client.earnedIncome = parseInt(document.getElementById("earnedIncome").value);
        client.benefitIncome = parseInt(document.getElementById("benefitIncome").value);
        client.grossIncome = client.earnedIncome + client.benefitIncome; 
        grossIncomeLimitValue = Math.ceil(povertyLevelArray[client.householdSize]*1.3); //1.3 to set 130% of federal poverty level
    console.log(client);
}

document.getElementById("netIncomeButton").addEventListener("click", eligibilityFunctions);
function eligibilityFunctions(){
    generateNetIncomeDeductions();  
    generateNetIncomeDeductionSum();  
    generateShelterDeductionSum();
    generateShelterDeductionLimit();
    generateFinalNetIncomeValue();   
    getEligibility(); 
    displayEligibility();
    allotmentValueGenerate(); 
} 

function generateNetIncomeDeductions(){
    deduction.TwentyPercent = parseInt(document.getElementById("earnedIncome").value*0.2); 
    deduction.FamilySize = parseInt(deductionFamilySizeArray[client.householdSize]); 
    deduction.DependentCare= parseInt(document.getElementById("deductionDependentCareValue").value);
    deduction.MedExpense = parseInt(document.getElementById("deductionMedicalExpenseValue").value);
    deduction.ChildSupport = parseInt(document.getElementById("deductionChildSupportValue").value);
    generateMedicalExpenseDeduction(); //modifies value of deduction.MedExpense 
};
function generateMedicalExpenseDeduction(){  
    if(deduction.MedicalExpense > 35){
        deduction.MedicalExpense -= 35;  
    } else {
        deduction.MedicalExpense = 0; 
    }
}

function generateNetIncomeDeductionSum(){
    var deductionArray = Object.values(deduction);
    function getSum(total, num) {
        return total + num;
    }
    netIncomeDeductionSum = deductionArray.reduce(getSum);
};

/*Shelter Deduction*/
function generateShelterDeductionSum(){
    client.netIncome = client.grossIncome - netIncomeDeductionSum;
    var shelterCostSum = 0; //local variable used to determine global shelterCostDeductionSum
    var shelterInput = document.getElementsByClassName("shelterInput"); 
    for(var i=0; i<shelterInput.length; i++){
        shelterCostSum += parseInt(shelterInput[i].value);
    }
    if(shelterCostSum < client.netIncome * 0.5){
        shelterCostDeductionSum = 0; 
    } else {
        shelterCostDeductionSum += shelterCostSum - (client.netIncome * 0.5)  
    } 
}

function generateShelterDeductionLimit(){
    if(document.getElementById("seniorTrue").checked === true || document.getElementById("disabledTrue").checked === true ){
        return shelterCostDeductionSum; 
    } else if(shelterCostDeductionSum > 517) {
        shelterCostDeductionSum = 517; 
    } else {
        return shelterCostDeductionSum
    }
}

function generateFinalNetIncomeValue(){
    client.netIncome = client.grossIncome - netIncomeDeductionSum - shelterCostDeductionSum;
}