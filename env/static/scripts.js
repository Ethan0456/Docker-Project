// const receiveData = require('../socketio/socketio')

import { libraries } from './libraries_list.js';
import { packages } from './packages_list.js';
import { receiveData } from '../socketio/socketio.js';

const libraries_list = libraries;
const packages_list = packages;

const packageNames = document.getElementById("package-names");
const libraryNames = document.getElementById("library-names");

const librarySuggestionBox = document.getElementById('library-suggestion-box');
const packageSuggestionBox = document.getElementById('package-suggestion-box');

const librarySuggestionList = document.getElementById('library-suggestions');
const packageSuggestionList = document.getElementById('package-suggestions');

const selectedLibraries = document.getElementById('selected-libraries-box');
const selectedLibrariesList = document.getElementById('selected-libraries');

const selectedPackages = document.getElementById('selected-packages-box');
const selectedPackagesList = document.getElementById('selected-packages');

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

packageNames.addEventListener('input', () => {
  if (packageNames.value.length > 0) {
    const input = packageNames.value.toLowerCase();
    const matchingSuggestions = packages_list.filter(suggestion => suggestion.toLowerCase().startsWith(input));

    if (matchingSuggestions.length > 0) {
      packageSuggestionList.innerHTML = '';
      matchingSuggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('li');
        suggestionItem.setAttribute("style", "display:inline;")
        suggestionItem.textContent = suggestion;

        suggestionItem.addEventListener('click', () => {
          if (!selected_packages_list.includes(suggestionItem.textContent)) {
            console.log("I am not in the list!")
            selectedPackagesList.appendChild(suggestionItem);

            selected_packages_list.push(suggestionItem.textContent);
          } else {
            deleteitem(selected_packages_list, suggestionItem.textContent);
            removeItemFromHtmlList(selectedPackagesList, suggestionItem.textContent);
          }

          if (selected_packages_list.length > 0) {
            selectedPackages.style.display = 'block';
            selectedPackagesList.style.display = 'block';
          } else {
            selectedPackages.style.display = 'none';
            selectedPackagesList.style.display = 'none';
          }

          packageSuggestionBox.style.display = 'none';
          packageNames.value = "";
          console.log(selected_packages_list);
        });
        packageSuggestionList.appendChild(suggestionItem);
      });
      packageSuggestionBox.style.display = 'block';
    } else {
      packageSuggestionBox.style.display = 'none';
    }
  }
});

libraryNames.addEventListener('input', () => {
  if (libraryNames.value.length > 0) {
    const input = libraryNames.value.toLowerCase();
    const matchingSuggestions = libraries_list.filter(suggestion => suggestion.toLowerCase().startsWith(input));

    if (matchingSuggestions.length > 0) {
      librarySuggestionList.innerHTML = '';
      matchingSuggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('li');
        suggestionItem.setAttribute("style", "display:inline;")
        suggestionItem.textContent = suggestion;

        suggestionItem.addEventListener('click', () => {
          if (!selected_libraries_list.includes(suggestionItem.textContent)) {
            console.log("I am not in the list!")
            selectedLibrariesList.appendChild(suggestionItem);

            selected_libraries_list.push(suggestionItem.textContent);
          } else {
            deleteitem(selected_libraries_list, suggestionItem.textContent);
            removeItemFromHtmlList(selectedLibrariesList, suggestionItem.textContent);
          }

          if (selected_libraries_list.length > 0) {
            selectedLibraries.style.display = 'block';
            selectedLibrariesList.style.display = 'block';
          } else {
            selectedLibraries.style.display = 'none';
            selectedLibrariesList.style.display = 'none';
          }

          librarySuggestionBox.style.display = 'none';
          libraryNames.value = "";
          console.log(selected_libraries_list);
        });
        librarySuggestionList.appendChild(suggestionItem);
      });
      librarySuggestionBox.style.display = 'block';
    } else {
      librarySuggestionBox.style.display = 'none';
    }
  }
});

// document.addEventListener('click', (event) => {
//   if (!librarySuggestionBox.contains(event.target)) {
//     librarySuggestionBox.style.display = 'none';
//   }
// });

// document.addEventListener('click', (event) => {
//   if (!packageSuggestionBox.contains(event.target)) {
//     packageSuggestionBox.style.display = 'none';
//   }
// });

export function generateJson() {

  var base_image = document.getElementById('base-ubuntu').checked ? 'ubuntu:latest' : 'debian:latest'

  // var libraries_checkbox_list = document.querySelectorAll('input[name="libraries"]:checked')
  // var packages_checkbox_list = document.querySelectorAll('input[name="packages"]:checked')

  var tag = document.getElementById('tag').value
  var workdir = document.getElementById('workdir').value
  var exportport = document.getElementById('exportport').value

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
    "exportport": exportport,
    "packages": selected_packages_list,
    "libraries": selected_libraries_list
  }

  console.log(jsonObject)
  sendJsonToBackEnd(jsonObject)
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

function sendJsonToBackEnd(data) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/process_json', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      alert(response.message);
    }
  };
  xhr.send(JSON.stringify(data));
}

const processingBtn = document.getElementById('processing-btn');
const processingDialog = document.getElementById('processing-dialog');

processingBtn.addEventListener('click', function() {
  processingDialog.style.display = 'block';
  setTimeout(() => {
    processingDialog.classList.add('active');
  }, 100);
});

