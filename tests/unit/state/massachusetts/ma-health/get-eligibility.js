//14901, 1 -> income level is 1
//15529, 1 -> income level is 2
//60000, 5 -> income level is 2
//120277, 8 -> income level is 3
//120277, 4 -> income level is 4

QUnit.module("Function getIncomeLevel:");
QUnit.test( "income level on the boundary", function( assert ) {
  assert.equal( getIncomeLevel({ annualHouseholdIncome: 14901, householdSize: 1 }), 1, "Passed!" );
});

QUnit.test( "income level on the upper boundary", function( assert ) {
  assert.equal( getIncomeLevel({ annualHouseholdIncome: 15529, householdSize: 1 }), 2, "Passed!" );
});

QUnit.test( "midrange income", function( assert ) {
  assert.equal( getIncomeLevel({ annualHouseholdIncome: 60000, householdSize: 5 }), 2, "Passed!" );
});

QUnit.test( "extreme values", function( assert ) {
  assert.equal( getIncomeLevel({ annualHouseholdIncome: 120277, householdSize: 8 }), 3, "Passed!" );
});

QUnit.test( "same income, half size family should return higher value", function( assert ) {
  assert.equal( getIncomeLevel({ annualHouseholdIncome: 120277, householdSize: 4 }), 4, "Passed!" );
});

QUnit.module("Function getEligibility:");
QUnit.test("Original example", function(assert) {
  input = {householdSize: 3,
           annualHouseholdIncome: 30000,
           age: 45,
           usCitizen: false,
           usAlien: true,
           massResident: true,
           pregnant: false,
           hiv: false,
           disabled: false,
           breastCancer: false,
           cervicalCancer: false,
           caretaker: false};
  expected = {connectorCare: true,
              qualifiedHealthPlan: false,
              massHealth: false,
              massHealthCarePlus: false};
  assert.deepEqual(getEligibility(input), expected, "Passed!");
});

QUnit.test("Typical 21-64 MassHealth", function(assert) {
  input = {householdSize: 4,
           annualHouseholdIncome: 1234,
           age: 31,
           usCitizen: true,
           usAlien: false,
           massResident: true,
           pregnant: false,
           hiv: false,
           disabled: true,
           breastCancer: false,
           cervicalCancer: false,
           caretaker: false};
  expected = {connectorCare: false,
              qualifiedHealthPlan: false,
              massHealth: true,
              massHealthCarePlus: false};
  assert.deepEqual(getEligibility(input), expected, "Passed!");
});

QUnit.test("Typical 21-64 Mass Health CarePlus", function(assert) {
  input = {householdSize: 4,
           annualHouseholdIncome: 1234,
           age: 31,
           usCitizen: true,
           usAlien: false,
           massResident: true,
           pregnant: false,
           hiv: false,
           disabled: false,
           breastCancer: false,
           cervicalCancer: false,
           caretaker: false};
  expected = {connectorCare: false,
              qualifiedHealthPlan: false,
              massHealth: false,
              massHealthCarePlus: true};
  assert.deepEqual(getEligibility(input), expected, "Passed!");
});

QUnit.test("Typical ConnectorCare", function(assert) {
  input = {householdSize: 4,
           annualHouseholdIncome: 40000,
           age: 31,
           usCitizen: true,
           usAlien: false,
           massResident: true,
           pregnant: false,
           hiv: false,
           disabled: false,
           breastCancer: false,
           cervicalCancer: false,
           caretaker: false};
  expected = {connectorCare: true,
              qualifiedHealthPlan: false,
              massHealth: false,
              massHealthCarePlus: false};
  assert.deepEqual(getEligibility(input), expected, "Passed!");
});

QUnit.test("Typical Qualified Health Plan", function(assert) {
  input = {householdSize: 8,
           annualHouseholdIncome: 140000,
           age: 31,
           usCitizen: true,
           usAlien: false,
           massResident: true,
           pregnant: false,
           hiv: false,
           disabled: false,
           breastCancer: false,
           cervicalCancer: false,
           caretaker: false};
  expected = {connectorCare: false,
              qualifiedHealthPlan: true,
              massHealth: false,
              massHealthCarePlus: false};
  assert.deepEqual(getEligibility(input), expected, "Passed!");
});
