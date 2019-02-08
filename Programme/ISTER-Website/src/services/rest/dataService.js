var path = 'http://localhost/restApi/rest/'
var pathTwo = 'http://localhost:8080/testserver/rs/sql/'

var emailExists = "emailExists.php"
var clubDistanceExtension = "createResults.php"
var participantDistanceExtension = "postPeriod.php"
var challengeCreationExtension = "createChallenges.php"
var participantRankingExtension = "bestFourDistancesParticipants.php"
var clubRankingExtension = "bestFourDistancesClubs/"
var challengeSessionsExtension = "getChallenge/"
var emailNameExtension = "getEmailNameReference"
var allChallengesExtension = "getallchallenges.php"
var actualChallengeTimeExtension = "actualchallengetime.php"
var challengeStatusExtension = "challengeStatus"
var picSearchExtension = "picSearch/"
var updateSessionDateExtension = "updateSessionDate/"
var deleteSingleChallengeExtension = "blablabla"
var dataFormExtension = "createParticipant.php"
var allClubsExtension = "getAllClubs.php"
var getDataExtension = "getDataByParticipant/"
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

    //david da musst du no oben den pfad umändern
    static delete(msgType, jsonParams){
        fetch(this.getRealPath(msgType), {
            method: "DELETE",
            body: jsonParams,
            headers: {
                "content-type": "application/json"
            }
        })
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
                return pathTwo + challengeStatusExtension + "/" + jsonParams.email
            case "session-date-update":
                return pathTwo + updateSessionDateExtension
            case "delete-single-challenge":
                return path + deleteSingleChallengeExtension
            case "email-exists":
                return path + emailExists + "?email=" +jsonParams.email
            case "data-form":
                return path + dataFormExtension
            case "all-clubs":
                return path + allClubsExtension
            case "data-participant":
                return pathTwo + getDataExtension + jsonParams.email
            default:
                break
        }
    }
}