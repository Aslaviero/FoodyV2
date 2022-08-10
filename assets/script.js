//global variables
var spoonAPI = '51070bf02459445cb28205ccc4e24c4c'
var totalData = [];
let recipeDiv = document.getElementById("recipe-div");

// .on("click") function associated with the Search Button
$("#submit-btn").on("click", function (event) {
  event.preventDefault();

  var protein = $("#protein").val().trim(); //main protein, cuisine, diet
  //following items are not required but do change the search parameters
  var carbs = $("#carbs").val().trim();
  var veggies = $("#veggies").val().trim();
  // var other = $("#other").val().trim();

  var urlTag = protein + "+" + carbs + "+" + veggies;
  var spoonUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + spoonAPI + "&query=" + urlTag
  var mealDbUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + protein
  console.log(spoonUrl);
  console.log(mealDbUrl);

  fetch(spoonUrl)
    .then((response) => response.json())
    .then(data => {
      console.log(data);
      var recipeID = data.results[0].id

      var recipeTitle = document.createElement("h2");
      document.getElementById("foodtitle").appendChild(recipeTitle);
      recipeTitle.textContent = data.results[0].title;

      recipe(recipeID)
    })
    .catch(error => {
      console.log(error);
    });

    fetch(mealDbUrl)
    .then((response) => response.json())
    .then(data => {
      console.log(data);
      var imageOne = document.createElement("img");
      document.getElementById("foodpics").appendChild(imageOne);
      imageOne.setAttribute("src", data.meals[0].strMealThumb);
    })
    .catch(error => {
      console.log(error);
    });
});

//create list of recipe names and pictures

function recipe(recipeID) {
var idUrl = `https://api.spoonacular.com/recipes/${recipeID}/analyzedInstructions?apiKey=${spoonAPI}`

  console.log(`recipeFunction: ${idUrl}`)
  fetch(idUrl)
    .then((response) => response.json())
    .then(data => {
      console.log(data)
      var recipeInstructions = document.createElement("ol");
      document.getElementById("instructions").appendChild(recipeInstructions);

      for (let i = 0; i < data[0].steps.length; i++) {
        var recipeStep = document.createElement("li");
        recipeStep.textContent = data[0].steps[i].step;
        document.querySelector("#instructions ol").appendChild(recipeStep);
      }
     
      // recipeSection(data);
    })
    .catch(error => {
      console.log("Error");
    });
}