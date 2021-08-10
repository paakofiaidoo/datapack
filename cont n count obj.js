const FileSystem = require("fs");
const Countries = require("./countries.json");
const data = Countries.data;

let newData = [];

data.map((country, i) => {
  let { name, continent } = country;
  if (i === 0) {
    let firstNode = continent;
    delete country.continent;
    delete country.ACL;
    delete country.createdAt;
    delete country.updatedAt;

    firstNode.countries = [country];
    newData.push(firstNode);
  } else if (newData.some((x) => continent.name === x.name)) {
    newData.map((cont) => {
      if (cont.name === continent.name) {
        delete country.continent;
        delete country.ACL;
        delete country.createdAt;
        delete country.updatedAt;
        cont.countries.push(country);
      }
    });
  } else {
    let nextNode = continent;
    delete country.continent;
    delete country.ACL;
    delete country.createdAt;
    delete country.updatedAt;
    nextNode.countries = [country];
    newData.push(nextNode);
  }
});

newData = newData.map((node) => {
  let { countries } = node;
  countries = countries.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return node;
});
console.log(newData);
newData.forEach(({ countries, name }) => {
  console.log("\n", name);
  countries.forEach((country) => {
    country.cities.results.forEach((city) => {
      delete city.province;
    });
    console.log(name);
  });
});

FileSystem.writeFile(
  "cont n count obj.json",
  JSON.stringify(newData),
  (error) => {
    if (error) throw error;
  }
);
