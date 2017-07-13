var resourceEligible = false; 
var grossIncomeEligible = false; 

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
    console.log("t"); 
    if (client.grossIncome <= grossIncomeLimitValue){
        grossIncomeEligible = true;
    }
    else {
        grossIncomeEligible = false;
    }
    return grossIncomeEligible;  
}