var resourceEligible = false; 
var grossIncomeEligible = false; 
var netIncomeEligible = false; 
var netIncomeLimitValue = 0; 


//User's net income limit will dependend upon total number of people in household, with values shown in householdPovertyLevel Object
//Values reflect 100% of federal poverty level based on household size. Valid through 9/30/2017
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

//Eligibility Check: Resources
function resourceEligibilityCheck(client){
    if(client.resources == 3251){
        resourceEligible = false;
    } else if (client.resources == 3250 && client.senior == 1 || client.disabled == 1){  
        resourceEligible = true; 
    } else if (client.resources == 2250){
        resourceEligible = true; 
    } else {
        resourceEligible = false; 
    }
    console.log(resourceEligible); 
    return resourceEligible; 
}

//Eligibility Check: Gross Income 
function grossIncomeEligibilityCheck(client){ 
    if (client.grossIncome <= grossIncomeLimitValue){
        grossIncomeEligible = true;
    }
    else {
        grossIncomeEligible = false;
    }
    return grossIncomeEligible;  
}

//Eligibility Check: Net Income
function netIncomeEligibilityCheck(){
    console.log(client); 
    netIncomeLimitValue = povertyLevelArray[client.householdSize];
    if (client.netIncome <= netIncomeLimitValue){
        netIncomeEligible = true;
    } else {
        netIncomeEligible = false;
    }
    return netIncomeEligible; 
}