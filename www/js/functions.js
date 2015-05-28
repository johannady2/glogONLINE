var networkstatus = '';
var onlineSingleItemPictureFileName;
var onlineSingleItemBarcode;
var onlineSingleItemBrand;
var onlineSingleItemFullDescription;
var onlineSingleItemPromoName;
var onlineSingleItemPromoPrice;



function onBodyLoad()
{   
    document.addEventListener("offline", onDeviceOffline, false);
    document.addEventListener("online", onDeviceOnline, false);

    
}
  //listen for changes
  





function onDeviceOffline()
{


    $('.noti-online , .splashscreencont').hide();
    $('.noti-blanket , .noti-offline').show();

        networkstatus = 'disconnected';
      
 
}


function onDeviceOnline()
{ 
   networkstatus = 'connected';
    $('.noti-offline, .splashscreencont').hide();
   $('.noti-blanket , .noti-online').show();      
    
}


$('.btn-noti-online').on('click',function()
{
    
    $('.noti-blanket, .noti-online').hide();
    $('.splashscreencont').show();
	$('.splashloading').hide();
 	$('.slideToUnlock').show();
    
});

/*----------------------------------------------------------------------*/
/*-------------------custom events-------------------------------*/
/*----------------------------------------------------------------------*/


function doneScanning(event,scanResult)
{

    $(document).trigger('itemScanned',[scanResult]);
    
}

/*----------------------------------------------------------------------*/
/*-------------------//custom events-------------------------------*/
/*----------------------------------------------------------------------*/

/*----------------------------------------------------------------------*/
/*-------------------itemScannedListener.js-------------------------------*/
/*----------------------------------------------------------------------*/
function renderOnlineSinglePage(scanResult)
{

	$(".content-cont").empty();
	$(".content-cont").append('<img src="img/loading.gif" style="margin:15% auto; width:25%; display:block;"/>');
	

            $.when($.getJSON('http://www.viveg.net/api4v2.php?format=json&barcode='+scanResult+'&user=wcu&pass=v1v3g')).done(function(forOnlineSingleData)
            {

                    $.each(forOnlineSingleData, function( index, value ) 
                      {
               
                            $.each(value, function(inde, valu)
                            {
                                $.each(valu, function(ind, val)
                                {
                                    $.each( val, function( i, v )
                                    {

										//{"ALL":[{"posts":{"RowNumber_InvtyCat":"27","SysPk_InvtyCat":"SY - 211","SKU_InvtyCat":"SY - 211","PictureFileName_InvtyCat":"http:\/\/viveg.net\/img\/p\/5\/3\/53.jpg","Barcode_InvtyCat":"4806508161665","Brand_InvtyCat":"Sanyang Study Table","FullDescription_InvtyCat":"<p>Wooden Sanyang study table. Available colors in beige and black.<\/p>","PromoName_InvtyCat":"Sanyang Study Table","PromoPrice_InvtyCat":"2678.571429"}}]}	
										
											
											if(i == 'PictureFileName_InvtyCat')
											{	
												onlineSingleItemPictureFileName = val[i];
											}
											else if(i == 'Barcode_InvtyCat')
											{
												onlineSingleItemBarcode = val[i];
											}
											else if(i == 'Brand_InvtyCat')
											{
												onlineSingleItemBrand = val[i];
											}
											else if(i == 'FullDescription_InvtyCat')
											{
												 onlineSingleItemFullDescription = val[i];
											}
											else if(i == 'PromoName_InvtyCat')
											{
												 onlineSingleItemPromoName = val[i];
											}
											else if(i == 'PromoPrice_InvtyCat')
											{
												 onlineSingleItemPromoPrice = val[i];
											}

                                    });	

                                });	

                            });
                      });


            }).then(function(objects)
			{
			
				
			
				 $(".content-cont").empty();
				if(onlineSingleItemBarcode != null && onlineSingleItemBarcode != '')
				{
				 	$(".content-cont").unload().load('online-single-item.html',  null, function()
					{
						$('.onlineSingleItemPictureFileName').attr('src',onlineSingleItemPictureFileName);
						//onlineSingleItemBarcode
						$('.onlineSingleItemFullDescription').append(onlineSingleItemFullDescription);
						$('.onlineSingleItemBrand').append(onlineSingleItemBrand);
						$('.onlineSingleItemPromoName').append(onlineSingleItemPromoName);
						$('.onlineSingleItemPromoPrice').append(onlineSingleItemPromoPrice);
						
						/*because when item is not available, variables are not updated which causes the last avaialble item to appear on online-single-item.html... By assigning them with '' value, I can output, "iteme unavailable" when value is '' item is not available according to the api*/
						onlineSingleItemPictureFileName = '';
						onlineSingleItemBarcode = '';
						onlineSingleItemBrand = '';
						onlineSingleItemFullDescription = '';
						onlineSingleItemPromoName = '';
						onlineSingleItemPromoPrice = '';
				 	});
				
				
				}
				else
				{
					$(".content-cont").empty();
					$(".content-cont").append('<p>Item Unavailable</p>');
				}
				
			
			});
	

  
}
/*----------------------------------------------------------------------*/
/*-------------------//itemScannedListener.js-------------------------------*/
/*----------------------------------------------------------------------*/