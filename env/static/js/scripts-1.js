const packageNames = document.getElementById("package-names");
const libraryNames = document.getElementById("library-names");

const librarySuggestionList = document.getElementById('library-suggestions');
const packageSuggestionList = document.getElementById('package-suggestions');

const selectedLibraries = document.getElementById('selected-libraries-box');
const selectedLibrariesList = document.getElementById('selected-libraries');
const selectedLibrariesArray = Array.from(selectedLibrariesList.children);

const selectedPackages = document.getElementById('selected-packages-box');
const selectedPackagesList = document.getElementById('selected-packages');
const selectedPackagesArray = Array.from(selectedPackagesList.children);

const selected_libraries_list = []
const selected_packages_list = []

function deleteitem(list, item) {
  let index = list.indexOf(item);
  if (index > -1) {
    list.splice(index, 1);
    return 0
  }
  return 1
}

function removeItemFromHtmlList(list, itemText) {
  var items = list.querySelectorAll("li");
  for (var i = 0; i < items.length; i++) {
    if (items[i].textContent === itemText) {
      items[i].remove();
      break;
    }
  }
}


function generateJson() {

  var base_image = document.getElementById('base-ubuntu').checked ? 'ubuntu:latest' : 'debian:latest'

  // var libraries_checkbox_list = document.querySelectorAll('input[name="libraries"]:checked')
  // var packages_checkbox_list = document.querySelectorAll('input[name="packages"]:checked')

  var tag = document.getElementById('tag').value
  var workdir = document.getElementById('workdir').value
  var exposeport = document.getElementById('exposeport').value
  var imagename = document.getElementById('image-name').value

  // const selected_libraries = []
  // libraries_checkbox_list.forEach(checkbox => {
  //   selected_libraries_list.push(checkbox.value)
  // })

  // const selected_packages = []
  // packages_checkbox_list.forEach(checkbox => {
  //   selected_packages_list.push(checkbox.value)
  // })

  console.log("packages = ", selected_packages_list)
  console.log("libraries = ", selected_libraries_list)

  // Create JSON object
  var jsonObject = {
    "os": base_image,
    "tag": tag + ":latest",
    "workdir": workdir,
    "exposeport": exposeport,
    "image-name": imagename,
    "packages": selected_packages_list,
    "libraries": selected_libraries_list 
  }

  console.log(jsonObject)
  sendJsonToBackEnd(jsonObject, imagename)
}


function makePostRequest(url, data) {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Response:', data);
      debugger; // Pause execution here
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function sendJsonToBackEnd(data, filename) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/process_json', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
    }
  };
  xhr.send(JSON.stringify(data));


  // Call the checkFileStatus function every 5 seconds
  var checkInterval = setInterval(function() {
    checkFileStatus(filename+'.tar', checkInterval);
  }, 1000);
}

function downloadFile() {
  var filename = document.getElementById('image-name').value + ".tar";
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/download/' + filename, true);
  xhr.responseType = 'blob';
  xhr.onload = function() {
    if (this.status === 200) {
      var blob = new Blob([this.response], {type: 'application/octet-stream'});
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }
  };
  xhr.send();
}

// Define a function to check the status of the file creation process
function checkFileStatus(fileId, checkInterval) {
  // Make an AJAX request to your Flask backend to get the status of the file
  $.ajax({
    url: '/file_status',
    type: 'GET',
    data: { 'file_id': fileId },
    success: function(response) {
      // Check if the file is complete
      if (response.status == 'complete') {
        // Hide the progress bar dialog
        $('#processing-dialog').hide();
        $('#download-dialog').show();
        // Enable the download button
        $('#download-text').text('Here is your Personalised Docker Image, \n To install this image use command: \n docker load -i /path/to/tarfile');
        $('#download-btn').prop('disabled', false);
        // Update the download link to point to the generated file
        // $('#download-btn').attr('href', response.file_url);
        console.log("File is complete !!!, path : ", response.file_url)
        // Stop checking the file status
        clearInterval(checkInterval);
      }
      else {
        console.log("File is not complete")
      }
    },
    error: function(xhr, status, error) {
      console.error('Error checking file status:', error);
    }
  });
}
