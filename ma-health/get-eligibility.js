// Attempt to https://www.bmchp.org/need-affordable-health-insurance/eligibility-guidelines

/**
 * Income thresholds for different household sizes. Arrays are ordered by family size. I.e. INCOME_THRESHOLDS[0]
 * corresponds to the income thresholds for a family of 1. If that value is [0, 15528, 35017, 46880] then the first
 * income level would be 0 to $15,527, second $15,528 to $35,016, etc.
 */
const INCOME_THRESHOLDS = [
    [0, 15528, 35017, 46880],
    [0, 20928, 47197, 62928],
    [0, 26328, 59377, 79164],
    [0, 31728, 71556, 95400],
    [0, 37128, 83736, 111648],
    [0, 42528, 95916, 127884],
    [0, 47928, 108096, 144120],
    [0, 53328, 120276, 160368]
]

/**
 * Grabs the income level (1, 2, 3, or 4) for a given annual household income and household size
 *
 * @return {Number} Number will be 1, 2, 3 or 4
 */
function getIncomeLevel({ annualHouseholdIncome, householdSize }) {
    if (!annualHouseholdIncome || !householdSize) {
        throw 'Missing arguments';
    }

    if (householdSize > 8) {
        // TODO: There's probably a better way to handle this case...
        throw 'Too many people in that family. How should we handle those?';
    }

    const thresholds = INCOME_THRESHOLDS[householdSize - 1];

    let level = 1;
    for (let i = thresholds.length - 1; i >= 0; i--) {
        if (annualHouseholdIncome >= thresholds[i]) {
            level = i + 1;
            break;
        }
    }

    return level;
}

/**
 * An object detailing eligibility for various health programs
 * E.g. {connectorCare: true, qualifiedHealthPlan: false, massHealth: false, massHealthCarePlus: false}
 *
 * @typedef EligibilityMatrix
 * @property {Boolean} connectorCare
 * @property {Boolean} qualifiedHealthPlan
 * @property {Boolean} massHealth
 * @property {Boolean} massHealthCarePlus
 */

/**
 * Returns a recipient's eligibility matrix as determined by the given set of parameters
 * TODO: I only developed this for the table pertaining to a household size of 3:
 * https://www.bmchp.org/need-affordable-health-insurance/eligibility-guidelines/3
 * We need to expand it to other household sizes, which might require restructuring the code a bunch.
 *
 * @return {EligibilityMatrix}
 */
function planType({
    householdSize,
    annualHouseholdIncome,
    age,
    usCitizen = false,
    usAlien = false,
    massResident = false,
    pregnant = false,
    hiv = false,
    disabled = false,
    breastCancer = false,
    cervicalCancer = false,
    caretaker = false
}) {
    const incomeLevel = getIncomeLevel({ annualHouseholdIncome, householdSize });

    if (!householdSize || !annualHouseholdIncome || !age || !incomeLevel) {
        return null;
    }

    const eligibility = { connectorCare: false, qualifiedHealthPlan: false, massHealth: false, massHealthCarePlus: false };

    if (!massResident || (!usCitizen && !usAlien && incomeLevel > 1) || (!usCitizen && incomeLevel === 1)) {
        return eligibility;
    }

    if (incomeLevel === 1) {
        if (age < 21) {
            eligibility.massHealth = true;
        }

        if (age < 64) {
            eligibility.massHealthCarePlus = true;

            if (pregnant || hiv || disabled || breastCancer || cervicalCancer || caretaker) {
                eligibility.massHealth = true;
            }
        }
    }

    if (incomeLevel >= 2) {
        // Haven't added this requirement because I frankly wouldn't even know where to start:
        // "Not eligible for health insurance that meets minimum creditable coverage through Medicaid,
        // your employer, or your spouse's employer"

        if (age < 19 || age > 64) {
            return eligibility;
        }

        switch (incomeLevel) {
            case 2:
                eligibility.connectorCare = true;
                break;
            case 3:
            case 4:
                eligibility.qualifiedHealthPlan = true;
                break;
        }
    }

    return eligibility;
}


// Here's an example:
planType({
    householdSize: 3,
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
    caretaker: false
})
