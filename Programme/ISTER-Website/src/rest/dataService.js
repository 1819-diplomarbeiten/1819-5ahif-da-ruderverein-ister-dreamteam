var path = 'http://localhost:8080/testserver/rs/sql/'
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
        fetch(path + 'postPeriods',
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
            fetch(path + 'postChallenge',
            {
                method: "POST",
                body: msgJson,
                headers: {
                    "Content-Type": "application/json"
                }
            })
    }

    static getPersonRanking(dropDownYear, dropDownResult, dropDownSequence){

        fetch(path + "bestFourDistancesParticipants/" + dropDownYear + "/" + dropDownResult + "/" + dropDownSequence, {
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