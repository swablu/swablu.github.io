// Color Schemed 
// A website I built to practice front-end code. This is a tool that you can
// use to come up with color themes for your projects.

// Add color: Adds a color. You can add as many as you want. However then your color theme may be difficult to navigate
//			  The default color is always gray. #323232 RGB( 50, 50, 50 )
// Delete color: deletes the selected color and default selects the first color item
// Selecting: To select a color simply click on it. 
// Deselecting: To deselect, re-click on selected color. This will hide the settings box
// RGB: RGB colors can be set by Sliders or Text input. Sliding will change the text and text the slide bar
// HEX: Color can also be input by Hexideximal code. Changing the hex value will update the color, and the slide bars and text inputs for RGB values


//variables
var $redRange = $('#redRange') ;
var $redText = $('#redText');
var $greenRange = $('#greenRange') ;
var $greenText = $('#greenText') ;
var $blueRange = $('#blueRange') ;
var $blueText = $('#blueText') ;

var $range = [ $('#redRange'), $('#greenRange'), $('#blueRange')] ;

var $hexText = $('#hex');

var $deleteButton = $('#deleteButton');

//add 3 colors upon loading
//Just change the variable if you ever want to update the default count.
//Did this to make it easier for you, future-self. You're welcome.
var defaultColorCount = 3;
for (var i=0; i<defaultColorCount; i++){
	addColor();
} //doing it this way because when we load the 3 li in with html,
  //There is what seems to be a default margin in between the lists. But when we append li through JS, they are shoulder to shoulder
  //Hopefully someday I'll find out why there was a default margin. But until then, going with this quick fix.

//now select first list item
$('ul li:first-child').addClass('selected') ;

///////////////////////////////////////////////////////////////
//   Java script objects for 
//   Range to text function
///////////////////////////////////////////////////////////////
var $redRangeJS = document.getElementById('redRange');
var $greenRangeJS = document.getElementById('greenRange');
var $blueRangeJS = document.getElementById('blueRange');
var $redTextJS = document.getElementById('redText');
var $greenTextJS = document.getElementById('greenText');
var $blueTextJS = document.getElementById('blueText');




//range affects text and color
//don't forget the # !!
function rangeToText(range, text){

	$(text).val( $(range).val() ) ;
	changeColor();
	//update hex too
	var r = $redRange.val() ;
	var g = $greenRange.val() ;
	var b = $blueRange.val() ;
	var rgb = rgbToHex( r, g, b ) ;
	$("#hex").val( rgb ) ;


};

//the actual magic
$redRangeJS.addEventListener( "input", function(){rangeToText('#redRange', '#redText')}, false );
$greenRangeJS.addEventListener( "input", function(){rangeToText('#greenRange', '#greenText')}, false );
$blueRangeJS.addEventListener( "input", function(){rangeToText('#blueRange', '#blueText')}, false );

///////////////////////////////////////////////////////////////
//   text affects range function, color, and hex
///////////////////////////////////////////////////////////////
//keep the #'s in there !!!
function textToRange(textObject, rangeObject){
	$(rangeObject).val( $(textObject).val() ) ;
	//and update color
	changeColor();
	//update hex too
	var r = $redText.val() ;
	var g = $greenText.val() ;
	var b = $blueText.val() ;
	var rgb = rgbToHex( r, g, b ) ;
	$("#hex").val( rgb ) ;
	
}

//Update range when text changes
$redText.change(function(){
	textToRange('#redText', '#redRange') ;
});

$greenText.change(function(){
	textToRange('#greenText', '#greenRange') ;
});

$blueText.change(function(){
	textToRange('#blueText', '#blueRange') ;
});



///////////////////////////////////////////////////////////////
//   Change color function
///////////////////////////////////////////////////////////////
function changeColor(){
	var r = $($redText).val()
	var g = $($greenText).val()
	var b = $($blueText).val()
	$(".selected").css('background', "rgb(" + r + "," + g+", " + b + ")");

}

