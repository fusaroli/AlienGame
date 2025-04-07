// Initialize jsPsych
// Initialize jsPsych
const jsPsych = initJsPsych({
  display_element: 'jspsych-target',
  on_finish: function() {
    // Save data to file when experiment is done
    jsPsych.data.displayData();
    
    // You can also save to CSV and download
    const csvData = jsPsych.data.get().csv();
    downloadCSV(csvData, 'cognitive-flexibility-data.csv');
  }
});

// Experiment settings (default values)
let TRAINING_TIME = 14 * 60 * 1000; // 14 minutes in milliseconds
let TEST_TIME = 21 * 60 * 1000;     // 21 minutes in milliseconds  
let TIMEOUT = 30 * 1000;            // 30 seconds in milliseconds

// Global experiment variables
let participantData = {};
let currentRule = 0;
let ruleAppend = '';
let currentPoints = 0;
let currentBlock = 'training';
let trialCounter = 0;
let ruleStartTime = 0;
let blockStartTime = 0;
let pauseStartTime = 0;
let pauseTime = 0;
let experimentRules = [];
let ruleId = '';

// Generate alien stimuli - 5 digit codes for each trial
function generateStimulusSet(count) {
  const stimuli = [];
  for (let i = 0; i < count; i++) {
    // Generate a random 5-digit alien code
    const digits = Array(5).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
    // Assign a random "alien type" (1-10) for visual representation
    const alienType = Math.floor(Math.random() * 10) + 1;
    
    stimuli.push({
      digits: digits,
      alienType: alienType
    });
  }
  return stimuli;
}

// Preload images - we'll need to generate or find alien images
const alienImages = [];
for (let i = 1; i <= 10; i++) {
  alienImages.push(`images/alien${i}.png`);
}

const preload = {
  type: jsPsychPreload,
  images: [
    'images/ignore.png',
    'images/kill.png',
    'images/success.png',
    'images/failure.png',
    'images/Instructions_Block_One.png',
    'images/Instructions_Block_two.png',
    'images/Instructions_Block_two_dyad.png',
    ...alienImages
  ],
  message: 'Loading experiment resources...',
  show_progress_bar: true,
  continue_after_error: true,
  error_message: 'An error occurred while loading. If this persists, please contact the experimenter.'
};

// Helper function for downloading data
function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}

// Participant information form
const participantInfoForm = {
  type: jsPsychSurvey,
  pages: [
    [
      {
        type: 'html',
        prompt: '<h2>Subject Info</h2>'
      },
      {
        type: 'dropdown',
        prompt: 'Condition:',
        name: 'condition',
        options: ['1_I', '2_ND', '3_D'],
        required: true
      },
      {
        type: 'text',
        prompt: 'Pair ID:',
        name: 'pairId',
        required: true
      },
      {
        type: 'number',
        prompt: 'Subject ID:',
        name: 'subjectId',
        required: true,
        default: 1
      },
      {
        type: 'number',
        prompt: 'Age:',
        name: 'age',
        required: true
      },
      {
        type: 'dropdown',
        prompt: 'Gender:',
        name: 'gender',
        options: ['female', 'male', 'other'],
        required: true
      },
      {
        type: 'number',
        prompt: 'Training Duration (minutes):',
        name: 'trainingDuration',
        required: true,
        default: 14
      },
      {
        type: 'number',
        prompt: 'Test Duration (minutes):',
        name: 'testDuration',
        required: true,
        default: 21
      }
    ]
  ],
  button_label_finish: 'Start Experiment',
  on_finish: (data) => {
    // Store participant info and update timings
    participantData = data.response;
    
    // Update durations if specified by experimenter
    if (participantData.trainingDuration) {
      TRAINING_TIME = participantData.trainingDuration * 60 * 1000;
    }
    if (participantData.testDuration) {
      TEST_TIME = participantData.testDuration * 60 * 1000;
    }
    
    // Load the appropriate rule set based on pair ID
    const ruleSet = selectRuleSet(participantData.pairId);
    experimentRules = ruleSet.rules;
    ruleId = ruleSet.ruleId;
    
    // Set initial rule based on condition and ID
    setInitialRule();
    
    // Start timers
    blockStartTime = Date.now();
    ruleStartTime = Date.now();
    
    // Save participant data to all trials
    jsPsych.data.addProperties({
      participant: {
        condition: participantData.condition,
        pairId: participantData.pairId,
        subjectId: participantData.subjectId,
        age: participantData.age,
        gender: participantData.gender
      },
      rule_id: ruleId
    });
  }
};

