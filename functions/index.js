const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors')({ origin: true });

const NAMES = {
  'MustardPlug': '227252704223821824',
  'Bison': '127790547912884225',
  'Bomhab': '121073420480806913',
  'PartyPony': '302859433032155136',
  'meat4': '320350474744233984',
  'ItsFletchBro': '329767980818890752',
  'Ky Guy': '310783210244276227',
  'SgtGrim': '318115431628013570',
  'ButteredHippo': '345803021948551172'
}

function nameToId(name) {
  if (NAMES[name]) {
    return `<@${NAMES[name]}>`
  } else {
    return name
  }
}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.civWebhook = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const webhookUrl = 'fill me in'
    console.log(`Body: ${JSON.stringify(request.body)}`)
    console.log(`Query: ${JSON.stringify(request.query)}`)

    let nameVal = nameToId(request.body.value2)
    let gameName = request.body.value1
    let turnNum = request.body.value3
    let message = `Hey ${nameVal}, it's your turn #${turnNum} in ${gameName}!`
    console.log(`Sent message: ${message}`)

    if (nameVal && gameName && turnNum) {
      axios.post(webhookUrl, {
        "content": message
      }).then( () => {
        return response.send(message);
      }).catch( () => {
        return response.status(500).send("It broke!");
      })
      return response.send("ok")
    } else {
      console.error("missing inputs")
      return response.send("Missing inputs")
    }
  })
});
