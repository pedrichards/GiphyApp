var animals = ["rhinocerous", "platypus", "dingo", "armadillo", "aardvark"];

// Function for displaying movie data
function renderButtons() {

  // Deleting the movie buttons prior to adding new movie buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < animals.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("animal");
    a.addClass("btn btn-primary m-2");
    // Adding a data-attribute with a value of the movie at index i ?? or data-animal?
    a.attr({
      "data-animal": animals[i],
      "type": "button"
    });
    // Providing the button's text with a value of the movie at index i
    a.text(animals[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function (event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var animal = $("#animal-input").val().trim();
  // The movie from the textbox is then added to our array
  animals.push(animal);

  // calling renderButtons which handles the processing of our movie array
  renderButtons();
});


// Adding click event listen listener to all buttons
// $("button.animal").on("click", function () {
// Grabbing and storing the data-animal property value from the button
function displayAnimalGifs() {


  var animal = $(this).attr("data-animal");

  // Constructing a queryURL using the animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=qCOPrYAWNEfQOY4t6YJhfaaY1Ck8s2Vk&limit=10";
  //emptying contents of div holding gifs
  $("#gifs-appear-here").empty();
  // Performing an AJAX request with the queryURL
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .then(function (response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var animalDiv = $("<span>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var animalImage = $("<img>");
        var animalAnimation = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        animalImage.attr("src", results[i].images.fixed_height_still.url);
        animalImage.addClass("animal-fixed");
        animalAnimation.attr("src", results[i].images.fixed_height.url);
        animalAnimation.addClass("animal-animated");


        // animalDiv.css({
        //   "display": "inline",
        //   "position": "relative"
        // });
        // Appending the paragraph and image tag to the animalDiv
        animalDiv.append(p);
        animalDiv.append(animalImage);
        animalDiv.append(animalAnimation);
        //Adding class of animal-image to animalDiv
        animalDiv.addClass("animal-image m-2");
        // animalDiv.addClass("");
        //adding css properties to the animalDiv so they appear side by side
        $("animalDiv img").css('display', 'inline-block')
        // animalDiv.addClass("flex-parent");
        //hiding animalAnimation primarily
        animalAnimation.hide();
        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").append(animalDiv);
      }
    });
}

function changeGifs() {
  $(".animal-fixed", this).toggle();
  $(".animal-animated", this).toggle();

}
// Adding a click event listener to all elements with a class of "animal
$(document).on("click", ".animal", displayAnimalGifs);
// Adding a click event listener to all elements with a class of "animal
$(document).on("click", ".animal-image", changeGifs);


// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();