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
					 	
					 	$('.content-cont').append('<p>You have\'nt scanned anything. <a href="#"  onclick="scanner.startScanning(MWBSInitSpace.init,MWBSInitSpace.callback)">Click here</a> to scan an item.</p>');





					 $('nav , footer').show();
					 $('.splashscreencont').remove();
		

					scanner.startScanning(MWBSInitSpace.init,MWBSInitSpace.callback);

				 });
         });
  

  
    

     
 });


 
         