var path = 'http://localhost/restApi/rest/'
var returnV = []
var msgJson = []
export default class DataService{

    static postPeriod(distance, evidencePic){
        msgJson = "{\"distance\":" + distance + ",\"evidencePic\":\"" + evidencePic + "\"}";
        fetch(path + 'postPeriod',
                {
                    method: "POST",
                    body: msgJson,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
    }

    static postPeriods(jsonObj){
        fetch(path + 'createResults.php',
                    {
                        method: "POST",
                        body: jsonObj,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
    }

    static postChallenge(year, roundOne, roundTwo, roundThree, roundFour, roundFive, roundSix){
        msgJson = "{\"roundOne\":\"" + roundOne + "\",\"roundTwo\":\"" + roundTwo + "\",\"roundThree\":\"" + roundThree + "\",\"roundFour\":\"" + roundFour + "\",\"roundFive\":\"" + roundFive + "\",\"roundSix\":\"" + roundSix + "\",\"year\":\"" + year + "\"}";
            fetch(path + 'createChallenges.php',
            {
                method: "POST",
                body: msgJson,
                headers: {
                    "Content-Type": "application/json"
                }
            })
    }

    static getPersonRanking(year, result, sequence){

        fetch(path + "bestFourDistancesParticipants/" + year + "/" + result + "/" + sequence, {
            method: "GET"
        })
        .then((resp) => resp.json())
        .then(data => {
            console.log('data ' + data)
            returnV = data
            console.log(returnV)
            return returnV
        })
        /*console.log('returnV')
        return returnV*/
    }
}