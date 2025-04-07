// rules.js - Load and manage rule sets for the Cognitive Flexibility Experiment

// Parse the rule files into JavaScript arrays
const ruleSets = {
  "01": [
    // Rules from Final_Rule_blocks_1A1_1A2_1A3_1B1_1B2_1B3_21_22_23_to_111_112_113_randomization_01.dat
    [0, NaN, NaN, 1, NaN],
    [NaN, NaN, 1, 1, NaN],
    [0, NaN, 1, 1, NaN],
    [NaN, 1, NaN, NaN, 0],
    [NaN, 1, NaN, 0, NaN],
    [NaN, 1, NaN, 0, 0],
    [1, NaN, NaN, NaN, 1],
    [1, 0, NaN, NaN, NaN],
    [1, 0, NaN, NaN, 1],
    [0, NaN, 0, NaN, NaN],
    [NaN, NaN, 0, 1, NaN],
    [0, NaN, 0, 1, NaN],
    [NaN, 0, NaN, NaN, 1],
    [NaN, 0, 1, NaN, NaN],
    [NaN, 0, 1, NaN, 1],
    [1, 0, NaN, NaN, NaN],
    [1, NaN, NaN, NaN, 1],
    [1, 0, NaN, NaN, 1],
    [NaN, NaN, 0, 1, NaN],
    [0, NaN, 0, NaN, NaN],
    [0, NaN, 0, 1, NaN],
    [NaN, 0, 1, NaN, NaN],
    [NaN, 0, NaN, NaN, 1],
    [NaN, 0, 1, NaN, 1],
    [0, NaN, 1, NaN, NaN],
    [NaN, NaN, 1, NaN, 0],
    [0, NaN, 1, NaN, 0],
    [NaN, 1, NaN, 1, NaN],
    [NaN, 1, NaN, NaN, 1],
    [NaN, 1, NaN, 1, 1],
    [NaN, NaN, NaN, 0, 1],
    [1, NaN, NaN, 0, NaN],
    [1, NaN, NaN, 0, 1],
    [0, 0, NaN, NaN, NaN],
    [NaN, 0, 0, NaN, NaN],
    [0, 0, 0, NaN, NaN]
  ],
  "02": [
    // Rules from Final_Rule_blocks_1A1_1A2_1A3_1B1_1B2_1B3_21_22_23_to_111_112_113_randomization_02.dat
    [NaN, NaN, 0, 0, NaN],
    [NaN, NaN, 0, NaN, 1],
    [NaN, NaN, 0, 0, 1],
    [0, 1, NaN, NaN, NaN],
    [0, NaN, 1, NaN, NaN],
    [0, 1, 1, NaN, NaN],
    [NaN, 0, NaN, 1, NaN],
    [1, NaN, NaN, 1, NaN],
    [1, 0, NaN, 1, NaN],
    [NaN, NaN, NaN, 0, 0],
    [NaN, NaN, 0, NaN, 0],
    [NaN, NaN, 0, 0, 0],
    [1, 0, NaN, NaN, NaN],
    [1, NaN, NaN, NaN, 1],
    [1, 0, NaN, NaN, 1],
    [1, NaN, NaN, 1, NaN],
    [NaN, 0, NaN, 1, NaN],
    [1, 0, NaN, 1, NaN],
    [NaN, NaN, 0, NaN, 0],
    [NaN, NaN, NaN, 0, 0],
    [NaN, NaN, 0, 0, 0],
    [1, NaN, NaN, NaN, 1],
    [1, 0, NaN, NaN, NaN],
    [1, 0, NaN, NaN, 1],
    [NaN, NaN, NaN, 0, 1],
    [NaN, 1, NaN, NaN, 1],
    [NaN, 1, NaN, 0, 1],
    [0, NaN, 0, NaN, NaN],
    [0, 0, NaN, NaN, NaN],
    [0, 0, 0, NaN, NaN],
    [NaN, 0, 1, NaN, NaN],
    [NaN, NaN, 1, 1, NaN],
    [NaN, 0, 1, 1, NaN],
    [1, NaN, NaN, 0, NaN],
    [1, NaN, NaN, NaN, 0],
    [1, NaN, NaN, 0, 0]
  ],
  "03": [
    // Rules from Final_Rule_blocks_1A1_1A2_1A3_1B1_1B2_1B3_21_22_23_to_111_112_113_randomization_03.dat
    [NaN, 1, NaN, NaN, 0],
    [0, 1, NaN, NaN, NaN],
    [0, 1, NaN, NaN, 0],
    [NaN, NaN, 1, 0, NaN],
    [NaN, 0, NaN, 0, NaN],
    [NaN, 0, 1, 0, NaN],
    [NaN, NaN, 0, NaN, 1],
    [NaN, NaN, NaN, 1, 1],
    [NaN, NaN, 0, 1, 1],
    [1, NaN, NaN, NaN, 0],
    [1, 1, NaN, NaN, NaN],
    [1, 1, NaN, NaN, 0],
    [NaN, NaN, 0, 1, NaN],
    [0, NaN, NaN, 1, NaN],
    [0, NaN, 0, 1, NaN],
    [NaN, NaN, NaN, 1, 1],
    [NaN, NaN, 0, NaN, 1],
    [NaN, NaN, 0, 1, 1],
    [1, 1, NaN, NaN, NaN],
    [1, NaN, NaN, NaN, 0],
    [1, 1, NaN, NaN, 0],
    [0, NaN, NaN, 1, NaN],
    [NaN, NaN, 0, 1, NaN],
    [0, NaN, 0, 1, NaN],
    [0, NaN, NaN, NaN, 0],
    [0, NaN, 1, NaN, NaN],
    [0, NaN, 1, NaN, 0],
    [NaN, 1, NaN, 0, NaN],
    [NaN, NaN, 0, 0, NaN],
    [NaN, 1, 0, 0, NaN],
    [NaN, 0, 0, NaN, NaN],
    [NaN, 0, NaN, NaN, 1],
    [NaN, 0, 0, NaN, 1],
    [NaN, NaN, NaN, 1, 0],
    [1, NaN, NaN, 1, NaN],
    [1, NaN, NaN, 1, 0]
  ],
  "04": [
    // Rules from Final_Rule_blocks_1A1_1A2_1A3_1B1_1B2_1B3_21_22_23_to_111_112_113_randomization_04.dat
    [NaN, NaN, NaN, 1, 0],
    [NaN, 1, NaN, NaN, 0],
    [NaN, 1, NaN, 1, 0],
    [0, NaN, 1, NaN, NaN],
    [0, NaN, NaN, NaN, 1],
    [0, NaN, 1, NaN, 1],
    [NaN, NaN, 0, 0, NaN],
    [1, NaN, NaN, 0, NaN],
    [1, NaN, 0, 0, NaN],
    [NaN, 0, NaN, 1, NaN],
    [NaN, 0, NaN, NaN, 0],
    [NaN, 0, NaN, 1, 0],
    [1, NaN, 0, NaN, NaN],
    [1, 1, NaN, NaN, NaN],
    [1, 1, 0, NaN, NaN],
    [1, NaN, NaN, 0, NaN],
    [NaN, NaN, 0, 0, NaN],
    [1, NaN, 0, 0, NaN],
    [NaN, 0, NaN, NaN, 0],
    [NaN, 0, NaN, 1, NaN],
    [NaN, 0, NaN, 1, 0],
    [1, 1, NaN, NaN, NaN],
    [1, NaN, 0, NaN, NaN],
    [1, 1, 0, NaN, NaN],
    [NaN, 1, NaN, 1, NaN],
    [NaN, 1, 1, NaN, NaN],
    [NaN, 1, 1, 1, NaN],
    [0, NaN, NaN, NaN, 0],
    [0, NaN, 0, NaN, NaN],
    [0, NaN, 0, NaN, 0],
    [NaN, NaN, 0, NaN, 1],
    [NaN, NaN, NaN, 0, 1],
    [NaN, NaN, 0, 0, 1],
    [1, NaN, NaN, 1, NaN],
    [1, 0, NaN, NaN, NaN],
    [1, 0, NaN, 1, NaN]
  ],
  "05": [
    // Rules from Final_Rule_blocks_1A1_1A2_1A3_1B1_1B2_1B3_21_22_23_to_111_112_113_randomization_05.dat
    [NaN, NaN, 0, NaN, 0],
    [0, NaN, NaN, NaN, 0],
    [0, NaN, 0, NaN, 0],
    [NaN, 1, NaN, 0, NaN],
    [NaN, NaN, NaN, 0, 1],
    [NaN, 1, NaN, 0, 1],
    [NaN, 0, 1, NaN, NaN],
    [NaN, NaN, 1, 1, NaN],
    [NaN, 0, 1, 1, NaN],
    [1, NaN, 0, NaN, NaN],
    [1, NaN, NaN, NaN, 0],
    [1, NaN, 0, NaN, 0],
    [NaN, 0, NaN, 1, NaN],
    [0, NaN, NaN, 1, NaN],
    [0, 0, NaN, 1, NaN],
    [NaN, NaN, 1, 1, NaN],
    [NaN, 0, 1, NaN, NaN],
    [NaN, 0, 1, 1, NaN],
    [1, NaN, NaN, NaN, 0],
    [1, NaN, 0, NaN, NaN],
    [1, NaN, 0, NaN, 0],
    [0, NaN, NaN, 1, NaN],
    [NaN, 0, NaN, 1, NaN],
    [0, 0, NaN, 1, NaN],
    [0, NaN, 0, NaN, NaN],
    [0, 1, NaN, NaN, NaN],
    [0, 1, 0, NaN, NaN],
    [NaN, NaN, NaN, 0, 0],
    [NaN, 0, NaN, 0, NaN],
    [NaN, 0, NaN, 0, 0],
    [NaN, 0, NaN, NaN, 1],
    [NaN, NaN, 1, NaN, 1],
    [NaN, 0, 1, NaN, 1],
    [NaN, NaN, 0, 1, NaN],
    [1, NaN, NaN, 1, NaN],
    [1, NaN, 0, 1, NaN]
  ]
};

