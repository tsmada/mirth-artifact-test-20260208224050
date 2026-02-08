// @mirth-artifact destinations/dest1-read-source-add-value.transformer.step[0]
// @name Dest1 Transformer
// @sequence 0
// @enabled true
// @type com.mirth.connect.plugins.javascriptstep.JavaScriptStep
// @type-version 3.9.1

// Dest1: Read source values and add dest1 value
logger.info('Dest1 sees sourceValue: ' + $c('sourceValue'));
logger.info('Dest1 sees patientMRN: ' + $c('patientMRN'));

// Verify source values are accessible
if ($c('sourceValue') !== 'fromSource') {
  throw new Error('Dest1: sourceValue not found or incorrect');
}

// Add dest1-specific value
$c('dest1Value', 'fromDest1');
$c('dest1Time', new Date().toISOString());