//The URIs of the REST endpoint
IUPS = "https://prod-45.eastus.logic.azure.com/workflows/d0ec84ed986f46c2af3b7895d447df3f/triggers/request/paths/invoke/api/v1/media?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=kP8teSNe9A_HE-0qngmtPZHc6-x3HkC9rijJr0DTrw8";
RAI = "https://prod-10.eastus.logic.azure.com/workflows/a28f3407b1254bbcb14e2989ef07e373/triggers/request/paths/invoke/api/v1/media?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=27fIJom0NYBOTPONkI7Uy9rCl92gSIYWWC9nbipvD_M";
DEL1 = "https://prod-07.eastus.logic.azure.com/workflows/189ecd4d912440648440329d8a1b4eec/triggers/request/paths/invoke/api/v1/media/"
DEL2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=1quXjPUU-yvSKoNKFgEX05k2Ths5_B95iBk9C8N_A7M"


BLOB_ACCOUNT = "https://com682blobstoragezm.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function () {

  //Run the get asset list function
  getImages();

  getMyImages();

  //Handler for the new asset submission button
  $("#subNewForm").click(function () {

    //Execute the submit new asset function
    submitNewAsset();

  });
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset() {

  document.querySelector('#subNewForm').disabled = true;

  //Create a form data object
  submitData = new FormData();

  //Get form variables and append them to the form data object
  submitData.append('FileName', $('#FileName').val());
  submitData.append('userID', $('#userID').val());
  submitData.append('userName', $('#userName').val());
  submitData.append('File', $("#UpFile")[0].files[0]);

  //Post the form data to the endpoint, note the need to set the content type header
  $.ajax({
    url: IUPS,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function (data) {
      alert("Media Uploaded!");
      location.reload();
    }
  });

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages() {

  //Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> </span > ');

  $.getJSON(RAI, function (data) {

    //Create an array to hold all the retrieved assets
    var items = [];
    var admin = window.admin;

    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each(data, function (key, val) {
      items.push("<div class='masonry-item card text-dark bg-light mb-3 p-1 m-2' style='width: 18rem;'>");
      items.push("<embed src='" + BLOB_ACCOUNT + val["filePath"] + "' class='card-img-top'>")
      items.push("<div class='card-body'><h5 class='card-title'>" + val["fileName"] + "</h5>");
      items.push("<p class='card-text'>Uploaded by: " + val["userName"] + "</p>");
      if (admin){
        items.push("<button type='button' id='" + val["id"] + "' class='btn btn-danger' onclick='deleteMedia(\"" + val["id"] + "\")'>Delete</button>")
      }
      items.push("</div></div>");

    });

    //Clear the assetlist div
    $('#ImageList').empty();

    //Append the contents of the items array to the ImageList Div
    $("<ul/>", {
      "class": "my-new-list",
      html: items.join("")
    }).appendTo("#ImageList");
  });

}

function getMyImages() {

  //Replace the current HTML in that div with a loading message
  $('#MyMediaList').html('<div class="spinner-border" role="status"><span class="sr-only"> </span > ');

  $.getJSON(RAI, function (data) {

    //Create an array to hold all the retrieved assets
    var items = [];
    var userid = window.userid;

    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each(data, function (key, val) {
      if (userid === val["userID"]) {
        items.push("<div class='masonry-item card text-dark bg-light mb-3 p-1 m-2' style='width: 18rem;'>");
        items.push("<embed src='" + BLOB_ACCOUNT + val["filePath"] + "' class='card-img-top'>")
        items.push("<div class='card-body'><h5 class='card-title'>" + val["fileName"] + "</h5>");
        items.push("<button type='button' id='" + val["id"] + "' class='btn btn-danger' onclick='deleteMedia(\"" + val["id"] + "\")'>Delete</button>")
        items.push("</div></div>");
      }

    });

    //Clear the assetlist div
    $('#MyMediaList').empty();

    //Append the contents of the items array to the MyMediaList Div
    $("<ul/>", {
      "class": "my-new-list",
      html: items.join("")
    }).appendTo("#MyMediaList");
  });

}

function deleteMedia(id) {

  document.querySelector("#"+id).disabled = true;

  var deleteUrl = DEL1 + id + DEL2

  $.ajax({
    url: deleteUrl,
    type: 'DELETE',
    success: function (data) {
      alert("Media Deleted!");
      location.reload();
    }
  });
}

