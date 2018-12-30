var path = 'http://localhost/restApi/rest/'
var msgJson = [] //entfernen sobald post/add
var clubRankingExtension = "createResults.php"
var participantRankingExtension = "postPeriod.php"
var challengeCreationExtension = "createChallenges.php"

export default class DataService{
    static testMethod(param){
        console.log('test ' + param)
    }
    static post(json, msgType){
        var extendedPath = this.getExtendedPath(msgType)
        fetch(path + extendedPath,
                {
                    method: "POST",
                    body: json,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
    }

    static getParticipantRanking(year, result, sequence){
        const request = new XMLHttpRequest()
        request.open("GET", path + "bestFourDistancesParticipants.php?year=" + year + "&result=" + result + "&sequence=" + sequence, false)
        request.send(null)

        if(request.status === 200)
            return JSON.parse(request.responseText)
        else
            return "failure"
    }

    static getClubRanking(year, result, sequence){
        const request = new XMLHttpRequest()
        request.open("GET", path + "bestfourdistancesclubs.php?year=" + year + "&result=" + result + "&sequence=" + sequence, false)
        request.send(null)

        if(request.status === 200)
            return JSON.parse(request.responseText)
        else
            return "failure"
    }

    static getClubRankingNew(year, sequence){
        const request = new XMLHttpRequest()
        request.open("GET", 'http://localhost:8080/testserver/rs/sql/bestFourDistancesClubs/' + year + "/" + sequence, false)
        request.send(null)

        if(request.status === 200)
            return JSON.parse(request.responseText)
        else
            return "failure"
    }

    static getChallengeSessions(actualYear){
        const request = new XMLHttpRequest()
        request.open("GET", 'http://localhost:8080/testserver/rs/sql/getChallenge/' + actualYear, false)
        request.send(null)

        if(request.status === 200)
            return JSON.parse(request.responseText)
        else
            return "failure"
    }

    static getEmailNameList(){
        const request = new XMLHttpRequest()
        request.open("GET", 'http://localhost:8080/testserver/rs/sql/getEmailDistanceReference', false)
        request.send(null)

        if(request.status === 200)
            return JSON.parse(request.responseText)
        else
            return "failure"
    }

    static getAllChallenges(){
        const request = new XMLHttpRequest()
        request.open("GET", path + 'getallchallenges.php', false)
        request.send(null)

        if(request.status === 200)
            return JSON.parse(request.responseText)
        else
            return "failure"
    }

    static getEvidencePic(email, year, session){
        const request = new XMLHttpRequest()
        request.open("GET", 'http://localhost:8080/testserver/rs/sql/picSearch/' + this.email + '/' + this.year + '/' + this.session, false)
        request.send(null)

        if(request.status === 200)
            return JSON.parse(request.responseText)
        else
            return "failure"
    }

    static getExtendedPath(msgType){
        switch(msgType){
            case "periods":
                return clubRankingExtension
            case "period":
                return participantRankingExtension
            case "challenge":
                return challengeCreationExtension
            default:
                break
        }
    }
}