//All values and logic referenced from: https://www.fns.usda.gov/snap/eligibility

//client object with values populated by user input
var client = {        
    senior: 0,         
    disabled: 0, 
    resources: 0, 
    householdSize: 0, 
    earnedIncome: 0, 
    benefitIncome: 0, 
    grossIncome: 0, 
}; 

//Net Income Deduction, Family Size
    //Size of deduction depends upon number of people in user's household
var deductionFamilySizeArray = [0, 157, 157, 157, 168, 197, 226];


//TO DO: Rename function. See netIncomeDeductionValuesGenerate as template. 
document.getElementById("resourceButton").addEventListener("click", genClientPropertyValueResources);
function genClientPropertyValueResources(){        
    client.senior = parseInt(document.querySelector('input[name="senior"]:checked').value);
    client.disabled = parseInt(document.querySelector('input[name="disabled"]:checked').value);
    client.resources = parseInt(document.querySelector('input[name="resourcesAmount"]:checked').value);
    console.log(client); 
    resourceEligibilityCheck(client); 
    resourceEligibilityDisplayMessage();
};
//TO DO: Rename function. See netIncomeDeductionValuesGenerate as template. 
document.getElementById("grossIncomeButton").addEventListener("click", genClientPropertyValueGrossIncome);
function genClientPropertyValueGrossIncome(){
    client.householdSize = parseInt(document.getElementById("householdSize").value);
    client.earnedIncome = parseInt(document.getElementById("earnedIncome").value);
    client.benefitIncome = parseInt(document.getElementById("benefitIncome").value);
    client.grossIncome = client.earnedIncome + client.benefitIncome; 
    grossIncomeLimitValue = Math.ceil(povertyLevelArray[client.householdSize]*1.3); //1.3 to set 130% of federal poverty level 
    grossIncomeEligibilityCheck(client); 
    grossIncomeEligibilityDisplayMessage(); 
}





































var deduction = {
    TwentyPercent: 0, 
    FamilySize: 0, 
    DependentCare: 0, 
    ChildSupport: 0, 
    MedExpense: 0,  
}

var shelterCostDeductionSum = 0; 
var netIncomeDeductionSum = 0; 





document.getElementById("netIncomeButton").addEventListener("click", genClientPropertyValueNetIncome);
function genClientPropertyValueNetIncome(){
    genClientPropertyValueGrossIncome(); 
    genDeductionPropertyValue();
    genNetIncomeDeductionSum();  
    genShelterDeductionSum();
    genShelterDeductionLimit();
    netIncomeValueGenerate(); 
    netIncomeEligibilityCheck(); 
    netIncomeEligibilityDisplayMessage();    
} 

function genDeductionPropertyValue(){
    deduction.TwentyPercent = parseInt(document.getElementById("earnedIncome").value*0.2); 
    deduction.FamilySize = parseInt(deductionFamilySizeArray[client.householdSize]); 
    deduction.DependentCare= parseInt(document.getElementById("deductionDependentCareValue").value);
    deduction.MedExpense = parseInt(document.getElementById("deductionMedicalExpenseValue").value);
    deduction.ChildSupport = parseInt(document.getElementById("deductionChildSupportValue").value);
    genMedicalExpenseDeductionSum(); //modifies value of deduction.MedExpense 
}; 

function genNetIncomeDeductionSum(){
    var deductionArray = Object.values(deduction);
    function getSum(total, num) {
    return total + num;
  }
  netIncomeDeductionSum = deductionArray.reduce(getSum);
};



function genMedicalExpenseDeductionSum(){  
    if(deduction.MedExpense > 35){
        deduction.MedExpense -= 35;  
    } else {
        deduction.MedExpenseMedExpense = 0; 
    }
}

/*Shelter Deduction*/
function genShelterDeductionSum(){
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

function genShelterDeductionLimit(){
    if(document.getElementById("seniorTrue").checked === true || document.getElementById("disabledTrue").checked === true ){
        return shelterCostDeductionSum; 
    } else if(shelterCostDeductionSum > 517) {
        shelterCostDeductionSum = 517; 
    } else {
        return shelterCostDeductionSum
    }
}

function netIncomeValueGenerate(){
    client.netIncome = client.grossIncome - netIncomeDeductionSum - shelterCostDeductionSum;
}


function allotmentValueGenerate(){
    var allotmentValue = maximumMonthlyAllotmentArray[client.householdSize] - Math.ceil((client.netIncome * 0.3));
    document.getElementById("allotmentValueMessage").innerHTML = allotmentValue;
}


            




//var maximumMonthlyAllotment = {
//    One: 194, 
//    Two: 357, 
//    Three: 511, 
//    Four: 649, 
//    Five: 771, 
//    Six: 925,
//    Seven: 1022, 
//    Eight: 1169,  
//}
//
//var maximumMonthlyAllotmentArray = [0, 
//                         maximumMonthlyAllotment.One, 
//                         maximumMonthlyAllotment.Two, 
//                         maximumMonthlyAllotment.Three, 
//                         maximumMonthlyAllotment.Four, 
//                         maximumMonthlyAllotment.Five, 
//                         maximumMonthlyAllotment.Six, 
//                         maximumMonthlyAllotment.Seven, 
//                         maximumMonthlyAllotment.Eight,
//                        ];





