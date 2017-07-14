//All values and logic referenced from: https://www.fns.usda.gov/snap/eligibility

var resourceEligible = false; 
var grossIncomeEligible = false; 
var netIncomeEligible = false; 
var netIncomeLimitValue = 0; 

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

//Eligibility Check: Gross Income and Net Income
//Both gross income eligibility and net income eligibility are determined by comparing the user's net income and household size (ie, number of people in household) against the federal poverty level for families of the same household size.
//Gross Income is compared to 130% of federal poverty level. 
//Net Income is compared to 100% of federal poverty level 
    //If the user has LESS THAN OR EQUAL to the limit, they are eligible
    //If the user has MORE THAN the limit, they are ineligible
//Limits are listed below

var householdPovertyLevel = { //for Gross Income, multiply value by 1.3
    One: 990,           //Example: net income limit of $990, ie 100% of federal poverty level, for a household size of one individual
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

//Eligibility Check: Gross Income 
function grossIncomeEligibilityCheck(client){ 
    if (client.grossIncome <= grossIncomeLimitValue){ //grossIncomeLimitValue 130% of federal poverty, see below, var householdPovertyLevel
        grossIncomeEligible = true;
    }
    else {
        grossIncomeEligible = false;
    }
    return grossIncomeEligible;  
}

//Eligibility Check: Net Income 
function netIncomeEligibilityCheck(){
    netIncomeLimitValue = povertyLevelArray[client.householdSize];
    if (client.netIncome <= netIncomeLimitValue){
        netIncomeEligible = true;
    } else {
        netIncomeEligible = false;
    }
    return netIncomeEligible; 
}

