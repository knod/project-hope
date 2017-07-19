//CALCULATE ALL VALUES USED IN GET-ELIGIBILITY
    //--> calls resultsPageDisplay
        //--> calls getEligibility 
            //--> generates allotment amount
document.getElementById("netIncomeButton").addEventListener("click", eligibilityFunctions);
function eligibilityFunctions(){
    generateNetIncomeDeductions();  
    generateNetIncomeDeductionSum();  
    generateShelterDeductionSum();
    generateShelterDeductionLimit();
    generateFinalNetIncomeValue(); 
    getEligibility(); 
    displayResultsPage();
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