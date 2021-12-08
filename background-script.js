const BASE_URL = "https://hecker69.org/";
const BG_INCLUDE_FILES = [
  "index.html",
  "style.css", "background-animation.css",
  "background-script.js"
];
const BACKGROUND = document.getElementById("background");

for (let filename_inx in BG_INCLUDE_FILES) {
  const filename = BG_INCLUDE_FILES[filename_inx];
  fetch(BASE_URL + filename)
    .then((res) => {
      if (!res.ok) { return; }
      const text = res.text()
        .then(text => {
          const lines = text.split("\n");

          lines.reverse();
          lines.push("<!-- " + filename + " -->", "\n\n\n");

          addLines(lines);
        });
    });
}

let queue = [];
const addLines = (lines) => {
  queue.push(...lines)
  updateHtml();
}

const updateHtml = () => {
  while (queue.length > 0) {
    const line = queue.pop()

    let elem = document.createElement("p");
    elem.classList.add("background-line");
    elem.innerText = line;
    BACKGROUND.appendChild(elem);
  }
}
