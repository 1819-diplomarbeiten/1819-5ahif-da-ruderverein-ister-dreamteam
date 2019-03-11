//path to backend
var path = 'http://localhost/restApi/rest/'
var pathTwo = 'http://localhost:8080/testserver/rs/sql/'

//all extensions needed for communication with backend
var emailExists = "emailExists.php"
var clubDistanceExtension = "createResults.php"
var participantDistanceExtension = "createResult.php"
var challengeCreationExtension = "createChallenges.php"
var participantRankingExtension = "bestFourDistancesParticipants.php"
var clubRankingExtension = "bestFourDistancesClubs.php"
var challengeSessionsExtension = "getChallenges.php"
var emailNameExtension = "getEmailNameReference.php"
var allChallengesExtension = "getallchallenges.php"
var actualChallengeTimeExtension = "actualchallengetime.php"
var challengeStatusExtension = "getEmailStatus.php"
var picSearchExtension = "picSearch/"
var updateSessionDateExtension = "updateSessionDate.php"
var deleteSingleChallengeExtension = "deleteChallenges.php"
var dataFormExtension = "createParticipant.php"
var allClubsExtension = "getAllClubs.php"
var getDataExtension = "getDataByParticipant.php"
var getTranslationExtension = "getTranslation.php"
var changeDistanceExtension = "changeDistance.php"
var allClubsReduced = "getClubsWithoutAdmin.php"
export default class DataService{

    //post request
    //json: data for body, msgType: to get right extension
    static async post(json, msgType){
        return await fetch(this.getRealPath(msgType),
                {
                    method: "POST",
                    body: json,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            .then(resp => {
                if(resp.status != 200)
                    return "failure"
                else
                    return "success"
            })
            .catch(err => {
                console.log(err)
                return "failure"
            })
    }

    //put request
    //json: data for body, msgType: to get right extension
    static async put(json, msgType){
        return await fetch(this.getRealPath(msgType), {
                method: "PUT",
                body: json,
                headers: {
                    "content-type": "application/json"
                }
            })
            .then(resp => {
                if(resp.status != 200)
                    return "failure"
                else
                    return "success"
            })
            .catch(err => {
                console.log(err)
                return "failure"
            })
    }

    //get request
    //jsonParams: data for body, msgType: to get right extension
    static async get(msgType, jsonParams){
        return await fetch(this.getRealPath(msgType, jsonParams))
                        .then(resp => {
                            if(resp.status == 200)
                                return resp
                            else
                                return "failure"
                        })
                        .then(resp => resp.json())
                        .catch(err => {
                            console.log(err)
                            return "failure"
                        })
    }

    //delete request
    //jsonParams: data for body, msgType: to get right extension
    static async delete(msgType, json){
        return await fetch(this.getRealPath(msgType), {
            method: "DELETE",
            body: JSON.stringify({
                "object": json
              }),
            headers: {
                "content-type": "application/json"
            }
        })
        .then(resp => {
            if(resp.status != 200)
                return "failure"
            else
                return "success"
        })
        .catch(err => {
            console.log(err)
            return "failure"
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
                return path + clubRankingExtension + "?year=" + jsonParams.year + "&sequence=" + jsonParams.sequence    
            case "challenge-sessions":
                return path + challengeSessionsExtension + "?year=" + jsonParams.actualYear
            case "email-name":
                return path + emailNameExtension
            case "all-challenges":
                return path + allChallengesExtension
            case "evidence-pic":
                return pathTwo + picSearchExtension + jsonParams.email + '/' + jsonParams.year + '/' + jsonParams.session
            case "challenge-time":
                return path + actualChallengeTimeExtension
            case "challenge-status":
                return path + challengeStatusExtension + "?email=" + jsonParams.email
            case "session-date-update":
                return path + updateSessionDateExtension
            case "delete-single-challenge":
                return path + deleteSingleChallengeExtension + "?year=" + jsonParams
            case "email-exists":
                return path + emailExists + "?email=" +jsonParams.email
            case "data-form":
                return path + dataFormExtension
            case "all-clubs": 
                return path + allClubsExtension
            case "data-participant":
                return path + getDataExtension + "?email=" + jsonParams.email
            case "translation":
                return path + getTranslationExtension + "?language=" + jsonParams.language
            case "all-clubs-reduced":
                return path + allClubsReduced
            case "change-distance":
                return path + changeDistanceExtension
            default:
                break
        }
    }
}