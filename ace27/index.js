var score_0 = "0 = None";
var score_1 = "1 = Mild";
var score_2 = "2 = Moderate";
var score_3 = "3 = Severe";
var score_9 = "9 = Unknown";
let totalIDList = [];
const gutter = td("", { class: "gutter" });

// Register event listener to know when we're able to generate markup
window.addEventListener("load", generateMarkup);

/**
 * Dynamically generate markup of the table based on JSON configuration (config.js)
 */
function generateMarkup() {
  // Once page is loaded, calculate all input IDs
  totalIDList = recurse(config, []);

  // For all systems in the configuration, create markup for them
  let tableMarkup = Object.keys(config).reduce(function (acc, sysHeader) {
    return (acc += markupForSystem(sysHeader));
  }, "");

  // Assign generated template at a given ID
  const clearFormButton = {
    value: "Clear form",
    onclick: "uncheckAll(this.form)",
    type: "button",
  };

  const resultBox = {
    disabled: true,
    placeholder: score_0,
    type: "input",
    id: "resultBox",
  };

  // tableMarkup +=
  //   tr(td("Overall Comorbidity Score", { class: "overall", colspan: "2" })) +
  //   tr(td(input(resultBox)) + td(input(clearFormButton)));

  document.getElementById("injected").innerHTML = tableMarkup;
}

/**
 * Make template for all relevant decompensation levels for a given body system
 * @param {Obj} sysHeader Object w all # categories per system
 */
function markupForSystem(sysHeader) {
  const sysObj = config[sysHeader];
  const header =
    gutter + // blank column on far left
    td(sysHeader, { class: "system-header" }) +
    td(sysObj.description || "", { class: "system-header" });

  let body = Object.keys(sysObj)
    .filter(function (k) {
      return k !== "description";
    })
    .reduce(function (acc, numHeader) {
      // Create number label in left column
      const left = td(p(span(numHeader)), { class: "number-header" });

      // For each number that's part of this body system, generate the 3 severties and all relevant input boxes
      const right = markupForNumericLevel(sysObj[numHeader]);

      // Wrap all the markup that we created for the right side in a td tag
      return (acc += tr(gutter + left + right));
    }, "");
  return tr(header) + tr(body);
}

/**
 * Make template for all relevant decompensation levels for a given numerical category (1., 2., 3. etc)
 * @param {Obj} numObj Object w all decompensation levels for given # category
 */
function markupForNumericLevel(numObj) {
  let unwrapped = Object.keys(numObj).reduce(function (acc, level) {
    // Generate colored header dynamically
    acc += decompensationTag(level);
    acc += markupForDecompLevel(numObj[level]);
    return acc;
  }, "");
  return td(unwrapped);
}

/**
 * Make template for all relevant input boxes for a given decompensation level
 * @param {Obj} levelObj Object representing the mild / moderate / severe decompensation object
 */
function markupForDecompLevel(levelObj) {
  return Object.keys(levelObj).reduce(function (acc, name) {
    let bulletList = "";
    let label = levelObj[name];
    if (typeof levelObj[name] !== "string") {
      bulletList = makeList(levelObj[name].bullets);
      label = levelObj[name].label;
    }
    let decompLevel = input({
      name: name,
      value: 1,
      onclick: "runcalc(this.form)",
      type: "checkbox",
    });
    decompLevel += span(label, { class: "input-wrapper" });
    decompLevel = p(decompLevel);
    decompLevel += bulletList;
    return acc + decompLevel;
  }, "");
}

/**
 * Create unordered list (ul; bullet points) HTML template
 * @param {Array} arr List of strings to make template for
 */
function makeList(arr) {
  let template = arr.reduce(function (acc, inList) {
    return (acc += "<li>" + inList + "</li>");
  }, "<ul class='list'>");
  return template + "</ul>";
}

function decompensationTag(level) {
  const info = {
    severe: "Grade 3: Severe Decompensation",
    moderate: "Grade 2: Moderate Decompensation",
    mild: "Grade 1: Mild Decompensation",
  };
  return p(info[level], { class: "grade-header " + level });
}

function a(tag, attrs) {
  attrs = attrs || {};
  tag = tag.slice(0, tag.length - 1);
  const stringifiedAttrs = Object.keys(attrs).reduce(function (a, i) {
    return (a += i + "='" + attrs[i] + "' ");
  }, " ");
  return tag + stringifiedAttrs.slice(0, stringifiedAttrs.length - 1) + ">";
}

function tr(c, attrs) {
  return a("<tr>", attrs) + c + "</tr>";
}

function td(c, attrs) {
  return a("<td>", attrs) + c + "</td>";
}

function tr(c, attrs) {
  return a("<tr>", attrs) + c + "</tr>";
}

function span(c, attrs) {
  return a("<span>", attrs) + c + "</span>";
}

function p(c, attrs) {
  return a("<p>", attrs) + c + "</p>";
}

function input(attrs) {
  return a("<input>", attrs);
}

function recurse(obj, old) {
  for (var k in obj) {
    if (typeof obj[k] === "object" && !obj[k].label) recurse(obj[k], old);
    else if (k !== "description") old.push(k);
  }
  return old;
}

function getGrade(grade) {
  // This function handles arrays and objects
  return totalIDList.filter(function (id) {
    return id.includes(grade);
  });
}

function runcalc(f) {
  // work on determining a score, then set it at the very end
  var working_score;
  let resultBox = document.getElementById("resultBox");
  // set working score to grade 9
  working_score = score_9;

  // Start off by checking Grade 1s and assigning a Score of 1.  Then check for more severe comorbidities that would override this
  if (getGrade(1).filter((box) => f[box].checked).length) {
    working_score = score_1;
  }

  // If any grade 3 boxes are checked...
  if (getGrade(3).filter((box) => f[box].checked).length) {
    resultBox.value = score_3;
    // If there's a 3 anywhere, stop checking bc max score is reached
    return;
  }

  // Goal: Get number of systems that contain a grade 2
  const grade2s = getGrade(2)
    // Select only checked grade 2 systems
    .filter((box) => f[box].checked)
    // Reduce the name down to just the "system" (initial) part
    .map(function (id) {
      return id.split("__")[0];
    })
    // Remove duplicates, since we want count of unique systems w grade 2
    .filter(function (system, i, _this) {
      return _this.indexOf(system) === i;
    }).length;

  /**
   * If there are grade2s in more than one system -> 3
   * If grade2s are contained to one system -> 2
   * If no grade2s, leave score how it was
   */
  working_score =
    grade2s > 1 ? score_3 : grade2s === 1 ? score_2 : working_score;

  resultBox.value = working_score;
  return;
}
function alert_score(f) {
  alert("Overall Comorbidity Score is " + f.ace_score.value);
  return false;
}
function uncheckAll(f) {
  for (i = 0; i < f.length; i++) f[i].checked = false;
}
/*
  access_num
  coders_inits
  onc_center
  seq_num

  get things working !!!
*/
