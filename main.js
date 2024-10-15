
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
function space(number){
    for(let i = 0; i < number; i++){
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
            fs.writeFileSync('data/clans/' + clanname + '.txt', JSON.stringify(data));
            console.log(clanname + " was found!");
          } catch (err) {
            console.error('error:', err);
          }
    }) 
}

sleep(1000);
space(5);
space(5);
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
        console.log("Obtaining current list of Lowest Existing Pet!!!");
        console.log("\n================================================\n");
        fs.readFile('data/exists.txt', 'utf8', (err, data) => {
            const converted = JSON.parse(data);
            converted.sort((a, b) => a.value - b.value); //convertionnnnnnnnnnnnnnnnnnnn
            const lowexist = converted.slice(0, 10).map(item => ({
                id: item.configData.id,
                value: item.value})); //skided from another project ez !!
           // console.log('lowest existing pets:', lowexist);
            let value = 0;
            for (let i = 0; i < lowexist.length; i++){
                value = value + 1;
                console.log(value, lowexist[i].id, " [", lowexist[i].value, "]");
            }
            console.log("\n================================================\n");
        });
        rl.close();
        break;
      case '4':
        rl.question("\n Search Clan: ", (clanAnswer) => {
          console.log(` Searching for ${clanAnswer}...`);
          clansearch(clanAnswer); //make that API call.
          fs.readFile('data/clans/' + clanAnswer + '.txt', 'utf8', (err, data) => { // find the data.
            if (err) {
              console.error(err); // error reading file ?
              return error(err);
            }
            converted = JSON.parse(data); // forgot to parse json.
            console.log("============================");
            console.log("   " + clanAnswer + "   ");
            const desc = converted.Desc;
            const created = new Date(converted.Created * 1000);
            console.log(`" ${desc} "`);
            space(1)
            console.log(`Created: ${created}"`);
            let members = 0;
            console.log("\nClan member IDS:\n")
            for (let i = 0; i < converted.Members.length; i++){
                if(converted.Members[i].PermissionLevel == 50){
                    console.log("- [MEMBER] " + converted.Members[i].UserID);
                }
                if(converted.Members[i].PermissionLevel == 90){
                    console.log("- [OFFICER] " + converted.Members[i].UserID);
                }else{
                    members = members + 1;
                }
            }
            console.log("Members: " + members);
            const diamonds = converted.DepositedDiamonds
            const status = [converted.Status, converted.StatusUsername, converted.StatusTimestamp]
            console.log("Deposited Diamonds: " + diamonds);
            const time = new Date(status[2] * 1000);
            const country = converted.CountryCode
            console.log("Country: " + country);
            console.log(`"${status[0]} " ~ ${status[1]} | [${time}]`);
            // BELOW IS NOT recommended. 
            //axios.get('https://users.roblox.com/v1/users/' + status[1])
            //.then(response => {
            //    const username = response.name;
            //   try {
            //        fs.writeFileSync('data/usernames' + '.txt', JSON.stringify(data));
            //        //console.log(data + " data stored. To file.");
            //        console.log(`"${status[0]} " - ${username} [${time}]`);
            //      } catch (err) {
            //        console.error('error:', err);
            //      }
            //}) 
            // https://users.roblox.com/v1/users/ for Id to username.
          rl.close();
        })});
        break;
      default:
        console.log("bro, that is not an option :(");
        rl.close();
        break;
    }
  });