// Set initial rule based on condition and participant ID
function setInitialRule() {
  if (participantData.condition === '3_D') {
    if (parseInt(participantData.subjectId) % 2 === 1) { // Odd subject IDs
      currentRule = 0;
      ruleAppend = 'A';
    }
  } else {
    if (parseInt(participantData.pairId) % 2 === 1) { // Odd pair IDs
      currentRule = 0;
      ruleAppend = 'A';
    } else { // Even pair IDs
      currentRule = 3;
      ruleAppend = 'B';
    }
  }
}

// Instructions screen
const instructionsScreen = {
  type: jsPsychImageKeyboardResponse,
  stimulus: 'images/Instructions_Block_One.png',
  prompt: "<p>Press the spacebar to begin the experiment.</p>",
  choices: [' ']
};

// Create a trial
function createTrial(stimulus) {
  return {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
      let html = `
        <div class="trial-container">
          <div class="alien-container">
            <img class="alien-stimulus" src="images/alien${stimulus.alienType}.png" alt="Alien ${stimulus.digits}">
            <p>Alien code: ${stimulus.digits}</p>
          </div>
          <div class="response-buttons">
            <button class="response-button ignore-button" onclick="document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'i'}))">Ignore</button>
            <button class="response-button kill-button" onclick="document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'k'}))">Kill</button>
          </div>
        </div>
      `;
      return html;
    },
    choices: ['i', 'k'],
    trial_duration: TIMEOUT,
    on_start: function() {
      // Check if we need to transition to test phase
      const currentTime = Date.now();
      if (currentBlock === 'training' && (currentTime - blockStartTime > TRAINING_TIME)) {
        jsPsych.endCurrentTimeline();
        jsPsych.finishTrial();
        showPhaseTransition();
        return;
      }

      // Check if experiment time limit reached
      if (currentTime - blockStartTime > TRAINING_TIME + TEST_TIME + pauseTime) {
        jsPsych.endCurrentTimeline();
        jsPsych.finishTrial();
        finishExperiment();
        return;
      }
      
      trialCounter++;
    },
    on_finish: function(data) {
      // Process the response
      if (data.response) {
        const choice = data.response === 'i' ? 'ignore' : 'kill';
        const isDangerousStimulus = isDangerous(stimulus.digits, currentRule, experimentRules);
        let correct = 0;
        
        if (choice === 'ignore' && !isDangerousStimulus) {
          correct = 1;
        } else if (choice === 'kill' && isDangerousStimulus) {
          correct = 1;
        }
        
        // Update points
        if (correct === 1) {
          currentPoints += 100;
        } else if (currentPoints > 0) {
          currentPoints -= 100;
        }
        
        // Record data
        data.block = currentBlock;
        data.rule_number = currentRule > 3 ? Math.floor(currentRule / 3) : `1_${ruleAppend}`;
        data.trial = trialCounter;
        data.stimulus = stimulus.digits;
        data.choice = choice;
        data.correct = correct;
        data.points = currentPoints;
        
        // Show feedback
        showFeedback(correct);
        
        // Check if rule mastery achieved (in test phase)
        if (currentBlock === 'test' && trialCounter > 10) {
          const recentTrials = jsPsych.data.get().last(10).filter({block: 'test'});
          if (recentTrials.count() >= 10) {
            const correctCount = recentTrials.filter({correct: 1}).count();
            const timeSinceRuleStart = Date.now() - ruleStartTime;
            
            if (correctCount >= 10 || timeSinceRuleStart >= 420 * 1000) { // 7 minutes
              currentRule += 3;
              trialCounter = 0;
              ruleStartTime = Date.now();
              console.log("Advanced to rule: " + currentRule);
            }
          }
        }
      } else {
        // Timeout occurred
        showTimeout();
        
        // Record data for timeout
        data.block = currentBlock;
        data.rule_number = currentRule > 3 ? Math.floor(currentRule / 3) : `1_${ruleAppend}`;
        data.trial = trialCounter;
        data.stimulus = stimulus.digits;
        data.choice = null;
        data.correct = null;
        data.points = currentPoints;
      }
    }
  };
}

