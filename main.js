
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


// https://users.roblox.com//docs/index.html
// ^^ might also be helpful idk maybe....

function check(pet){
  if(pet == 1){
    return "Golden"
  }
  if(pet == 2){
    return "Rainbow"
  } // lmao ? thats it. 
}

function formatvalue(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function pet_colors(number){
  if(number == 1){
    return "Blue";
  }
  if(number == 2){
    return "Purple";
  }
  if (number == 3){
    return "Red";
  }
  if(number == 4){
    return "Orange";
  }
  if(number == 5){
    return "Yellow";
  }
  if(number == 6){
    return "Green";
  }
}

function isHugeBanned(huge) {
  let banned = false; 

  const banned_huges = ["Rabbit", "Huge Anime Unicorn", "Huge Dog", "Huge Pirate Parrot", "Huge Gamer Shiba"]; // troll huges are banned.

  for (let i = 0; i < banned_huges.length; i++) {
      if (huge == banned_huges[i]) {
          banned = true;
          break;
      }
  }
  return banned;
}


function generate_huge_file() {
    fs.readFile('data/rap.txt', 'utf8', (err, data) => {
        if (err) throw err;

        const converted = JSON.parse(data);
        for (let i = 0; i < converted.length; i++) {
            if (converted[i].category == "Pet" && converted[i].configData.id.includes("Huge")) {
                // now the pet is a huge
                const value2 = formatvalue(converted[i].value);
                const pet = converted[i];
                const pet_color = pet_colors(pet.configData.cv);
                const variant = check(pet.configData.pt);
                      //console.log(lowrap[i].id, " [", lowrap[i].value, "]");
                      if (pet.configData.cv === undefined && !isHugeBanned(pet.configData.id)) { // no color
                        if (pet.configData.pt === undefined) {
                          console.log(pet.configData.id, "| ", value2);
                          try {
                            fs.appendFile('data/huges.txt', converted[i].configData.id + ":" + converted[i].value + "\n", (err) => {
                                if (err) throw err;
                                return null;
                            });
                          } catch (err) {
                            console.error('error:', err);
                          }
                        } else {
                          console.log(variant, pet.configData.id, "| ", value2);
                          try {
                            fs.appendFile('data/huges.txt', variant + " " + converted[i].configData.id + ":" + converted[i].value + "\n", (err) => {
                                if (err) throw err;
                                return null;
                            });
                          } catch (err) {
                            console.error('error:', err);
                          }
                        }
                      } else {
                        if (pet.configData.pt === undefined && !isHugeBanned(pet.configData.id)) {
                          console.log(pet.configData.id, "| Color:", pet_color, "| ", value2);
                          try {
                            fs.appendFile('data/huges.txt', pet_color + " " + converted[i].configData.id + ":" + converted[i].value + "\n", (err) => {
                                if (err) throw err;
                                return null;
                            });
                          } catch (err) {
                            console.error('error:', err);
                          }
                        } else {
                          if (!isHugeBanned(pet.configData.id)) {
                            console.log(pet.configData.id, "| Color:", pet_color, "|", variant, "|", value2);
                            try {
                              fs.appendFile('data/huges.txt', variant + " " + pet_color + " "+ converted[i].configData.id + ":" + converted[i].value + "\n", (err) => {
                                  if (err) throw err;
                                  return null;
                              });
                            } catch (err) {
                              console.error('error:', err);
                            }                          
                          } else {
                              console.log(" "); // banned ones
                          }
                        }
                      
                }
          }
        }
    });
  }

        //const converted = JSON.parse(data);
        //console.log(converted);
        //for (let i = 0; i < data.length; i++){
        //    if(converted[i].category == "Pet" && converted[i].configData.id.includes("Huge")){
        //        console.log(`${converted[i].configData.id}`);
        //    }
        //}
        //console.log("Huge Pets written to huge.txt");



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
        try {
          fs.writeFileSync('data/huges.txt', "\n", (err) => {
              if (err) throw err;
              return null;
          });
        } catch (err) {
          console.error('error:', err);
        }
        console.log("Lowest Huge");
        generate_huge_file();
        sleep(100);
        console.log("========================");
        console.log(" Sorting huges by value!");
        console.log("========================");
        sleep(5000);
        fs.readFile('data/huges.txt', 'utf8', (err, data) => {
          if (err) throw err;
      
          const lines = data.split('\n');
          const entries = [];
      
          lines.forEach(line => {
              const parts = line.split(':');
              if (parts.length === 2) {
                  const id = parts[0].trim();
                  const value = parseInt(parts[1].trim().replace(/,/g, ''), 10);
                  entries.push({ id, value });
              }
          });
      
          entries.sort((a, b) => a.value - b.value);
      
          const top10 = entries.slice(0, 10);
      
          top10.forEach(item => {
              console.log(`${item.id}, Worth: ${item.value.toLocaleString()}`);
          });
        });      
          
        //console.log(" ================== ");
        //console.log(cheapest_huge);
        //console.log(" ================== ");
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