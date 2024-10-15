
const readline = require('node:readline');
const axios = require('axios');
const fs = require('fs');

// You do not need any API keys for this.
// Only sending "GET" requests to the offical
// big games API. 

// as of 2024-10-15. The production URL is https://ps99.biggamesapi.io/.


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });



const BASE_URL = "https://ps99.biggamesapi.io/api/";
const CLAN_endpoints = ["clan/", "clansTotal/", "clansList/", "activeClanBattle"] 
const collections_endpoints = ["collections", "collections/Pets", "exists", "rap"] 

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
        let alldata = 0;
        for (let i = 0; i < data.length; i++){
            // console.log(data[i]); <-- list the values of the collections.
            alldata = alldata + 1;
        }
        console.log("loaded: " + alldata + " collections.");
    })



    //for (let i = 0; i < 5; i++) {
     //   console.log("The number is " + i);
      //  }

}




// console.log(fetch(BASE_URL + CLAN_endpoints[0] + "CAT"));
// const clan_to_search = prompt("Enter a clan name to search for! ");
//const clan_info = get_clan(clan_to_search);
//console.log(clan_info);

startup()