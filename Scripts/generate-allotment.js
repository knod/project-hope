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

function allotmentValueGenerate(){
    var allotmentValue = maximumMonthlyAllotmentArray[client.householdSize] - Math.ceil((client.netIncome * 0.3));
    document.getElementById("allotmentValueMessage").innerHTML = allotmentValue;
}