// Function to show feedback
function showFeedback(correct) {
  const feedbackTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
      let feedbackImage = correct === 1 ? 'success.png' : 'failure.png';
      return `
        <div class="feedback-container">
          <img src="images/${feedbackImage}" alt="Feedback">
          <p class="points">Your score is now ${currentPoints} points</p>
        </div>
      `;
    },
    choices: "NO_KEYS",
    trial_duration: 1000
  };
  
  jsPsych.addNodeToEndOfTimeline(feedbackTrial);
}

// Function to show timeout message
function showTimeout() {
  const timeoutTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1 style="color:red;">TIMEOUT</h1>`,
    choices: "NO_KEYS",
    trial_duration: 1500
  };
  
  jsPsych.addNodeToEndOfTimeline(timeoutTrial);
}

// Function to handle phase transition
function showPhaseTransition() {
  pauseStartTime = Date.now();
  
  // Show transition message
  const transitionMessage = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
      <div class="message">
        <h2>You have finished the first part of the experiment.</h2>
        <p>Wait for further instructions from the experimenter.</p>
        <p style="color:gray;">(Experimenter: Press 'p' to continue to the next phase)</p>
      </div>
    `,
    choices: ['p']
  };
  
  // Second phase instructions
  const secondPhaseInstructions = {
    type: jsPsychImageKeyboardResponse,
    stimulus: function() {
      pauseTime += (Date.now() - pauseStartTime);
      
      // Different instructions based on condition
      if (participantData.condition === '1_I') {
        return 'images/Instructions_Block_two.png';
      } else {
        return 'images/Instructions_Block_two_dyad.png';
      }
    },
    prompt: "<p>Press the spacebar to begin the test phase.</p>",
    choices: [' '],
    on_finish: function() {
      // Reset for test phase
      currentRule = 6;
      trialCounter = 0;
      currentBlock = 'test';
      currentPoints = 0;
      ruleStartTime = Date.now();
      
      // Start test trials
      startTestPhase();
    }
  };
  
  jsPsych.addNodeToEndOfTimeline(transitionMessage);
  jsPsych.addNodeToEndOfTimeline(secondPhaseInstructions);
}

// Function to start test phase
function startTestPhase() {
  // Generate test stimuli
  const testStimuli = generateStimulusSet(200); // Generate plenty of stimuli
  
  // Create timeline with test trials
  const testTrials = [];
  
  // Add test trials
  for (let i = 0; i < testStimuli.length; i++) {
    testTrials.push(createTrial(testStimuli[i]));
  }
  
  jsPsych.addNodeToEndOfTimeline({
    timeline: testTrials
  });
}

// Function to finish experiment
// Function to finish experiment
function finishExperiment() {
  const completionScreen = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
      <div class="message">
        <h2>The experiment is finished. Thank you very much for your participation!</h2>
        <p>Please await instructor, two further questionnaires need to be filled in.</p>
        <p style="color:gray;">(Experimenter: Press 'p' to open questionnaire)</p>
      </div>
    `,
    choices: ['p'],
    on_finish: function() {
      // Open appropriate questionnaire
      let questionnaireUrl = '';
      
      if (participantData.condition === '1_I') {
        questionnaireUrl = 'https://goo.gl/forms/EIsrhJEQd9aprjqh1';
      } else if (participantData.condition === '2_ND') {
        questionnaireUrl = 'https://goo.gl/forms/oqkHF2edUpO3Tu553';
      } else if (participantData.condition === '3_D') {
        questionnaireUrl = 'https://goo.gl/forms/z9dp2bYgpkXyruZT2';
      }
      
      window.open(questionnaireUrl, '_blank');
    }
  };
  
  jsPsych.addNodeToEndOfTimeline(completionScreen);
}

// Generate stimuli
const trainingStimuli = generateStimulusSet(300); // Generate plenty of stimuli

// Create timeline with trials
const timeline = [];
timeline.push(preload);
timeline.push(participantInfoForm);
timeline.push(instructionsScreen);

// Generate training trials
const trainingTrials = [];
for (let i = 0; i < trainingStimuli.length; i++) {
  trainingTrials.push(createTrial(trainingStimuli[i]));
}

// Add training trials to timeline
timeline.push({
  timeline: trainingTrials
});

// Start the experiment
jsPsych.run(timeline);
