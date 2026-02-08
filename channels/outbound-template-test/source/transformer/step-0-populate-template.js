// @mirth-artifact source.transformer.step[0]
// @name Populate Template
// @sequence 0
// @enabled true
// @type com.mirth.connect.plugins.javascriptstep.JavaScriptStep
// @type-version 3.9.1

// tmp is initialized from outboundTemplate
// Populate the XML template from HL7v2 msg

// Set MRN
tmp[&apos;patient&apos;][&apos;mrn&apos;] = msg[&apos;PID&apos;][&apos;PID.3&apos;][&apos;PID.3.1&apos;].toString();

// Set name components
tmp[&apos;patient&apos;][&apos;name&apos;][&apos;family&apos;] = msg[&apos;PID&apos;][&apos;PID.5&apos;][&apos;PID.5.1&apos;].toString();
tmp[&apos;patient&apos;][&apos;name&apos;][&apos;given&apos;] = msg[&apos;PID&apos;][&apos;PID.5&apos;][&apos;PID.5.2&apos;].toString();
tmp[&apos;patient&apos;][&apos;name&apos;][&apos;middle&apos;] = msg[&apos;PID&apos;][&apos;PID.5&apos;][&apos;PID.5.3&apos;].toString() || &apos;&apos;;

// Set DOB and gender
tmp[&apos;patient&apos;][&apos;dob&apos;] = msg[&apos;PID&apos;][&apos;PID.7&apos;][&apos;PID.7.1&apos;].toString();
tmp[&apos;patient&apos;][&apos;gender&apos;] = msg[&apos;PID&apos;][&apos;PID.8&apos;][&apos;PID.8.1&apos;].toString();

// Set address
tmp[&apos;patient&apos;][&apos;address&apos;][&apos;street&apos;] = msg[&apos;PID&apos;][&apos;PID.11&apos;][&apos;PID.11.1&apos;].toString();
tmp[&apos;patient&apos;][&apos;address&apos;][&apos;city&apos;] = msg[&apos;PID&apos;][&apos;PID.11&apos;][&apos;PID.11.3&apos;].toString();
tmp[&apos;patient&apos;][&apos;address&apos;][&apos;state&apos;] = msg[&apos;PID&apos;][&apos;PID.11&apos;][&apos;PID.11.4&apos;].toString();
tmp[&apos;patient&apos;][&apos;address&apos;][&apos;zip&apos;] = msg[&apos;PID&apos;][&apos;PID.11&apos;][&apos;PID.11.5&apos;].toString();

// Set phone
tmp[&apos;patient&apos;][&apos;phone&apos;] = msg[&apos;PID&apos;][&apos;PID.13&apos;][&apos;PID.13.1&apos;].toString();

// Store in channel map for verification
$c(&apos;templatePopulated&apos;, true);
$c(&apos;patientMRN&apos;, tmp[&apos;patient&apos;][&apos;mrn&apos;].toString());