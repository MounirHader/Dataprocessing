// Javascript warm-up exercises
//
// Pro-tip: just like any other programming exercise, tackle each
// problem in small steps while using a print function to check
// your progress. In javascript you use console.log(); to print
// to the javascript-console found in the "inspect-element" of your
// browser.
// Make sure to become familiar with debugging using console.log
// and the console!

var ApplePie = {
	creator : '',
	ingredients : []
};

// Exercise 1:

	creator = document.getElementById('header').getElementsByTagName('p')[0].textContent
	ApplePie.creator = creator

	ingredients = document.getElementById('ingredient-list').getElementsByTagName('li')

	for (i = 0, n = ingredients.length; i < n; i++){
		ApplePie.ingredients.push(ingredients[i].textContent)
	}

// Exercise 2:

for (var i = 0, n = ApplePie.ingredients.length; i < n; i++) {
	console.log(ApplePie.ingredients[i])
};


// Introduction to function callbacks:
// ------------- function callbacks using a for each loop -----------
// By now you should realize that everything in Javascript is an object
// and every object has properties, like the property "length" of an array.
//
// Realise also that functions themselves are objects! And can therefore be
// passed to other functions and executed later. This idea of passing on functions
// to other function is referred to as: using function callbacks.

// Function callbacks are extremely important in javascript. They're
// pretty much everywhere.

// A good example is the forEach loop in javascript
// Uncomment the following lines to use the forEach loop
// on your ingredient-list.

ApplePie.ingredients.forEach(function (element, index){
	console.log('a[' + index + '] ' + element);
});


// Notice that .forEach is a property of an array since it
// can be called upon using a dot (just like "ingredients" is a property
// of ApplePie). Notice also that forEach() is a function since
// it has brackets! Although technically we refer to function-properties
// as "methods", therefore technically speaking .forEach() is a method.
// Inside the brackets there is a call to an unnamed/anonymous function
// taking in two arguments. Using these two arguments, the array elements
// are printed.

// The idea of passing a function to another function becomes even more
// clear if we first declare the function. Like so:


function log(element, index) {
	console.log('a[' + index + '] ' + element);
};

ApplePie.ingredients.forEach(log);


// Exercise 3:
// ------ Changing html elements and using function callbacks ------
// We have seen the ability of DOM selection in javascript. We have also
// seen and used some essentials about javascript objects and their
// properties and methods.
// We have also seen that javascript functions are objects themselves and
// that they can be passed around to other functions/methods.

// This exercise combines this all to show the real power
// of javascript!

// We ask you to implement an on-click event to the img displayed on
// index.html.

// This event has to be a non-anonymous function, just like the function
// called log in our previous example. It has to print something to the console.

// Make a function that display's something in the console, this can be anything
// like "hello, world!"

var printtoconsole = function(){
	console.log("Hello, World!")
}

// Select the html element containing the img using javascript selectors.

img_element = document.getElementsByTagName("img")[0]

// Add an event to the html element containing the img using a javascript function.
// You will probably find .addEventListener() very usefull. Make sure to pass around
// your print function to the on-click event.

img_element.addEventListener("click", printtoconsole);


// Introduction to functions returning functions
// ------------------- function returns  -----------------

// Another consequence of functions being objects in javascript, is the ability
// to return functions inside functions.

// A good example is the following example:

function Create_printfunction(input) {
	var message = 'Thank you for the recipe, ' + input.creator
	return function(another_message){
		console.log(message + another_message);
	}
}

var print_function = Create_printfunction(ApplePie);
print_function(' and thank you cs50 for our programming skills!')


// The function Create_printfunction has a return statement. However, it does
// not simply return a value like we are used to, but it returns a function.

// A function that itself requires an argument ("another_message"). Which it then
// concatenates with the already existing message!

// Notice how we can save the return value of Create_printfunction()
// just like any other return value.

