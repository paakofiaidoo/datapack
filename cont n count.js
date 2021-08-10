const FileSystem = require("fs");
const Countries = require("./countries.json");
const data = Countries.data;

let newData = [];

data.map(({ name, continent }, i) => {
  if (i === 0) {
    let firstNode = continent;
    firstNode.countries = [name];
    newData.push(firstNode);
  } else if (newData.some((x) => continent.name === x.name)) {
    newData.map((cont) => {
      if (cont.name === continent.name) {
        cont.countries.push(name);
      }
    });
  } else {
    let nextNode = continent;
    nextNode.countries = [name];
    newData.push(nextNode);
  }
});

newData = newData.map((node) => {
  let { countries } = node;
  countries = countries.sort();
  return node;
});
console.log(newData);

FileSystem.writeFile("cont n count.json", JSON.stringify(newData), (error) => {
  if (error) throw error;
});
