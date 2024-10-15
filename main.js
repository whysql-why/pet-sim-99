
const readline = require('node:readline');
const axios = require('axios');
const fs = require('fs');
const sleep = require('system-sleep');


// You do not need any API keys for this.
// Only sending "GET" requests to the offical
// big games API. 

// as of 2024-10-15. The production URL is https://ps99.biggamesapi.io/.

// I HATE ASYNC callbacks. plz no



// const BASE_URL = "https://ps99.biggamesapi.io/api/";
// const CLAN_endpoints = ["clan/", "clansTotal/", "clansList/", "activeClanBattle"] 
// const collections_endpoints = ["collections", "collections/Pets", "exists", "rap"] 

// https://ps99.biggamesapi.io/image/<robloxID> this proxes the request to get the image. 
// Might need for a proper NodeJS app.
// Right now all is CLI. 

function startup() {
    console.log("Starting up, application.");
    console.log("Fetching Rap values.");



    axios.get('https://biggamesapi.io/api/rap')
    .then(response => {
        const data = response.data.data;
        console.log('done.')
        // write to file. else undefined. json format stright from the API! 
        try {
            fs.writeFileSync('data/rap.txt', JSON.stringify(data));
            console.log('RAP data stored.');
          } catch (err) {
            console.error('error:', err);
          }
    })
    console.log("Fetching clans.");


    axios.get('https://biggamesapi.io/api/clansList')
    .then(response => {
        const data = response.data.data;
        console.log('done.');
        try {
            fs.writeFileSync('data/clanlist.txt', JSON.stringify(data));
            console.log('CLAN data stored.');
          } catch (err) {
            console.error('error:', err);
          }
    })
    console.log("Fetching collections.")
    axios.get('https://ps99.biggamesapi.io/api/collections')
    .then(response => {
        const data = response.data.data;
        console.log('done.');
        try {
            fs.writeFileSync('data/collections.txt', JSON.stringify(data));
            console.log('Collections data stored.');
          } catch (err) {
            console.error('error:', err);
          }
        let alldata = 0;
        for (let i = 0; i < data.length; i++){
            // console.log(data[i]); <-- list the values of the collections.
            alldata = alldata + 1;
        }
        console.log("loaded: " + alldata + " collections.");
    })

    console.log("Fetching pet exists.")
    axios.get('https://ps99.biggamesapi.io/api/exists')
    .then(response => {
        const data = response.data.data;
        console.log('done.');
        try {
            fs.writeFileSync('data/exists.txt', JSON.stringify(data));
            console.log('Exists data stored.');
          } catch (err) {
            console.error('error:', err);
          }
    }) 
    //for (let i = 0; i < 5; i++) {
     //   ????
      //  }
}




// console.log(fetch(BASE_URL + CLAN_endpoints[0] + "CAT"));
// const clan_to_search = prompt("Enter a clan name to search for! ");
//const clan_info = get_clan(clan_to_search);
//console.log(clan_info);

startup()
function space(){
    for(let i = 0; i < 5; i++){
        console.log(" ");
    }
} // might be helpful in the future.

console.log("loaded.")
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function clansearch(clanname){
    axios.get('https://ps99.biggamesapi.io/api/clan/' + clanname)
    .then(response => {
        const data = response.data.data;
        try {
            fs.writeFileSync('data/' + clanname + '.txt', JSON.stringify(data));
            console.log(clanname + " was found!");
          } catch (err) {
            console.error('error:', err);
          }
    }) 
}

sleep(1000);
space();
space();
console.log(" Pet Sim 99 ");
console.log(" ");
console.log(" 1. Check RAP");
console.log(" 2. Lowest Huge");
console.log(" 3. Lowest Existing PET");
console.log(" 4. Search Clan");
rl.question("\n --> ", (answer) => {
    switch(answer) {
      case '1':
        console.log("RAP");
        rl.close();
        break;
      case '2':
        console.log("Lowest Huge");
        rl.close();
        break;
      case '3':
        console.log("Lowest Existing PET");
        rl.close();
        break;
      case '4':
        rl.question("\n Search Clan: ", (clanAnswer) => {
          console.log(`searching for ${clanAnswer}...`);
          clansearch(clanAnswer); //make that API call.
          rl.close();
        });
        break;
      default:
        console.log("bro, that is not an option :(");
        rl.close();
        break;
    }
  });