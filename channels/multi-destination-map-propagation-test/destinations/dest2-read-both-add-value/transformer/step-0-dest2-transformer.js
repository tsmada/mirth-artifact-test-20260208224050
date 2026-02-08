// @mirth-artifact destinations/dest2-read-both-add-value.transformer.step[0]
// @name Dest2 Transformer
// @sequence 0
// @enabled true
// @type com.mirth.connect.plugins.javascriptstep.JavaScriptStep
// @type-version 3.9.1

// Dest2: Should see source AND dest1 values
logger.info('Dest2 sees sourceValue: ' + $c('sourceValue'));
logger.info('Dest2 sees dest1Value: ' + $c('dest1Value'));

// Verify both source and dest1 values are accessible
if ($c('sourceValue') !== 'fromSource') {
  throw new Error('Dest2: sourceValue not found');
}
if ($c('dest1Value') !== 'fromDest1') {
  throw new Error('Dest2: dest1Value not found - map not propagating from Dest1');
}

// Add dest2-specific value
$c('dest2Value', 'fromDest2');
$c('dest2Time', new Date().toISOString());