var moodSentence=""

textMoodSentence.oninput = function() {
  moodSentence=this.value
  console.log("Just saw:",moodSentence)
  makePredictionMood()
}

function makePredictionMood() {
  var dataMood = `{"sentence":"${moodSentence}"}`;
  console.log("\n\n\nPrediction input: ",dataMood)
  var ENDPOINT_MOOD = 'https://segoht28o9.execute-api.us-east-1.amazonaws.com/Predict/296faa51-2501-4855-b4ba-677e6c276915';
  return fetch(ENDPOINT_MOOD, {
    method: 'POST',
    body: dataMood,
  })
  .then(res => res.json())
  .then(response => JSON.parse(response.body))
  .then(function(data) {
    console.log("processAdmissionPrediction: ",data)
    valuePredictionMood.innerHTML=data["predicted_label"]
  })
  .catch(err => console.log('err', err));
};