// Function to select appropriate ruleset based on pair ID
function selectRuleSet(pairId) {
  // Extract last digit of pair ID
  const lastDigit = parseInt(pairId.slice(-1));
  
  let ruleId;
  if ([1, 6].includes(lastDigit)) {
    ruleId = "01";
  } else if ([2, 7].includes(lastDigit)) {
    ruleId = "02";
  } else if ([3, 8].includes(lastDigit)) {
    ruleId = "03";
  } else if ([4, 9].includes(lastDigit)) {
    ruleId = "04";
  } else {
    ruleId = "05";
  }
  
  return {
    rules: ruleSets[ruleId],
    ruleId: ruleId
  };
}

// Improved isDangerous function that uses the actual rule sets
// Corrected isDangerous function that matches the original Python logic
function isDangerous(stimulusDigits, ruleNumber, rules) {
  try {
    const rule1 = rules[ruleNumber];
    const rule2 = rules[ruleNumber + 1];
    const rule3 = rules[ruleNumber + 2];
    
    // Convert stimulus digits to array of numbers
    const stimulusArray = stimulusDigits.split('').map(Number);
    
    // Check if stimulus matches each rule - a match occurs when each digit either:
    // 1. Matches the rule digit exactly, OR
    // 2. The rule digit is NaN (wildcard)
    const matchesRule1 = rule1.every((ruleDigit, index) => {
      return isNaN(ruleDigit) || Math.abs(stimulusArray[index] - ruleDigit) < 0.001;
    });
    
    const matchesRule2 = rule2.every((ruleDigit, index) => {
      return isNaN(ruleDigit) || Math.abs(stimulusArray[index] - ruleDigit) < 0.001;
    });
    
    const matchesRule3 = rule3.every((ruleDigit, index) => {
      return isNaN(ruleDigit) || Math.abs(stimulusArray[index] - ruleDigit) < 0.001;
    });
    
    // Apply XOR logic - exactly one of the three rule matches must be true
    // In JavaScript, we implement XOR (^) for more than two operands by counting
    // and checking if exactly one is true
    const matchCount = [matchesRule1, matchesRule2, matchesRule3].filter(Boolean).length;
    return matchCount === 1;
  } catch (e) {
    console.error("Error in isDangerous function:", e, "Rule number:", ruleNumber);
    return false;
  }
}
