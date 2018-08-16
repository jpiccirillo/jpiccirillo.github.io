var ref = firebase.database().ref("main"),
    usersRef = ref.child('users');

function push() {

    var object = {
        email: $("#inputEmail4").val(),
        // number: $("#number").val(),
        address: $("#inputAddress").val(),
        city: $("#inputCity").val(),
        state: $("#inputState").val()
    }

    return new Promise(function(resolve, reject) {
        usersRef.push(object).then(resolve, reject);
    });
};

usersRef.limitToLast(1).on('child_added', function(childSnapshot) {
  // Get the recommendation data from the most recent snapshot of data
  // added to the recommendations list in Firebase
  recommendation = childSnapshot.val();

  // Update the HTML to display the recommendation text
  $("#title").html(recommendation.email)
  $("#presenter").html(recommendation.address)
  $("#link").html(recommendation.state)

});

function query(callback) {
    retval = [];

    usersRef.orderByKey().on('value', function(snap) {

        snap.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
            retval.push(item);
        });
        callback(retval)
    })
}

function callback1(data) {
    console.log(data[4])
}



// push(object);
// query(callback1)
$("#recommendationForm").submit(push);
