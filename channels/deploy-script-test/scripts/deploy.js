// Deploy script - executes once when channel starts
// Set timestamp when deployed
$gc('deployedAt', new Date().toISOString());

// Increment deploy counter (for re-deploy testing)
var counter = $gc('deployCounter') || 0;
$gc('deployCounter', counter + 1);

// Store channel info available in deploy scope
$gc('deployChannelName', channelName);
$gc('deployChannelId', channelId);

// Log for verification
logger.info('DEPLOY SCRIPT executed for channel: ' + channelName + ' (id: ' + channelId + ')');
logger.info('Deploy counter is now: ' + (counter + 1));

return;