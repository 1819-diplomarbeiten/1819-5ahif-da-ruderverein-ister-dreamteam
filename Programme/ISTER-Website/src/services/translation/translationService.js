var translation = []
var path = 'http://localhost:8080/testserver/rs/sql/translate/'
var websiteHeaderKeys = ["headerCountdown", "headerDay", "headerHour", "headerMinutes", "headerSeconds"]
var overviewSelectorKeys = ["homeBtn"]
var homeViewKeys = ["homeHeadline", "homeTextOne", "homeTextTwo", "homeTextThree"]
var ergoChallengeKeys = [""] //ergo challenge not done
var clubRankingKeys = ["clubRankingHeadline", "rankingSubheadline", "rankingYear", "rankingResult", "rankingResultContent", "rankingSequence", "clubRankingSequenceContent", "rankingDownloadBtn", "clubRankingEmailDistanceBtn"]
var participantRankingKeys = ["participantRankingHeadline", "rankingYear", "rankingResult", "rankingResultContent", "rankingSequence", "participantRankingSequenceContent", "rankingDownloadBtn"]
var clubDistanceKeys = ["distanceClubHeadlineOne", "distanceClubSubheadlineOne", "distanceClubSubmitOne", "distanceClubHeadlineTwo", "distanceClubSelectTwo", "distanceClubSubmitBtn", "distanceBackBtn", "distanceHeadlineThree", "distanceClubSuccessThree", "distanceClubErrorThree", "distanceSubmitBtn"]
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