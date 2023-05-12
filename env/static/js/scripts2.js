const packageNames = document.getElementById("package-names");
const libraryNames = document.getElementById("library-names");

const librarySuggestionBox = document.getElementById('library-suggestion-box');
const packageSuggestionBox = document.getElementById('package-suggestion-box');


console.log("I am in the scripts-2.js file")
packageNames.addEventListener('input', () => {
  console.log("I am in the packageNames event listener")
  if (packageNames.value.length > 0) {
    const input = packageNames.value.toLowerCase();
    const matchingSuggestions = packages_list.filter(suggestion => suggestion.toLowerCase().startsWith(input));
    matchingSuggestions = matchingSuggestions.slice(0,5);
    console.log("Well this is an update")
    console.log("Fuck This Shit, I don't like Web Dev 😭")

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

const processingBtn = document.getElementById('processing-btn');
const processingDialog = document.getElementById('processing-dialog');

processingBtn.addEventListener('click', function() {
  processingDialog.style.display = 'block';
  setTimeout(() => {
    processingDialog.classList.add('active');
  }, 100);
});

document.addEventListener('click', (event) => {
  if (!librarySuggestionBox.contains(event.target)) {
    librarySuggestionBox.style.display = 'none';
  }
});

document.addEventListener('click', (event) => {
  if (!packageSuggestionBox.contains(event.target)) {
    packageSuggestionBox.style.display = 'none';
  }
});

const packages_list = [
  "neofetch",
  "python",
  "python-pip"
]

const libraries_list =[
  "appnope",
  "asttokens",
  "backcall",
  "black",
  "brotlipy",
  "catboost",
  "category-encoders",
  "certifi",
  "cffi",
  "charset-normalizer",
  "click",
  "cloudpickle",
  "colorama",
  "comm",
  "conda",
  "conda-content-trust",
  "conda-package-handling",
  "conda_package_streaming",
  "contourpy",
  "convertdate",
  "cryptography",
  "cycler",
  "Cython",
  "dask",
  "debugpy",
  "decorator",
  "Deprecated",
  "distributed",
  "docker",
  "evalml",
  "executing",
  "featuretools",
  "Flask",
  "fonttools",
  "fsspec",
  "graphviz",
  "HeapDict",
  "hijri-converter",
  "holidays",
  "idna",
  "imageio",
  "imbalanced-learn",
  "importlib-metadata",
  "importlib-resources",
  "ipykernel",
  "ipython",
  "ipywidgets",
  "itsdangerous",
  "jedi",
  "Jinja2",
  "joblib",
  "jupyter_client",
  "jupyter_core",
  "jupyterlab-widgets",
  "kaleido",
  "kiwisolver",
  "korean-lunar-calendar",
  "lazy_loader",
  "lightgbm",
  "lime",
  "llvmlite",
  "locket",
  "markdown-it-py",
  "MarkupSafe",
  "matplotlib",
  "matplotlib-inline",
  "mdurl",
  "msgpack",
  "mypy-extensions",
  "nest-asyncio",
  "networkx",
  "nlp-primitives",
  "nltk",
  "numba",
  "numpy",
  "packaging",
  "pandas",
  "parso",
  "partd",
  "pathspec",
  "patsy",
  "pexpect",
  "pickleshare",
  "Pillow",
  "pip",
  "platformdirs",
  "plotly",
  "pluggy",
  "pmdarima",
  "prompt-toolkit",
  "psutil",
  "ptyprocess",
  "pure-eval",
  "pyaml",
  "pycosat",
  "pycparser",
  "pyftpdlib",
  "Pygments",
  "PyMeeus",
  "pyOpenSSL",
  "pyparsing",
  "PySocks",
  "python-dateutil",
  "pytz",
  "PyWavelets",
  "PyYAML",
  "pyzmq",
  "ranger",
  "regex",
  "requests",
  "rich",
  "ruamel.yaml",
  "ruamel.yaml.clib",
  "scikit-image",
  "scikit-learn",
  "scikit-optimize",
  "scipy",
  "seaborn",
  "setuptools",
  "shap",
  "shell-gpt",
  "six",
  "sktime",
  "slicer",
  "sortedcontainers",
  "stack-data",
  "statsmodels",
  "tblib",
  "tenacity",
  "texttable",
  "threadpoolctl",
  "tifffile",
  "tokenize-rt",
  "tomli",
  "toolz",
  "tornado",
  "tqdm",
  "traitlets",
  "typer",
  "urllib3",
  "vowpalwabbit",
  "watchdog",
  "wcwidth",
  "websocket-client",
  "Werkzeug",
  "wheel",
  "widgetsnbextension",
  "woodwork",
  "wrapt",
  "xgboost",
  "zict",
  "zipp",
  "zstandard",
]