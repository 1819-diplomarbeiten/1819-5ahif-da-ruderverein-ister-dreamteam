import DataService from '../rest/dataService.js'

//keys for component and pdf creation
var websiteHeaderKeys = ["headerCountdown", "headerDay", "headerHour", "headerMinutes", "headerSeconds", "headerStarts", "headerEnds"]
var overviewSelectorKeys = ["homeBtn", "distanceBtn", "ergoBtn", "clubRankingBtn", "participantRankingBtn", "loginBtn", "logoutBtn", "mainpageBtn"]
var homeViewKeys = ["homeHeadline", "homeTextOne", "homeTextTwo", "homeTextThree"]
var ergoChallengeKeys = ["ergoHeadline", "ergoSubheadlineOne", "ergoTextOne", "ergoSubheadlineTwo", "ergoTextTwo", "session", "ergoSubheadlineThree", "ergoTextThree", "ergoSubheadlineFour", "ergoTextFour", "ergoTextFourClasslist"]
var clubRankingKeys = ["dataFail", "clubRankingHeadline", "rankingSubheadline", "rankingYear", "rankingResult", "rankingAll", "rankingSequence", "rankingSequenceContent", "rankingDownloadBtn", "clubRankingEmailNameBtn", "session"]
var participantRankingKeys = ["dataFail", "participantRankingHeadline", "rankingYear", "rankingResult", "rankingAll", "rankingSequence", "rankingSequenceContent", "rankingDownloadBtn", "session"]
var clubDistanceKeys = ["distanceClubHeadlineOne", "distanceClubSubheadlineOne", "distanceClubSubmitOne", "distanceClubHeadlineTwo", "distanceClubSelectTwo", "distanceClubSubmitBtn", "distanceBackBtn", "distanceHeadlineThree", "distanceClubSuccessThree", "distanceClubErrorThree", "distanceSubmitBtn"]
var participantDistanceKeys = ["distanceSubmitBtn", "distanceBackBtn", "distanceHeadlineThree", "distanceParticipantHeadlineOne", "distance", "distanceParticipantErrorMsg", "distanceParticipantHeadlineTwo", "distanceParticipantSelectionTwo", "distanceParticipantSuccessThree"]
var pdfKeys = ["pdfEmail", "pdfName", "pdfClub", "pdfShortcut", "pdfTotal", "pdfRating", "pdfRound", "pdfCat", "pdfMeter", "pdfAthletes", "rankingYear", "pdfClass", "male", "female", "categories", "resultPerWeekend", "pdfStatistics", "pdfParticipantCount", "pdfParticipant"]
var loginKeys = ["male", "female", "firstName", "lastName", "birthday", "weight", "gender", "pdfClub", "loginHeader", "distanceSubmitBtn", "pdfParticipant", "pdfShortcut", "existingClub", "createClub", "registerAs", "longname", "editHeader", "saveBtn", "registerSuccess", "editSuccess"]
let currentTranslation = []

//service class for translation of website
export default class TranslationService{

    //loads language into the service
    static async loadTranslation(language){   
        currentTranslation = await DataService.get('translation', JSON.parse('{"language":"' + language + '"}'))

        if(currentTranslation != "failure"){     
              
            //fire event that language has changed
            document.dispatchEvent(
                new CustomEvent("languageChanged", {
                    bubbles: true
            }));
        }
        else{
            window.alert('CONNECTION ERROR')
        }
    }
    
    //with the string-param, the method returns only the specific translations needed
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

    //filters whole translation and returns shortened list
    static getSpecificTranslation(keys){
        var temp = []
        for(var i = 0; i < keys.length; i ++){
            var key = keys[i]
            var value = currentTranslation[keys[i]]
            temp[key] = value
        }
        return temp
    }
}