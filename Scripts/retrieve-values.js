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

//IF USER CHANGES ANY INPUT VALUE ON DOM, UPDATE THE CLIENT OBJECT 
for(var i=0; i<userResponse.length; i++){ 
    userResponse[i].addEventListener("change", retrieveInput);
}
//If user changes household size, update client Object values
document.getElementById("householdSize").addEventListener("change", retrieveInput); 

//RetrieveInput function: update client Object values with user input
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



function test(){
    console.log(client); 
}
