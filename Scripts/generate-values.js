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


var deduction = {
    TwentyPercent: 0, 
    FamilySize: 0, 
    DependentCare: 0, 
    ChildSupport: 0, 
    MedExpense: 0,  
    ShelterCost: 0, 
}

var shelterCostDeductionSum = 0; 




//use map to sum values of deduction Object ? 
var netIncomeDeductionSum = deduction.TwentyPercent + deduction.FamilySize + deduction.DependentCare + deduction.MedExpense + deduction.ChildSupport; 

//TO DO: Rename function. See netIncomeDeductionValuesGenerate as template. 
document.getElementById("resourceButton").addEventListener("click", genClientPropertyValueResourcesGenerate);
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

document.getElementById("netIncomeButton").addEventListener("click", netIncomeDeductionValuesGenerate);
function netIncomeDeductionValuesGenerate(){
    genClientPropertyValueGrossIncome(); 
    deduction.TwentyPercent = parseInt(document.getElementById("earnedIncome").value*0.2); 
    deduction.FamilySize = parseInt(deductionFamilySizeArray[client.householdSize]); 
    deduction.DependentCare= parseInt(document.getElementById("deductionDependentCareValue").value);
    deduction.MedExpense = parseInt(document.getElementById("deductionMedicalExpenseValue").value);
    deduction.ChildSupport = parseInt(document.getElementById("deductionChildSupportValue").value);
    deduction.ShelterCost = shelterDeductionSumGenerate();
    netIncomeDeductionSumGenerate(); 
    //sum deduction Object to get a single value
}; 

//EXAMPLE CODE OF HOW TO SUM AN OBJECT'S VALUES
        //name of function once complete: function netIncomeDeductionSumGenerate();
//final line in this function is to then call netIncomeValueGenerate (), see function below 

//var deduction = {   
//    TwentyPercent: 10,
//    FamilySize: 20,
//    DependentCar: 40, 
//    MedExpense: 80, 
//    ChildSupport: 160,
//}
//var deductionArray = Object.values(deduction); 
//function sumDeductionArray (total, num) {
//    return total + num;
//}



    medicalExpenseDeductionSumGenerate();    
    shelterDeductionLimitGenerate(); 
    netIncomeValueGenerate();  
    netIncomeEligibilityCheck(); 
    netIncomeEligibilityDisplayMessage();
    }

//netIncomeDeductionSum = 
function medicalExpenseDeductionSumGenerate(){  
    if(deduction.MedExpense > 35){
        deduction.MedExpense -= 35;  
    } else {
        deduction.MedExpenseMedExpense = 0; 
    }
}

/*Shelter Deduction*/
function shelterDeductionSumGenerate(){
    client.netIncome = client.grossIncome - netIncomeDeductionSum;
    shelterCostDeductionSum = 0; //global variable used in netIncomeValueGenerate() function 
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

function shelterDeductionLimitGenerate(){
    if(document.getElementById("seniorTrue").checked === true || document.getElementById("disabledTrue").checked === true ){
        return shelterCostDeductionSum; 
    } else if(shelterCostDeductionSum > 517) {
        shelterCostDeductionSum = 517; 
    } else {
        return shelterCostDeductionSum
    }
}

function netIncomeValueGenerate(){
    console.log(client.grossIncome, netIncomeDeductionSum, shelterDeductionSum); 
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





