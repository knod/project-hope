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
        //Net income eligibility is determined by comparing the user's net income and household size (ie, number of people in household) against 100% of the federal poverty level for families of the same household size.   
        //If the user has LESS THAN OR EQUAL to the limit, they are eligible
        //If the user has MORE THAN the limit, they are ineligible
        //Limits are listed below
var householdPovertyLevel = {
    One: 990,           //net income limit for a household of one
    Two: 1335,          //net income limit for a household of two
    Three: 1680,        //net income limit for a household of three
    Four: 2025,         //net income limit for a household of four
    Five: 2370,         //net income limit for a household of five
    Six: 2715,          //net income limit for a household of six
    Seven: 3061,        //net income limit for a household of seven
    Eight: 3408,        //net income limit for a household of eight
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

function netIncomeEligibilityCheck(){
    netIncomeLimitValue = povertyLevelArray[client.householdSize];
    if (client.netIncome <= netIncomeLimitValue){
        netIncomeEligible = true;
    } else {
        netIncomeEligible = false;
    }
    return netIncomeEligible; 
}

