
// Sample data
//var DATA = '{"GRE Score":337,"TOEFL Score":118,"University Rating":4,"SOP":4.5,"LOR":4.5,"CGPA":9.65,"Research":1}';

var sliderGRE = document.getElementById("sliderGRE")
var sliderTOEFL = document.getElementById("sliderTOEFL")
var sliderCGPA = document.getElementById("sliderCGPA")

var valueGRE = document.getElementById("valueGRE")
var valueTOEFL = document.getElementById("valueTOEFL")
var valueCGPA = document.getElementById("valueCGPA")

var valuePredictionAdmission = document.getElementById("valuePredictionAdmission")

//var i = 1
valueGRE.innerHTML=sliderGRE.value
valueTOEFL.innerHTML=sliderTOEFL.value
valueCGPA.innerHTML=sliderCGPA.value

sliderGRE.oninput = function() {
  valueGRE.innerHTML = this.value
  makePredictionAdmission()
}

sliderTOEFL.oninput = function() {
  valueTOEFL.innerHTML = this.value
  makePredictionAdmission()
}

sliderCGPA.oninput = function() {
  valueCGPA.innerHTML = this.value
  makePredictionAdmission()
}


function predictAdmission(data) {
  console.log("\n\n\nPrediction input: ",data)
  var ENDPOINT = 'https://4c9kil1hsi.execute-api.us-east-1.amazonaws.com/Predict/448d1e79-95c2-4535-bada-41843c7d7279';
  return fetch(ENDPOINT, {
    method: 'POST',
    body: data,
  })
  .then(res => res.json())
  .then(response => JSON.parse(response.body))
  .then(function(data) {
    processAdmissionPrediction(data)
  })
  .catch(err => console.log('err', err));
};

function processAdmissionPrediction(data) {
  console.log("processAdmissionPrediction: ",data)
  var predictedValue=data["predicted_label"]*100
  valuePredictionAdmission.innerHTML=predictedValue.toFixed(1)
}

function makePredictionAdmission() {
  var g=valueGRE.innerHTML
  var t=valueTOEFL.innerHTML
  var c=valueCGPA.innerHTML
  var d = `{"GRE Score":${g},"TOEFL Score":${t},"University Rating":4,"SOP":4.5,"LOR":4.5,"CGPA":${c},"Research":1}`;
  //i=i+1
  //valuePrediction.innerHTML=i

  predictAdmission(d)
}