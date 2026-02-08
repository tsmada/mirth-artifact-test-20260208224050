// @mirth-artifact source.transformer.step[0]
// @name Use Code Template Function
// @sequence 0
// @enabled true
// @type com.mirth.connect.plugins.javascriptstep.JavaScriptStep
// @type-version 3.9.1

// Extract name components from PID segment
var family = msg['PID']['PID.5']['PID.5.1'].toString();
var given = msg['PID']['PID.5']['PID.5.2'].toString();
var middle = msg['PID']['PID.5']['PID.5.3'].toString() || '';

// Call code template function
var formattedName = formatPatientName(family, given, middle);

// Store result in channel map for verification
$c('formattedPatientName', formattedName);
$c('codeTemplateUsed', true);

logger.info('Code template formatPatientName returned: ' + formattedName);