// Notice also that we can use the newly created function like any other function
// by calling its name and the arguments: function_name(function_arguments).

// Exercise 4:
// ------------------- function returns  -----------------
// When creating a visualisation, for instance about a 400m tall mountain, you
// have to be aware that you can't draw a 400m tall image, well in most cases
// you can't.

// Therefore you have to scale down your subject/data to measurents you can deal
// with on your visualisation. For instance to the size of a piece of paper (if your
// image is represented on a piece of paper) or the size of your computer's monitor.

// Of course when dealing with web-based visualisation we deal with the size of our
// computer screen! Which is measured in pixels!

// Say we have to represent a timeline from the year 0 up till the year 2000.
// We would have to deal with a domain of 0-2000 years represented on some line in our
// visualisation.

// Imagine being able to draw this time-line with specific instructions on
// a canvas-like html element. Like you would do with a real canvas and a paint brush!
// You are actually able to do this, but more on that next-week!

// Just like on a real canvas, you probably would like start your time line somewhere
// in the middle of the canvas. At least not all the way to the left side of the
// canvas! Just to make it look pretty! Or maybe because you would like to put some
// extra information next to the timeline.

// So say we start our timeline 300px (pixels) from the left side. This extra white-
// space is often refered to as "padding". Then imagine making room for 500px
// for our time-line visualisation making sure we also have some "padding" on the
// right side of our time-line to make it look pretty. Our, so called range, is then
// 300-800.
// How would you determine how the data coordinates (domain: 0-2000) would relate to screen
// coordinates (range: 300-800)?

// Well the start of our timeline should relate to year 0: meaning the start of our
// domain should relate to the start of our range. Just like the maximum of our
// domain should relate tot the maximum of our range.

// Transforming data from a domain to a certain range, therefore determining
// where to put it in the visualisation, is a linear transformation.
// Which sounds more complicated then it actually is!

// Year 0 should relate to position 300. year 2000 should relate to position
// 300 + 500. Therefore each position should be at: (1/4) * x-value + 300.

// Does this make sense? Well, halfway our domain, at year 1000 we should be
// halfway our range: halfway the 500px time-line, meaning at position:
// 500/2 + 300 = 250 + 300 = 550px.

// Let's check if our formula does indeed bring us to pixel 550:
// (1/4) * 1000 + 300 = 250 + 300 = 550px

// So yes it does! Which makes sense because the 2000 years are scaled down
// with a factor of 1/4th and we start our visualisation at position 300!

// Are you confused at how we got to our scaling factor? Well it is the only
// unknown factor in the formula:
// screen-coordinate = scaling-factor * domain-coordinate + padding
// y = a * x + b
// 800-300 = a * (2000-0) + 300
// to calculate a, just use high school math to solve for a.

// Phew, That's a lot of information! And it would be a lot of calculations
// if we would do this in a graph consisting of an x-axis, y-axis or even
// multiple y-axes!

// It would even be considered bad design if we were to make a lot of functions
// calculating this transformation for each axis with hardcoded values.
// Luckily javascript is able to create functions for us.
// And we now know how to do this!

// Your goal in this exercise is to complete the calculations
// for both the scaling factor alpha, and the padding beta.
// The advantage of this function is that, because it is generic, it can be applied to any domain and range.
// Therefor you can call it for any axis that you create and you neither have to make calculations by hand nor hardcode any values.

function createTransform(domain, range){
	// domain is a two-element array of the domain's bounds
	// range is a two-element array of the range's bounds
	// implement the actual calculation here
	var beta = range[0] - domain[0];
	var alpha = range[1] / domain[1];

	return function(x){
		return alpha * x + beta;
	};
}

// to use this for instance:
var transform = createTransform([10, 20], [10, 20]);
console.log(transform(15)); //should return 15!!

// Make sure to test your createTransform function thouroughly
// and to become familiar with how it actually works, because
// you need it for the next 2 weeks!
