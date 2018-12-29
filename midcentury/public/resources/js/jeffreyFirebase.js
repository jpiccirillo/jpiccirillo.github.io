// Initialize Firebase
var config = {
    apiKey: "AIzaSyAti0gZmtID7ftxvoeHE-SL4VCCaYxKqo8",
    authDomain: "example-a481a.firebaseapp.com",
    databaseURL: "https://example-a481a.firebaseio.com",
    projectId: "example-a481a",
    storageBucket: "example-a481a.appspot.com",
    messagingSenderId: "174775354997"
};
firebase.initializeApp(config);



var db = firebase.database();
// writeData();

// console.log("user id: " + firebase.auth().currentUser.uid);

function writeData(info) {
    console.log(info)

    var newInstance = db.ref(info.type).push();
    console.log(newInstance)
    var key = newInstance.key;

    newInstance.set(info);

}

function queryData(type, searchedFor) {
    var d = $.Deferred();
    var section = db.ref(type);
    var r = false;

    section.on("value", function(data) {
        data.forEach(function(innards) {
            if (searchedFor.toLowerCase() === innards.val().name.toLowerCase()) { r = true;}
        });
    });

    d.resolve(r)
    return d.promise();
}

$('#manufacturer').submit(function(e) {
    e.preventDefault();

    var values = {};
    values.type = "manufacturer"
    $.each($('#manufacturer').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    //prevent duplicate names even tho we're using uniqueIDs
    queryData(values.type, values.name)
        .then(function(duplicate) {
            console.log(duplicate)
            if (duplicate) {
                console.log("Already found a match for Manufacturer " + values.name +" in database")
            } else {
                writeData(values)
            }
        })
});
