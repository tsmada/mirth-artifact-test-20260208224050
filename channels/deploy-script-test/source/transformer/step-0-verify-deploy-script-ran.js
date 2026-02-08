// @mirth-artifact source.transformer.step[0]
// @name Verify Deploy Script Ran
// @sequence 0
// @enabled true
// @type com.mirth.connect.plugins.javascriptstep.JavaScriptStep
// @type-version 3.9.1

// Verify deploy script has set the global channel map values
var deployedAt = $gc('deployedAt');
var deployCounter = $gc('deployCounter');
var deployChannelName = $gc('deployChannelName');

// Store verification results in channel map
$c('verifyDeployedAt', deployedAt != null ? 'true' : 'false');
$c('verifyDeployCounter', deployCounter != null ? String(deployCounter) : 'null');
$c('verifyDeployChannelName', deployChannelName || 'null');

logger.info('Deploy verification - deployedAt: ' + deployedAt + ', counter: ' + deployCounter + ', channelName: ' + deployChannelName);