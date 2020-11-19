const pairsContainer = document.getElementById('pairs');
const form = document.getElementById('add-pair-form');
const input = document.getElementById('pair-input');
const deleteButton = document.getElementById('delete');
const sortByNameButton = document.getElementById('sort-by-name');
const sortByValueButton = document.getElementById('sort-by-value');
const showXMLButton = document.getElementById('show-xml');

//input validation using regular expressions
const isValid = function(string){
  return string.match(/^\w+\s*=\s*\w+$/i) !== null;
};

let pairs = [];
let currentId = 0;
const savePair = function(string) {
  const tokens = string.split('=');
  const name = tokens[0].trim();
  const value = tokens[1].trim();
  pairs.push({name: name, value: value, id: currentId}); 
  currentId++;
};


const selectedItems = [];
const selectItem = function(event) {
  const currentItem = event.target;
  currentItem.classList.toggle('selected');
  const currentItemId = currentItem.id;
  selectedItems[currentItemId] = !selectedItems[currentItemId];
};

const deleteSelectedItems = function () {
  pairs = pairs.filter(pair => !selectedItems[pair.id]);
  renderPairs(pairsContainer, pairs);
};
//sorting 
const sortByValue = function() {
  pairs = pairs.sort((itemA, itemB) => {
    if (itemA.value > itemB.value) { return 1}
    if (itemA.value < itemB.value) { return -1}
  });
  renderPairs(pairsContainer, pairs);
};

const sortByName = function() {
  pairs = pairs.sort((itemA, itemB) => {
    if (itemA.name > itemB.name) { return 1}
    if (itemA.name < itemB.name) { return -1}
  });
  renderPairs(pairsContainer, pairs);
};
//xml display
const showXML = function () {
  let xml = '<root>';
  pairs.forEach(pair =>{
    xml += `<item><name>${pair.name}</name><value>${pair.value}</value></item>`;
  });
  xml += '</root>';
  alert(xml)
};
//pairs rendering
const renderPairs = function(container, content) {
  container.innerHTML = "";
  content.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('pair');
    itemElement.id = item.id;
    itemElement.textContent = `${item.name} = ${item.value}`;
    itemElement.addEventListener('click', selectItem);
    container.append(itemElement);
  })
};
//input handling 
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const pair = input.value.trim();
  event.target.reset();
  if (isValid(pair)) {
    savePair(pair);
    renderPairs(pairsContainer, pairs);
  }
});

deleteButton.addEventListener('click', deleteSelectedItems);
sortByNameButton.addEventListener('click', sortByName);
sortByValueButton.addEventListener('click', sortByValue);
showXMLButton.addEventListener('click', showXML);
