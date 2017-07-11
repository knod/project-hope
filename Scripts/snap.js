//client (ie user) Object
var client = {
    senior: 0,
    disabled: 0,
    householdSize: 1,
    earnedIncome: 0,
    benefitIncome: 0, 
    grossIncome: 0, 
    netIncome: 0,
    resources: 0,
}; 

/* vars and HTML IDs*/

/*Resources*/
var resourceEligibilityMessage = document.getElementById("resourceEligibilityMessage");
var resourceEligibilityEval = document.getElementById("resourceEligibilityEval");
var seniorOrDisabledMessage = document.getElementById("seniorOrDisabledMessage"); 
var resourceLimitMessage = document.getElementById("resourceLimitMessage"); 
var resourceEligibilityMessage_disqualifyingResources = document.getElementById("resourceEligibilityMessage_disqualifyingResources"); 
/*Gross Income*/
var grossIncomeEligibilityMessage = document.getElementById("grossIncomeEligibilityMessage");
var grossIncomeEligibilityEval = document.getElementById("grossIncomeEligibilityEval");
var householdNumberMessage = document.getElementById("householdNumberMessage"); 
var grossIncomeLimitMessage = document.getElementById("grossIncomeLimitMessage");  
var grossIncome = document.getElementById("grossIncome"); 
/*NET INCOME ELIGIBILITY*/ 
var netIncomeEligibilityMessage = document.getElementById("netIncomeEligibilityMessage");
var netIncomeEligibilityEval = document.getElementById("netIncomeEligibilityEval");
var netIncomeHouseholdNumberMessage = document.getElementById("netIncomeHouseholdNumberMessage");
var netIncomeLimitMessage = document.getElementById("netIncomeLimitMessage");
var netIncome = document.getElementById("netIncome");
var deductionFamilySizeArray = [0, 157, 157, 157, 168, 197, 226];

var inputTypeNumber = document.querySelectorAll('input[type=number]'); 
for(var i=0; i<inputTypeNumber.length; i++){
    inputTypeNumber[i]. defaultValue = 0; 
    
}
                                /*GROSS INCOME ELIGIBILITY*/
//Note: Household Poverty Levels may change over time, so one can modify the Object, while leaving the array and rest of code as is. 
//Object, values reflect 100% of federal poverty level relative to household size. 
var householdPovertyLevel = {
    One: 990, 
    Two: 1335, 
    Three: 1680, 
    Four: 2025, 
    Five: 2370, 
    Six: 2715,
    Seven: 3061, 
    Eight: 3408, 
}
//Array of householdPovertyLevel object.  
var povertyLevelArray = [0, 
                         householdPovertyLevel.One, 
                         householdPovertyLevel.Two, 
                         householdPovertyLevel.Three, 
                         householdPovertyLevel.Four, 
                         householdPovertyLevel.Five, 
                         householdPovertyLevel.Six, 
                         householdPovertyLevel.Seven, 
                         householdPovertyLevel.Eight,
                        ];

var maximumMonthlyAllotment = {
    One: 194, 
    Two: 357, 
    Three: 511, 
    Four: 649, 
    Five: 771, 
    Six: 925,
    Seven: 1022, 
    Eight: 1169,  
}

var maximumMonthlyAllotmentArray = [0, 
                         maximumMonthlyAllotment.One, 
                         maximumMonthlyAllotment.Two, 
                         maximumMonthlyAllotment.Three, 
                         maximumMonthlyAllotment.Four, 
                         maximumMonthlyAllotment.Five, 
                         maximumMonthlyAllotment.Six, 
                         maximumMonthlyAllotment.Seven, 
                         maximumMonthlyAllotment.Eight,
                        ];

document.getElementById("netIncomeButton").addEventListener("click",function() { 
    genClientPropertyValue();
    resourceEligibilityCheck();
    resourceEligibilityDisplayMessage();
    grossIncomeEligibilityCheck();
    grossIncomeEligibilityDisplayMessage();
    netIncomeDeductionSumGenerate();
    shelterDeductionSumGenerate(); 
    shelterDeductionLimitGenerate(); 
    netIncomeValueGenerate(); //Calculate the sum of deductions that can be applied to net income
    netIncomeEligibilityCheck();
    allotmentValueGenerate(); 
    netIncomeEligibilityDisplayMessage();
});

function genClientPropertyValue(){
    client.senior = parseInt(document.querySelector('input[name="senior"]:checked').value);
    client.disabled = parseInt(document.querySelector('input[name="disabled"]:checked').value);
    client.resources = parseInt(document.querySelector('input[name="resourcesAmount"]:checked').value);
    client.householdSize = parseInt(document.getElementById("householdSize").value);
    client.earnedIncome = parseInt(document.getElementById("earnedIncome").value);
    client.benefitIncome = parseInt(document.getElementById("benefitIncome").value);
    client.grossIncome = client.earnedIncome + client.benefitIncome;
    console.log(client); 
};

/*Resource Eligibility*/
function resourceEligibilityCheck(){
    if(client.resources == 3251){
        resourceEligible = false;
    } else if (client.resources == 3250 && client.senior == 1 || client.disabled == 1){  
        resourceEligible = true; 
    } else if (client.resources == 2250){
        resourceEligible = true; 
    } else {
        resourceEligible = false; 
    }
}


/*Gross Income Eligibility*/
function grossIncomeEligibilityCheck(){ 
    grossIncomeLimitValue = Math.ceil(povertyLevelArray[client.householdSize]*1.3);
    if (client.grossIncome <= grossIncomeLimitValue){
        grossIncomeEligible = true;
    }
    else {
        grossIncomeEligible = false;
    }
}

function netIncomeDeductionSumGenerate(){
    var deductionTwentyPercent = parseInt(document.getElementById("earnedIncome").value*0.2); 
    var deductionFamilySize = parseInt(deductionFamilySizeArray[client.householdSize]); 
    var deductionDependentCare= parseInt(document.getElementById("deductionDependentCareValue").value);
    var deductionChildSupport = parseInt(document.getElementById("deductionChildSupportValue").value);
    var deductionMedExpense = parseInt(document.getElementById("deductionMedicalExpenseValue").value);
    if(deductionMedExpense > 35){
        deductionMedExpense -= 35;  
    } else {
        deductionMedExpense = 0; 
    }
    netIncomeDeductionSum = deductionTwentyPercent + deductionFamilySize + deductionDependentCare + deductionMedExpense + deductionChildSupport; 
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
    client.netIncome = client.grossIncome - netIncomeDeductionSum - shelterCostDeductionSum;
}
function netIncomeEligibilityCheck(){
    netIncomeLimitValue = povertyLevelArray[client.householdSize];
    if (client.netIncome <= netIncomeLimitValue){
        netIncomeEligible = true;
    } else {
        netIncomeEligible = false;
    }
}
function allotmentValueGenerate(){
    var allotmentValue = maximumMonthlyAllotmentArray[client.householdSize] - Math.ceil((client.netIncome * 0.3));
    document.getElementById("allotmentValueMessage").innerHTML = allotmentValue;
}


                                