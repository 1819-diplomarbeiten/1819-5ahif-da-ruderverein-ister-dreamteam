var translation = []
var path = 'http://localhost/restApi/rest/getTranslation.php?language='
var websiteHeaderKeys = ["headerCountdown", "headerDay", "headerHour", "headerMinutes", "headerSeconds", "headerStarts", "headerEnds"]
var overviewSelectorKeys = ["homeBtn", "distanceBtn", "ergoBtn", "clubRankingBtn", "participantRankingBtn", "loginBtn"]
var homeViewKeys = ["homeHeadline", "homeTextOne", "homeTextTwo", "homeTextThree"]
var ergoChallengeKeys = ["ergoHeadline", "ergoSubheadlineOne", "ergoTextOne", "ergoSubheadlineTwo", "ergoTextTwo", "session", "ergoSubheadlineThree", "ergoTextThree", "ergoSubheadlineFour", "ergoTextFour", "ergoTextFourClasslist"]
var clubRankingKeys = ["clubRankingHeadline", "rankingSubheadline", "rankingYear", "rankingResult", "rankingAll", "rankingSequence", "rankingSequenceContent", "rankingDownloadBtn", "clubRankingEmailNameBtn", "session"]
var participantRankingKeys = ["participantRankingHeadline", "rankingYear", "rankingResult", "rankingAll", "rankingSequence", "rankingSequenceContent", "rankingDownloadBtn", "session"]
var clubDistanceKeys = ["distanceClubHeadlineOne", "distanceClubSubheadlineOne", "distanceClubSubmitOne", "distanceClubHeadlineTwo", "distanceClubSelectTwo", "distanceClubSubmitBtn", "distanceBackBtn", "distanceHeadlineThree", "distanceClubSuccessThree", "distanceClubErrorThree", "distanceSubmitBtn"]
var participantDistanceKeys = ["distanceSubmitBtn", "distanceBackBtn", "distanceHeadlineThree", "distanceParticipantHeadlineOne", "distance", "distanceParticipantErrorMsg", "distanceParticipantHeadlineTwo", "distanceParticipantSelectionTwo", "distanceParticipantSuccessThree"]
var pdfKeys = ["pdfEmail", "pdfName", "pdfClub", "pdfShortcut", "pdfTotal", "pdfRating", "pdfRound", "pdfCat", "pdfMeter", "pdfAthletes", "rankingYear", "pdfClass", "male", "female", "categories", "resultPerWeekend", "pdfStatistics", "pdfParticipantCount", "pdfParticipant"]
var loginKeys = ["male", "female", "firstName", "lastName", "birthday", "weight", "gender", "pdfClub", "loginHeader", "distanceSubmitBtn"]
var currentLanguage = ''

export default class TranslationService{

    static getCurrentLanguage(){
        return currentLanguage
    }

    static loadTranslation(language){   
        currentLanguage = language
        const request = new XMLHttpRequest()
        request.open("GET", path + language, false)
        request.send(null)

        if(request.status === 200){
            translation = JSON.parse(request.responseText)
        }
        else{
            console.log("Error while loading translation")
        }
    }
    
    static getTranslation(component){
        switch(component){
            case 'website-header':
                return this.getSpecificTranslation(websiteHeaderKeys)
            case 'overview-selector':
                return this.getSpecificTranslation(overviewSelectorKeys)
            case 'home-view':
                return this.getSpecificTranslation(homeViewKeys)
            case 'ergo-challenge':
                return this.getSpecificTranslation(ergoChallengeKeys)
            case 'club-ranking':
                return this.getSpecificTranslation(clubRankingKeys)
            case 'participant-ranking':
                return this.getSpecificTranslation(participantRankingKeys)
            case 'club-distance':
                return this.getSpecificTranslation(clubDistanceKeys)
            case 'participant-distance':
                return this.getSpecificTranslation(participantDistanceKeys)
            case 'pdf':
                return this.getSpecificTranslation(pdfKeys)
            case 'login-form':
                return this.getSpecificTranslation(loginKeys)
            default:
                console.log('invalid component in translation')
                break
        }
    }

    static getSpecificTranslation(keys){
        var temp = []
        for(var i = 0; i < keys.length; i ++){
            var key = keys[i]
            var value = translation[keys[i]]
            temp[key] = value
        }
        return temp
    }
}