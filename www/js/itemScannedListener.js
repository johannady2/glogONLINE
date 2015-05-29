$(document).on('itemScanned',function(event,scanResult)
{
  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/))
    {   
		if(networkstatus == 'disconnected')
		{
			$('.content-cont').empty();
			$('.content-cont').append('scan failed because you were offline. Please try again once online.');
			//can add "click here" with scanResult variable to retrieve once online.
			//by modifying ondeviceonline code, i can make it load automatically once online.
			
			scanResultWhenOffline = scanResult;
		}
		else
		{
			renderOnlineSinglePage(scanResult);
		}

 

    }
});