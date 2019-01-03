var path = 'http://localhost/restApi/rest/'
var pathTwo = 'http://localhost:8080/testserver/rs/sql/'

var clubDistanceExtension = "createResults.php"
var participantDistanceExtension = "postPeriod.php"
var challengeCreationExtension = "createChallenges.php"
var participantRankingExtension = "bestFourDistancesParticipants.php"
var clubRankingExtension = "bestFourDistancesClubs/"
var challengeSessionsExtension = "getChallenge/"
var emailNameExtension = "getEmailNameReference"
var allChallengesExtension = "getallchallenges.php"
var actualChallengeTimeExtension = "actualchallengetime.php"
var challengeStatusExtension = "challengestatus.php"
var picSearchExtension = "picSearch/"
var updateSessionDateExtension = "updateSessionDate/"

export default class DataService{
    static post(json, msgType){
        fetch(this.getRealPath(msgType),
                {
                    method: "POST",
                    body: json,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
    }

    static put(json, msgType){
        fetch(this.getRealPath(msgType), {
                method: "PUT",
                body: json,
                headers: {
                    "content-type": "application/json"
                }
            })
    }

    static get(msgType, jsonParams){
        const request = new XMLHttpRequest()
        request.open("GET", this.getRealPath(msgType, jsonParams), false)
        request.send(null)

        if(request.status === 200)
            return JSON.parse(request.responseText)
        else
            return "failure"
    }

    //david des musst du no implementieren, du bekommst an delete request, als parameter kriegst ah jahr und
    //von der challenge soll dann der gesamte eintrag gelöscht werden
    static delete(year){

    }

    static getRealPath(msgType, jsonParams){
        switch(msgType){
            case "periods":
                return path + clubDistanceExtension
            case "period":
                return path + participantDistanceExtension
            case "challenge":
                return path + challengeCreationExtension
            case "participant-ranking":
                return path + participantRankingExtension + "?year=" + jsonParams.year + "&result=" + jsonParams.result + "&sequence=" + jsonParams.sequence
            case "club-ranking":
                return pathTwo + clubRankingExtension + jsonParams.year + "/" + jsonParams.sequence    
            case "challenge-sessions":
                return pathTwo + challengeSessionsExtension + jsonParams.actualYear
            case "email-name":
                return pathTwo + emailNameExtension
            case "all-challenges":
                return path + allChallengesExtension
            case "evidence-pic":
                return pathTwo + picSearchExtension + jsonParams.email + '/' + jsonParams.year + '/' + jsonParams.session
            case "challenge-time":
                return path + actualChallengeTimeExtension
            case "challenge-status":
                return path + challengeStatusExtension
            case "session-date-update":
                return pathTwo + updateSessionDateExtension
            default:
                break
        }
    }
}