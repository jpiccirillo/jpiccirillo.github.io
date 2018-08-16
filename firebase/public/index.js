// Reference to the recommendations object in your Firebase database
var recommendations = firebase.database().ref("users");

// Save a new recommendation to the database, using the input in the form
var submitRecommendation = function() {

    // Get input values from each of the form elements
    var title = $("#talkTitle").val();
    var presenter = $("#talkPresenter").val();
    var link = $("#talkLink").val();

    // Push a new recommendation to the database using those values
    recommendations.push({
        "title": title,
        "presenter": presenter,
        "link": link
    });
};
// Get the single most recent recommendation from the database and
// update the table with its values. This is called every time the child_added
// event is triggered on the recommendations Firebase reference, which means
// that this will update EVEN IF you don't refresh the page. Magic.
function getRecommendations() {

    var pastVals = []
    recommendations.on('child_added', function(childSnapshot) {
        // Get the recommendation data from the most recent snapshot of data
        // added to the recommendations list in Firebase
        // console.log(childSnapshot.val())
        console.log(childSnapshot.val())
        pastVals.push(childSnapshot.val())
    })
    .then(function(pastVals) {
        console.log(pastVals)
    }, function(error) {
        console.log('error' + error);
        error(); // some error method
    });
}

// When the window is fully loaded, call this function.
// Note: because we are attaching an event listener to a particular HTML element
// in this function, we can't do that until the HTML element in question has
// been loaded. Otherwise, we're attaching our listener to nothing, and no code
// will run when the submit button is clicked.
// $(window).load(function() {
    // var pastVals = getRecommendations()
    // console.log(pastVals)
    // var test = [{}, {}]
    // coordinate()
    // console.log(pastvals)
    // if (pastVals) { console.log(pastVals) }
    // console.log(test)
    // $("#example-table").tabulator({
    //     columns: [{
    //             title: "Link",
    //             field: "link",
    //             sortable: true,
    //             width: 200
    //         },
    //         {
    //             title: "Presenter",
    //             field: "presenter",
    //             sortable: true,
    //         },
    //         {
    //             title: "Title",
    //             field: "title",
    //             sortable: true,
    //         }
    //     ],
    // });
    // $("#example-table").tabulator("setData", pastVals);

    // Find the HTML element with the id recommendationForm, and when the submit
    // event is triggered on that element, call submitRecommendation.
    // $("#recommendationForm").submit(submitRecommendation);

// });

async function coordinate() {
  // console.log('calling');
  var pastVals = await getRecommendations();
  console.log(pastVals);
  // expected output: "resolved"
}

coordinate();
