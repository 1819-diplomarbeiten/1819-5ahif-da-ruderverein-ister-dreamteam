//path to backend
var path = 'http://localhost/restApi/rest/'
var pathTwo = 'http://localhost:8080/testserver/rs/sql/'

//all extensions needed for communication with backend
var emailExists = "emailExists.php"
var clubDistanceExtension = "createResults.php"
var participantDistanceExtension = "postPeriod.php"
var challengeCreationExtension = "createChallenges.php"
var participantRankingExtension = "bestFourDistancesParticipants.php"
var clubRankingExtension = "bestFourDistancesClubs/"
var challengeSessionsExtension = "getChallenges.php"
var emailNameExtension = "getEmailNameReference"
var allChallengesExtension = "getallchallenges.php"
var actualChallengeTimeExtension = "actualchallengetime.php"
var challengeStatusExtension = "getEmailStatus.php"
var picSearchExtension = "picSearch/"
var updateSessionDateExtension = "updateSessionDate/"
var deleteSingleChallengeExtension = "blablabla"
var dataFormExtension = "createParticipant.php"
var allClubsExtension = "getAllClubs.php"
var getDataExtension = "getDataByParticipant/"
var getTranslationExtension = "getTranslation.php"

export default class DataService{
    //post request
    //json: data for body, msgType: to get right extension
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

    //put request
    //json: data for body, msgType: to get right extension
    static put(json, msgType){
        fetch(this.getRealPath(msgType), {
                method: "PUT",
                body: json,
                headers: {
                    "content-type": "application/json"
                }
            })
    }

    //get request
    //jsonParams: data for body, msgType: to get right extension
    static get(msgType, jsonParams){
        const request = new XMLHttpRequest()
        request.open("GET", this.getRealPath(msgType, jsonParams), false)
        request.send(null)
        if(request.status === 200){
            return JSON.parse(request.responseText)
        }
        else
            return "failure"
    }

    //delete request
    //jsonParams: data for body, msgType: to get right extension
    static delete(msgType, jsonParams){
        fetch(this.getRealPath(msgType), {
            method: "DELETE",
            body: jsonParams,
            headers: {
                "content-type": "application/json"
            }
        })
    }

    //creates the right path depending on msgType and path params
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
                return path + challengeSessionsExtension + "?year=" + jsonParams.actualYear
            case "email-name":
                return pathTwo + emailNameExtension
            case "all-challenges":
                return path + allChallengesExtension
            case "evidence-pic":
                return pathTwo + picSearchExtension + jsonParams.email + '/' + jsonParams.year + '/' + jsonParams.session
            case "challenge-time":
                return path + actualChallengeTimeExtension
            case "challenge-status":
                return path + challengeStatusExtension + "?email=" + jsonParams.email
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
            case "translation":
                return path + getTranslationExtension + "?language=" + jsonParams.language
            default:
                break
        }
    }
}