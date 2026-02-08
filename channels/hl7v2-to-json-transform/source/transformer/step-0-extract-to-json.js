// @mirth-artifact source.transformer.step[0]
// @name Extract to JSON
// @sequence 0
// @enabled true
// @type com.mirth.connect.plugins.javascriptstep.JavaScriptStep
// @type-version 3.9.1

// Determine message type and extract accordingly
var msgType = msg[&apos;MSH&apos;][&apos;MSH.9&apos;][&apos;MSH.9.1&apos;].toString();
var result;

if (msgType === &apos;ADT&apos;) {
  // Extract patient demographics from ADT
  result = {
    mrn: msg[&apos;PID&apos;][&apos;PID.3&apos;][&apos;PID.3.1&apos;].toString(),
    lastName: msg[&apos;PID&apos;][&apos;PID.5&apos;][&apos;PID.5.1&apos;].toString(),
    firstName: msg[&apos;PID&apos;][&apos;PID.5&apos;][&apos;PID.5.2&apos;].toString(),
    middleName: msg[&apos;PID&apos;][&apos;PID.5&apos;][&apos;PID.5.3&apos;].toString() || &apos;&apos;,
    dob: msg[&apos;PID&apos;][&apos;PID.7&apos;][&apos;PID.7.1&apos;].toString(),
    gender: msg[&apos;PID&apos;][&apos;PID.8&apos;][&apos;PID.8.1&apos;].toString(),
    address: {
      street: msg[&apos;PID&apos;][&apos;PID.11&apos;][&apos;PID.11.1&apos;].toString(),
      city: msg[&apos;PID&apos;][&apos;PID.11&apos;][&apos;PID.11.3&apos;].toString(),
      state: msg[&apos;PID&apos;][&apos;PID.11&apos;][&apos;PID.11.4&apos;].toString(),
      zip: msg[&apos;PID&apos;][&apos;PID.11&apos;][&apos;PID.11.5&apos;].toString()
    },
    phone: msg[&apos;PID&apos;][&apos;PID.13&apos;][&apos;PID.13.1&apos;].toString(),
    ssn: msg[&apos;PID&apos;][&apos;PID.19&apos;][&apos;PID.19.1&apos;].toString() || &apos;&apos;
  };

  // Store in channel map for validation
  $c(&apos;extractedPatient&apos;, result);

} else if (msgType === &apos;ORU&apos;) {
  // Extract lab results from ORU
  var obxSegments = msg[&apos;OBX&apos;];
  var results = [];

  // Handle single OBX or multiple OBX segments
  var obxList = obxSegments.length ? obxSegments : [obxSegments];

  for (var i = 0; i &lt; obxList.length(); i++) {
    var obx = obxList[i];
    results.push({
      code: obx[&apos;OBX.3&apos;][&apos;OBX.3.1&apos;].toString(),
      name: obx[&apos;OBX.3&apos;][&apos;OBX.3.2&apos;].toString(),
      value: parseFloat(obx[&apos;OBX.5&apos;][&apos;OBX.5.1&apos;].toString()) || obx[&apos;OBX.5&apos;][&apos;OBX.5.1&apos;].toString(),
      units: obx[&apos;OBX.6&apos;][&apos;OBX.6.1&apos;].toString(),
      referenceRange: obx[&apos;OBX.7&apos;][&apos;OBX.7.1&apos;].toString(),
      flag: obx[&apos;OBX.8&apos;][&apos;OBX.8.1&apos;].toString(),
      status: obx[&apos;OBX.11&apos;][&apos;OBX.11.1&apos;].toString()
    });
  }

  result = {
    patient: {
      mrn: msg[&apos;PID&apos;][&apos;PID.3&apos;][&apos;PID.3.1&apos;].toString(),
      name: msg[&apos;PID&apos;][&apos;PID.5&apos;].toString()
    },
    order: {
      orderId: msg[&apos;OBR&apos;][&apos;OBR.2&apos;][&apos;OBR.2.1&apos;].toString(),
      specimenId: msg[&apos;OBR&apos;][&apos;OBR.3&apos;][&apos;OBR.3.1&apos;].toString(),
      testCode: msg[&apos;OBR&apos;][&apos;OBR.4&apos;][&apos;OBR.4.1&apos;].toString(),
      testName: msg[&apos;OBR&apos;][&apos;OBR.4&apos;][&apos;OBR.4.2&apos;].toString(),
      orderingProvider: msg[&apos;OBR&apos;][&apos;OBR.16&apos;].toString(),
      collectionTime: msg[&apos;OBR&apos;][&apos;OBR.7&apos;][&apos;OBR.7.1&apos;].toString(),
      resultTime: msg[&apos;OBR&apos;][&apos;OBR.22&apos;][&apos;OBR.22.1&apos;].toString(),
      status: msg[&apos;OBR&apos;][&apos;OBR.25&apos;][&apos;OBR.25.1&apos;].toString()
    },
    results: results
  };

  // Store in channel map for validation
  $c(&apos;extractedLabResults&apos;, result);
}

// Set output as JSON string
tmp = JSON.stringify(result, null, 2);