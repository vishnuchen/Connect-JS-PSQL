
const settings = require("./settings"); // settings.json

const person = process.argv[2];

const knex = require('knex')({
  client: 'pg',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
  }
});

knex.select('first_name', 'last_name', knex.raw('TO_CHAR(birthdate, \'YYYY-MM-DD\')AS newbirthday')).from("famous_people").where("first_name", person)
.then(function(result) {
  let count = 0;

  console.log('Searching .....')
  console.log(`Found ${result.length} person(s) by the name '${person}'`)

  result.forEach( person => {
    count ++
    let firstName = person.first_name;
    let lastName = person.last_name;
    let birthdate = person.newbirthday;
    console.log(`- ${count}: ${firstName} ${lastName}, born '${birthdate}'`);
  knex.destroy();
});
});
;

