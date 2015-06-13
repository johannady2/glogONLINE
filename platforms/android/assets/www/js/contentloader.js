 $(document).ready(function()
{ 
      
    
       var defaultContent = 'splash.html';     
         $(".content-cont").load(defaultContent,  null, function(event,filename)
         {
			 $('.site-content').removeClass('container');
             $('body').css('background-image', 'url(' + '"img/splashbg.jpg"' + ')');
			 $('.content-cont').css( 'marginTop','0px' );
    		 $('.content-cont').css('marginBottom', '0px' );
			 $('body').bind('touchmove', function(e){e.preventDefault()});
			 $('.bxslider').bxSlider();

			 
			 
				 $(".slideToUnlock").on('click',function()
				 {      clearInterval(timerId);

						$('.site-content').addClass('container');
						$('body').css('background-image', 'none');
						$('.content-cont').css('marginTop','60px');
						$('.content-cont').css('marginBottom','60px');
						jQuery('body').unbind('touchmove');
					 	$('.bxslider').hide();
					 	
					 	//$('.content-cont').append('<p>You have\'nt scanned anything. <a href="#"  onclick="scanner.startScanning(MWBSInitSpace.init,MWBSInitSpace.callback)">Click here</a> to scan an item.</p>');

                    $('.content-cont').empty();
                    $('.content-cont').append('<div class="row"><div class="col-md-12 col-sm-12 col-xs-12"><br><p>Would you like to exit this application?</p></div><div class="col-md-12 col-sm-12 col-xs-12"><button class="btn btn-sm btn-success noContinue">Continue Shopping</button></div><div class="col-md-12 col-sm-12 col-xs-12"><br><button class="btn btn-sm btn-danger yesExit">Exit</button></div></div>');
          
					 $('nav , footer').show();
					 $('.splashscreencont').remove();


                    
                  
                  
            

                   // ref = window.open('http://viveg.net/index.php?controller=order&glog-app-access=76ef0d45220fdee3ac883a0c7565e50c', '_blank', 'location=no,toolbar=no'); 
                    ref = window.open('http://viveg.net/index.php?glog-app-access=76ef0d45220fdee3ac883a0c7565e50c', '_blank', 'location=no,toolbar=no'); 
                    ref.addEventListener('loadstart', function(event) { /*alert('start: ' + event.url);*/ });
                    ref.addEventListener('loadstop', function(event)
					{
						

						ref.insertCSS({  file: "http://viveg.net/inappbrowserfiles/custom.css" },function(){ /*alert('css inserted');*/});

						ref.executeScript({	file: "http://viveg.net/inappbrowserfiles/custom.js"}, function(){ /*alert("js inserted");*/  					Exit();
								
						 });

                       
                    });
                     ref.addEventListener('loaderror', function(event) { /*alert('error: ' + event.message);*/ });
                     ref.addEventListener('exit', function(event) { /*alert(event.type);*/});
                    //scanner.startScanning(MWBSInitSpace.init,MWBSInitSpace.callback);
                  

				 });
         });

    $('body').on("click",'.yesExit', function()
     {
          navigator.app.exitApp();
     });

    $('body').on("click",'.noContinue', function()
    {  
        ref = window.open('http://viveg.net/index.php?glog-app-access=76ef0d45220fdee3ac883a0c7565e50c', '_blank', 'location=no'); 
    });


     
 });

         