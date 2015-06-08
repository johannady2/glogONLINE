	var networkstatus = '';

	var onlineSingleItemPictureFileName;
	var onlineSingleItemBarcode;
	var onlineSingleItemBrand;
	var onlineSingleItemFullDescription;
	var onlineSingleItemPromoName;
	var onlineSingleItemPromoPrice;

	if(scanResultWhenOffline == null)//initialize when not initialized
	{
		var scanResultWhenOffline;
	}

	var ref;


	function onBodyLoad()
	{   
		document.addEventListener("offline", onDeviceOffline, false);
		document.addEventListener("online", onDeviceOnline, false);


	}
	  //listen for changes






	function onDeviceOffline()
	{


		$('.splashscreencont').hide();
		$('.noti-blanket , .noti-offline').show();

			networkstatus = 'disconnected';


	}


	function onDeviceOnline()
	{ 
		networkstatus = 'connected';
		if(scanResultWhenOffline != null)
		{
			renderOnlineSinglePage(scanResultWhenOffline);
		}


		$('.noti-blanket, .noti-offline, .splashscreencont').hide();
		$('.splashscreencont').show();
		$('.splashloading').hide();
		$('.slideToUnlock').show();

	}


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
	/*-------------------online-single-item.html------------------------------*/
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
							$('.addToPrestaCart').attr('data-barcode',onlineSingleItemBarcode);
							$('.onlineSingleItemPromoPrice').append(onlineSingleItemPromoPrice);
							$('.glogtotal').append(onlineSingleItemPromoPrice);
							$('.onlineSingleItemPictureFileName').attr('src',onlineSingleItemPictureFileName);
							$('.onlineSingleItemFullDescription').append(onlineSingleItemFullDescription);
							$('.onlineSingleItemBrand').append(onlineSingleItemBrand);
							$('.onlineSingleItemPromoName').append(onlineSingleItemPromoName);


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



	$(document).on('input','#onlineSingleItemEnteredQuantity',function ()
	{
		/*keycodes undefined are undefined so i did this instead*/


		var glogprice = $('.onlineSingleItemPromoPrice').html(); 

		 var currentvalue = $('#onlineSingleItemEnteredQuantity').val();
		 var glogqlen = $.trim($('#onlineSingleItemEnteredQuantity').val());

		//alert('glogqlen ='+glogqlen);

		if(glogqlen.length>0 && currentvalue != 0 && currentvalue !='0' && testinput(/[^0-9.]/, currentvalue)==0)//if not empty && not zero && (does not contain any none numeric)
		{
		  //alert('in if');
			//alert('currentvalue =' + currentvalue);

			var newvalue = currentvalue.toString().replace(/[^0-9\.]+/g, '');
			$('#onlineSingleItemEnteredQuantity').val(newvalue);
			var qval = $('#onlineSingleItemEnteredQuantity').val();


		}
		else
		{

		  //alert('in else');
			currentvalue = 1;
		   // //alert('currentvalue =' + currentvalue);

			var newvalue = currentvalue.toString().replace(/[^0-9\.]+/g, '');
			$('#onlineSingleItemEnteredQuantity').val('');
			var qval = 1;

		}


		//alert('after if else');



			parseInt(qval);

		   // //alert(qval);
			var glogtotaltemp = qval *  glogprice;   
			var glogtotal = glogtotaltemp.toFixed(2);
		   // //alert('glogtotal =' + glogtotal);
			$('.glogtotal').empty();
			$('.glogtotal').append(glogtotal);


			$('.addToPrestaCart').attr('data-quantity',qval);
			//$('.addToPrestaCart').attr('data-subtotal',glogtotal);//no need for this data


	});


	function testinput(re, str)
	{


		if (re.test(str) && (str.length == 1))
		{
		   // //alert('contains none numeric and string length == 1');
			return 1;
		} 
		else
		{
		  //  //alert('does not contain none numeric || or contains but length > 1');
			return 0;
		}

	}


	$('body').on('click','.addToPrestaCart',function()
	{

		ref = window.open('http://viveg.net/index.php?barcode='+$(this).attr('data-barcode')+'&quantity='+$(this).attr('data-quantity')+'&localmobiledate='+getDateNow()+'&glog-app-access=76ef0d45220fdee3ac883a0c7565e50c', '_blank', 'location=yes');
	});

	/*-----------------------------------------------------------------------*/
	/*-------------------//online-single-item.html-------------------------------*/
	/*----------------------------------------------------------------------*/

	function getDateNow()
	{

		var d = new Date();

		var month = d.getMonth()+1;
		var day = d.getDate();
		var hours = d.getHours();
		var minutes = d.getMinutes();
		var seconds = d.getSeconds();

		var output = d.getFullYear() + '-' +
			(month<10 ? '0' : '') + month + '-' +
			(day<10 ? '0' : '') + day;

		return output;
	}



$('.content-cont').bind("DOMSubtreeModified",function()
{

    
        if($(document).width() <= 767)
        {
            if($('.foronlinesingleonly').is(":visible"))
            {
                $('.navbar-default .navbar-toggle').hide();
            }
            else
            {
                 $('.navbar-default .navbar-toggle').show();
            }
        }
        else
        {
             $('.navbar-default .navbar-toggle').hide();
        }

 
});