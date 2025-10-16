let arr = [];
let barsContainer = document.getElementById("bars");
let arrSize = document.getElementById("arr_sz");
let arrLength = arrSize.value;
let speed = document.getElementById("speed_input").value;

function createBars(num = arrLength) {
  barsContainer.innerHTML = "";
  arr = [];
  const totalWidth = 1200;
  const margin = 2; 
  const barWidth = Math.floor((totalWidth - num * margin * 2) / num);

  for (let i = 0; i < num; i++) {
    let val = Math.floor(Math.random() * 400) + 10;
    arr.push(val);
    let bar = document.createElement("div");
    bar.classList.add("bar", "yellow"); 
    bar.style.height = `${val}px`;
    bar.style.width = `${barWidth}px`;
    bar.style.margin = `0 ${margin}px`;
    barsContainer.appendChild(bar);
  }
}


arrSize.addEventListener("input", () => {
  arrLength = arrSize.value;
  createBars(arrLength);
});

document.getElementById("speed_input").addEventListener("input", (e) => {
  speed = e.target.value;
});

document.getElementById("newArray").addEventListener("click", () => createBars(arrLength));

createBars();

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function swap(el1, el2) {
  let temp = el1.style.height;
  el1.style.height = el2.style.height;
  el2.style.height = temp;
}

function setBarColor(bar, color) {
  bar.classList.remove("red", "green", "yellow", "orange");
  bar.classList.add(color);
}

// Bubble Sort
async function bubbleSort() {
  let bars = document.querySelectorAll(".bar");
  for (let i = 0; i < bars.length - 1; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      setBarColor(bars[j], "red");
      setBarColor(bars[j + 1], "red");
      await delay(speed);
      if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
        swap(bars[j], bars[j + 1]);
      }
      setBarColor(bars[j], "yellow");
      setBarColor(bars[j + 1], "yellow");
    }
    setBarColor(bars[bars.length - 1 - i], "green");
  }
  setBarColor(bars[0], "green");
}
document.getElementById("bubbleSort").addEventListener("click", bubbleSort);

// Selection Sort
async function selectionSort() {
  let bars = document.querySelectorAll(".bar");
  for (let i = 0; i < bars.length; i++) {
    let minIdx = i;
    setBarColor(bars[i], "red");
    for (let j = i + 1; j < bars.length; j++) {
      setBarColor(bars[j], "orange");
      await delay(speed);
      if (parseInt(bars[j].style.height) < parseInt(bars[minIdx].style.height)) {
        minIdx = j;
      }
      setBarColor(bars[j], "yellow");
    }
    swap(bars[i], bars[minIdx]);
    setBarColor(bars[minIdx], "yellow");
    setBarColor(bars[i], "green");
  }
}
document.getElementById("selectionSort").addEventListener("click", selectionSort);

// Insertion Sort
async function insertionSort() {
  let bars = document.querySelectorAll(".bar");
  setBarColor(bars[0], "green");
  for (let i = 1; i < bars.length; i++) {
    let j = i - 1;
    let keyHeight = parseInt(bars[i].style.height);
    setBarColor(bars[i], "red");
    await delay(speed);
    while (j >= 0 && parseInt(bars[j].style.height) > keyHeight) {
      bars[j + 1].style.height = bars[j].style.height;
      setBarColor(bars[j], "red");
      j--;
      await delay(speed);
      bars.forEach((b, idx) => {
        if (idx <= i) setBarColor(b, "yellow");
      });
    }
    bars[j + 1].style.height = `${keyHeight}px`;
    await delay(speed);
    for (let k = 0; k <= i; k++) setBarColor(bars[k], "green");
  }
}
document.getElementById("insertionSort").addEventListener("click", insertionSort);

// Quick Sort
async function partition(bars, low, high) {
  let pivotHeight = parseInt(bars[high].style.height);
  setBarColor(bars[high], "red");
  let i = low - 1;
  for (let j = low; j < high; j++) {
    setBarColor(bars[j], "orange");
    await delay(speed);
    if (parseInt(bars[j].style.height) < pivotHeight) {
      i++;
      swap(bars[i], bars[j]);
      setBarColor(bars[i], "orange");
      if (i !== j) setBarColor(bars[j], "orange");
      await delay(speed);
    }
    setBarColor(bars[j], "yellow");
  }
  swap(bars[i + 1], bars[high]);
  setBarColor(bars[high], "yellow");
  setBarColor(bars[i + 1], "green");
  await delay(speed);
  return i + 1;
}
async function quickSort(bars, low, high) {
  if (low < high) {
    let pi = await partition(bars, low, high);
    await quickSort(bars, low, pi - 1);
    await quickSort(bars, pi + 1, high);
  } else if (low >= 0 && high >= 0 && low < bars.length && high < bars.length) {
    setBarColor(bars[low], "green");
    setBarColor(bars[high], "green");
  }
}
document.getElementById("quickSort").addEventListener("click", async () => {
  disableButtons();
  let bars = document.querySelectorAll(".bar");
  await quickSort(bars, 0, bars.length - 1);
  bars.forEach(b => setBarColor(b, "green"));
  enableButtons();
});

// Merge Sort
async function mergeSortHelper(bars, l, r) {
  if (l >= r) return;
  let m = l + Math.floor((r - l) / 2);
  await mergeSortHelper(bars, l, m);
  await mergeSortHelper(bars, m + 1, r);
  await merge(bars, l, m, r);
}
async function merge(bars, l, m, r) {
  let n1 = m - l + 1;
  let n2 = r - m;
  let L = [], R = [];
  for (let i = 0; i < n1; i++) L.push(parseInt(bars[l + i].style.height));
  for (let j = 0; j < n2; j++) R.push(parseInt(bars[m + 1 + j].style.height));
  let i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    setBarColor(bars[k], "red");
    await delay(speed);
    if (L[i] <= R[j]) {
      bars[k].style.height = `${L[i++]}px`;
    } else {
      bars[k].style.height = `${R[j++]}px`;
    }
    setBarColor(bars[k], "green");
    k++;
  }
  while (i < n1) {
    bars[k].style.height = `${L[i++]}px`;
    setBarColor(bars[k], "green");
    k++;
  }
  while (j < n2) {
    bars[k].style.height = `${R[j++]}px`;
    setBarColor(bars[k], "green");
    k++;
  }
}
document.getElementById("mergeSort").addEventListener("click", async () => {
  let bars = document.querySelectorAll(".bar");
  await mergeSortHelper(bars, 0, bars.length - 1);
});

function disableButtons() {
  document.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
}
function enableButtons() {
  document.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
}
