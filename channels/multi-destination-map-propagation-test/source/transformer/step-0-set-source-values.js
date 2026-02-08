// @mirth-artifact source.transformer.step[0]
// @name Set Source Values
// @sequence 0
// @enabled true
// @type com.mirth.connect.plugins.javascriptstep.JavaScriptStep
// @type-version 3.9.1

// Source transformer - set initial $c values
$c('sourceValue', 'fromSource');
$c('sourceTime', new Date().toISOString());
$c('patientMRN', msg['PID']['PID.3']['PID.3.1'].toString());

logger.info('Source transformer set: sourceValue=' + $c('sourceValue'));