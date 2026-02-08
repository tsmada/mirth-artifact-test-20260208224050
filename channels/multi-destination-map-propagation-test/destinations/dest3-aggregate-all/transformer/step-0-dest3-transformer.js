// @mirth-artifact destinations/dest3-aggregate-all.transformer.step[0]
// @name Dest3 Transformer
// @sequence 0
// @enabled true
// @type com.mirth.connect.plugins.javascriptstep.JavaScriptStep
// @type-version 3.9.1

// Dest3: Should see all accumulated values from source, dest1, and dest2
logger.info('Dest3 sees sourceValue: ' + $c('sourceValue'));
logger.info('Dest3 sees dest1Value: ' + $c('dest1Value'));
logger.info('Dest3 sees dest2Value: ' + $c('dest2Value'));

// Verify all values are accessible
if ($c('sourceValue') !== 'fromSource') {
  throw new Error('Dest3: sourceValue not found');
}
if ($c('dest1Value') !== 'fromDest1') {
  throw new Error('Dest3: dest1Value not found');
}
if ($c('dest2Value') !== 'fromDest2') {
  throw new Error('Dest3: dest2Value not found');
}

// Aggregate all values into a summary object
var aggregatedValues = {
  source: $c('sourceValue'),
  dest1: $c('dest1Value'),
  dest2: $c('dest2Value'),
  patientMRN: $c('patientMRN')
};
$c('aggregatedValues', JSON.stringify(aggregatedValues));

logger.info('Dest3 aggregated all values: ' + $c('aggregatedValues'));