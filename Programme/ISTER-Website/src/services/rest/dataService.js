var path = 'http://localhost/restApi/rest/'
var pathTwo = 'http://localhost:8080/testserver/rs/sql/'
var msgJson = [] //entfernen sobald post/add
var clubRankingExtension = "createResults.php"
var participantRankingExtension = "postPeriod.php"
var challengeCreationExtension = "createChallenges.php"

export default class DataService{
    static post(json, msgType){
        var realPath = this.getRealPath(msgType)
        fetch(realPath,
                {
                    method: "POST",
                    body: json,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
    }

    static get(msgType, jsonParams){
        console.log('get: ')
        console.log(msgType)
        console.log(jsonParams)
        const request = new XMLHttpRequest()
        request.open("GET", this.getRealPath(msgType, jsonParams), false)
        request.send(null)

        if(request.status === 200)
            return JSON.parse(request.responseText)
        else
            return "failure"
    }

    static getRealPath(msgType, jsonParams){
        switch(msgType){
            case "periods":
                return path + clubRankingExtension
            case "period":
                return path + participantRankingExtension
            case "challenge":
                return path + challengeCreationExtension
            case "participant-ranking":
                return path + "bestFourDistancesParticipants.php?year=" + jsonParams.year + "&result=" + jsonParams.result + "&sequence=" + jsonParams.sequence
            case "club-ranking":
                return pathTwo + "bestFourDistancesClubs/" +jsonParams.year + "/" + jsonParams.sequence    
            case "challenge-sessions":
                return pathTwo + 'getChallenge/' + jsonParams.actualYear
            case "email-name":
                return pathTwo + 'getEmailNameReference'
            case "all-challenges":
                return path + 'getallchallenges.php'
            case "evidence-pic":
                return pathTwo + 'picSearch/' + jsonParams.email + '/' + jsonParams.year + '/' + jsonParams.session
            case "challenge-time":
                return path + "actualchallengetime.php"
            case "challenge-status":
                return path + "challengestatus.php"
            default:
                break
        }
    }
}