///////////////////////////////////////////////////////////////
//  The Deleter aka The Destroyer of Color Worlds
///////////////////////////////////////////////////////////////
$("#deleteButton").click(function(){
	//selected class will be deleted
	$(".selected").remove();
	//reselect the first li element so that we have something selected
	$("li:first").addClass('selected') ;
	//This updates the range and text inputs when we default select the first
	updateInputsOnSelect( $('.selected').css('background-color') );
});


///////////////////////////////////////////////////////////////
// Selection Things
///////////////////////////////////////////////////////////////

//when a list item is clicked on
$("ul").on("click", "li", function(){
	//if the selected item is already selected, unselect
	if ($(this).hasClass('selected')) {
		$(this).removeClass('selected') ;
		//and turn off visibility for settingsBox
		$('#settingsBox').hide();
	}else{
		//remove selected class from whichever element holds it
		$(".selected").removeClass("selected")
		//assign that list the selected class
		$(this).addClass("selected");
		updateInputsOnSelect( $(this).css('background-color') );
		//show settingsBox
		$('#settingsBox').show();
	}
});

function updateInputsOnSelect( color ) {
	//update sliders and text input to match new selected color
	//to do this we need to retrieve the rgb() value
	//but it returns a string
	var whatTheColor = color;
	//so we need to strip the rgb() 
	var whatTheColor = whatTheColor.replace( 'rgb(', '') ;
	var whatTheColor = whatTheColor.replace( ')' ,'')  ;
	//and split it up into an array
	var selectedColor = whatTheColor.split(', ') ;
	//so now, selectedColor[0] = r value, selectedColor[1]=g value, etc
	//now that we have the values, we can do the actual update on the sliders
	$redRange.val( selectedColor[0] ) ;
	$redText.val( selectedColor[0] ) ;
	$greenRange.val( selectedColor[1] ) ;
	$greenText.val( selectedColor[1] ) ;
	$blueRange.val( selectedColor[2] ) ;
	$blueText.val( selectedColor[2] ) ;

	//update hex too
	var red = selectedColor[0];
	var green = selectedColor[1] ;
	var blue = selectedColor[2] ;
	var rgb = rgbToHex(red, green, blue) ;
	$("#hex").val( rgb ) ;
}
///////////////////////////////////////////////////////////////
//Add Color Button: Append to list
///////////////////////////////////////////////////////////////

function addColor(){
	//append a new item to list
	var $newColor = $("<li></li>");
	$("ul").append($newColor);
	//and have the new color selected
	$newColor.click();
}

$('#addColor').click(addColor);

///////////////////////////////////////////////////////////////
// RBG to HEX
///////////////////////////////////////////////////////////////
function rgbToHex(r,g,b){

	var rgb = [ r, g, b] ;
	var hex = [];
	for (var i=0; i<=2; ++i) {
		hex[i] = parseInt(rgb[i]).toString(16);
		if (rgb[i].length == 1) {
			hex[i] = '0' + rgb[i];
		}
	}

	var rgbString = (hex[0]+hex[1]+hex[2])
	return (rgbString.toUpperCase());

};

///////////////////////////////////////////////////////////////
// HEX to RGB
///////////////////////////////////////////////////////////////
function hexToRgb( hex ){

	var bigInt = hex;
	if (hex.length===3){
		var bigInt = ( hex[0]+hex[0] + hex[1]+hex[1] + hex[2]+hex[2] ) ;
	}

		var intThis = parseInt( bigInt, 16 );
		var r = (intThis >> 16) & 255 ;
		var g = (intThis >> 8) & 255 ;
		var b = intThis & 255 ;
		
	return [r, g, b];
}

$('#hex').change(function(){
	//get rgb value from hex
	var newRgb = hexToRgb($hexText.val()) ;
	//update the color range
	$redRange.val(newRgb[0]) ;
	$greenRange.val(newRgb[1]) ;
	$blueRange.val(newRgb[2]) ;
	//update the color text
	$redText.val(newRgb[0]) ;
	$greenText.val(newRgb[1]) ;
	$blueText.val(newRgb[2]) ;
	//update color
	changeColor();

});


