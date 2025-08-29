import { pokemons } from './pokemons.js';
import { urls } from './urls.js';
function autocomplete(inp, arr, sub, img, selec, urls) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          var dexNum = arr.indexOf(this.getElementsByTagName("input")[0].value) + 1;
          img.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + dexNum + ".png"

          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    const imageInicial = document.getElementById('image');
    if (imageInicial) {
      imageInicial.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + getRandomInt(1, pokemons.length+1) + ".png"; // ou qualquer valor que quiser exibir
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    const urlCaseVazia = document.getElementById('submit');
    if (urlCaseVazia) {
      urlCaseVazia.href = urls[urls.length-1]; // ou qualquer valor que quiser exibir
    }
  });
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
  selec.addEventListener("change", function (e) {
    var value = inp.value;
    var selecValue = selec.options[selec.selectedIndex].value;
    if (selecValue == '0' || selecValue == '8') {
      sub.href = urls[selecValue];
    } else {
      var indexDex = pokemons.indexOf(value) + 1;
      if (indexDex < 100) {
        indexDex = indexDex.toString()
        if (indexDex < 10) {
          indexDex = "0" + indexDex;
        }
        indexDex = "0" + indexDex;
      }
      sub.href = urls[selecValue];
    }
  });
  sub.addEventListener("click", function (e) {
    var value = inp.value;

    var selecValue = selec.options[selec.selectedIndex].value;
    if (selecValue == '0' || selecValue == '8') {
      sub.href = sub.href + value.toLowerCase();
    } else {
      var indexDex = pokemons.indexOf(value) + 1;
      if (indexDex < 100) {
        indexDex = indexDex.toString()
        if (indexDex < 10) {
          indexDex = "0" + indexDex;
        }
        indexDex = "0" + indexDex;
      }
      sub.href = sub.href + indexDex + '.shtml';
    }
  });
}
function getRandomInt(min, max) {
  min = Math.ceil(min); // Ensure min is an integer
  max = Math.floor(max); // Ensure max is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(
  document.getElementById("myInput"),
  pokemons,
  document.getElementById("submit"),
  document.getElementById("image"),
  document.getElementById("generations"),
  urls
);