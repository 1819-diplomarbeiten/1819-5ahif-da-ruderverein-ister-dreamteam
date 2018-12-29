package rs;

import javax.json.*;
import java.util.ArrayList;
import java.util.List;

public class JsonArrayCreator {
    List<String> names = new ArrayList<String>();
    List<String> lastNames = new ArrayList<String>();
    List<Integer> bestFour = new ArrayList<Integer>();
    List<Integer> one = new ArrayList<Integer>();
    List<Integer> two = new ArrayList<Integer>();
    List<Integer> three = new ArrayList<Integer>();
    List<Integer> four = new ArrayList<Integer>();
    List<Integer> five = new ArrayList<Integer>();
    List<Integer> six = new ArrayList<Integer>();
    List<String> gender = new ArrayList<>();
    List<String> category = new ArrayList<>();
    List<String> club = new ArrayList<>();
    List<String> clubLong = new ArrayList<>();
    List<Integer> clubMembers = new ArrayList<>();
    List<String> fiveHoundred = new ArrayList<>();
    List<Double> watt = new ArrayList<>();
    List<Double> wattKg = new ArrayList<>();

    public JsonArray GetJsonArrayParticipants(){
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        fillData();
        for(int i = 0; i < bestFour.size();i++){
            JsonObjectBuilder allSixDistances = Json.createObjectBuilder();
            allSixDistances.add("roundOne", one.get(i)).add("roundTwo", two.get(i)).add("roundThree", three.get(i)).add("roundFour", four.get(i)).add("roundFive", five.get(i)).add("roundSix", six.get(i));
            jsonArrayBuilder.add(Json.createObjectBuilder().add("bestFourDistances", bestFour.get(i)).add("firstName", names.get(i)).add("lastName", lastNames.get(i)).add("allSixDistances", allSixDistances).add("gender", gender.get(i)).add("pClass", category.get(i)).add("club", club.get(i)));
        }
        return jsonArrayBuilder.build();
    }

    public JsonArray GetJsonArrayParticipantsParticular(){
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        fillData();
        for(int i = 0; i < bestFour.size();i++){
            jsonArrayBuilder.add(Json.createObjectBuilder().add("firstName", names.get(i)).add("lastName", lastNames.get(i)).add("round", one.get(i)).add("gender", gender.get(i)).add("pClass", category.get(i)).add("club", club.get(i)).add("fiveHundred", fiveHoundred.get(i)).add("watt", watt.get(i)).add("wattKg", wattKg.get(i)));
        }
        return jsonArrayBuilder.build();
    }
    //working
    public JsonArray GetJsonArrayClubs(){
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        fillData();
        for(int i = 0; i < bestFour.size();i++){
            JsonObjectBuilder allSixDistances = Json.createObjectBuilder();
            allSixDistances.add("roundOne", one.get(i)*10).add("roundTwo", two.get(i)*10).add("roundThree", three.get(i)*10).add("roundFour", four.get(i)*10).add("roundFive", five.get(i)*10).add("roundSix", six.get(i)*10);
            jsonArrayBuilder.add(Json.createObjectBuilder().add("clubLong", clubLong.get(i)).add("club", club.get(i)).add("allSixDistances", allSixDistances).add("clubParticipantCount", clubMembers.get(i)));
        }
        return jsonArrayBuilder.build();
    }

    public JsonObject GetJsonArrayClubsNew(){
        fillData();
        JsonObjectBuilder fullObject = Json.createObjectBuilder();

        //distanceTable
        JsonArrayBuilder distanceTableArray = Json.createArrayBuilder();
        JsonObject allSix = null;
        for(int i = 0; i < bestFour.size();i++){
            allSix = Json.createObjectBuilder().add("roundOne", one.get(i)*10).add("roundTwo", two.get(i)*10).add("roundThree", three.get(i)*10).add("roundFour", four.get(i)*10).add("roundFive", five.get(i)*10).add("roundSix", six.get(i)*10).build();
            distanceTableArray.add(Json.createObjectBuilder().add("clubLong", clubLong.get(i)).add("club", club.get(i)).add("allSixDistances", allSix).add("clubParticipantCount", clubMembers.get(i)));
        }
        fullObject.add("distanceTableArray", distanceTableArray);

        //distanceFootnoteTable
        JsonObject allSixCount = Json.createObjectBuilder().add("roundOne", 110).add("roundTwo", 60).add("roundThree", 50).add("roundFour", 30).add("roundFive", 40).add("roundSix", 90).build();
        JsonObjectBuilder distanceFootnoteTableArray = Json.createObjectBuilder();
        distanceFootnoteTableArray.add("totalCount", Json.createObjectBuilder().add("clubCountTotal", 500).add("allSixRoundsClubs", allSixCount))
                                    .add("maleCount", Json.createObjectBuilder().add("clubMaleCountTotal", 300).add("allSixRoundsClubs", allSixCount))
                                    .add("femaleCount", Json.createObjectBuilder().add("clubFemaleCountTotal", 300).add("allSixRoundsClubs", allSixCount))
                                    .add("maleTotal", allSix)
                                    .add("totalDistances", allSix)
                                    .add("femaleTotal", allSix);
        fullObject.add("distanceFootnoteTable", distanceFootnoteTableArray);

        //genderDistanceTable
        fullObject.add("genderDistanceTable", Json.createObjectBuilder().add("male", getGenderDistanceArray(allSixCount)).add("female", getGenderDistanceArray(allSixCount)));


        return fullObject.build();
    }

    private JsonArray getGenderDistanceArray(JsonObject allSix){
        JsonArrayBuilder g = Json.createArrayBuilder();
        for(int i = 0; i < 10; i ++){
            g.add(Json.createObjectBuilder().add("reachenDistance", 1000).add("distances", allSix));
        }
        return g.build();
    }

    private void fillData(){
        for(int i = 0; i < 9; i ++){
            bestFour.add(329000);
            bestFour.add(12345);
            bestFour.add(63789);
            names.add("Hansi");
            names.add("Daniel");
            names.add("Peter");
            lastNames.add("Langoth");
            lastNames.add("Mazanek");
            lastNames.add("Hauer");
            one.add(5678);
            one.add(1344);
            one.add(7535);
            two.add(5318);
            two.add(4944);
            two.add(7895);
            three.add(1223);
            three.add(3839);
            three.add(2658);
            four.add(2946);
            four.add(4763);
            four.add(7890);
            five.add(2344);
            five.add(4533);
            five.add(6349);
            six.add(7894);
            six.add(8734);
            six.add(2345);
            gender.add("F");
            gender.add("M");
            gender.add("M");
            category.add("U23");
            category.add("A");
            category.add("C");
            club.add("LIA");
            club.add("KAI");
            club.add("VIE");
            clubLong.add("LIA Wien");
            clubLong.add("Donau Wien");
            clubLong.add("Donau Wien");
            clubMembers.add(193);
            clubMembers.add(104);
            clubMembers.add(104);
            fiveHoundred.add("01:55,2");
            fiveHoundred.add("02:04,4");
            fiveHoundred.add("01:50,9");
            watt.add(200.2);
            watt.add(197.8);
            watt.add(210.7);
            wattKg.add(14.09);
            wattKg.add(10.38);
            wattKg.add(17.14);
        }
    }

    public JsonArray GetJsonArrayParticipantsParticularSequence() {
        JsonArrayBuilder jsonArrayCategory = Json.createArrayBuilder();
        JsonArrayBuilder jsonArrayParticipants = Json.createArrayBuilder();
        fillData();
        for(int j = 0; j < 5;j++){
            for(int i = 0; i < 18;i++){
                jsonArrayParticipants.add(Json.createObjectBuilder().add("firstName", names.get(i)).add("lastName", lastNames.get(i)).add("round", one.get(i)).add("gender", gender.get(i)).add("pClass", category.get(i)).add("club", club.get(i)).add("fiveHundred", fiveHoundred.get(i)).add("watt", watt.get(i)).add("wattKg", wattKg.get(i)));
            }
            jsonArrayCategory.add(Json.createArrayBuilder().add(category.get(j)).add(jsonArrayParticipants));
        }
        return jsonArrayCategory.build();
    }

    public JsonArray GetJsonArrayParticipantsSequence() {
        JsonArrayBuilder jsonArrayCategory = Json.createArrayBuilder();
        JsonArrayBuilder jsonArrayParticipants = Json.createArrayBuilder();
        fillData();
        for(int j = 0; j < 5;j++){
            for(int i = 0; i < 18;i++){
                JsonObjectBuilder allSixDistances = Json.createObjectBuilder();
                allSixDistances.add("roundOne", one.get(i)).add("roundTwo", two.get(i)).add("roundThree", three.get(i)).add("roundFour", four.get(i)).add("roundFive", five.get(i)).add("roundSix", six.get(i));
                jsonArrayParticipants.add(Json.createObjectBuilder().add("bestFourDistances", bestFour.get(i)).add("firstName", names.get(i)).add("lastName", lastNames.get(i)).add("allSixDistances", allSixDistances).add("gender", gender.get(i)).add("club", club.get(i)));
            }
            jsonArrayCategory.add(Json.createArrayBuilder().add(category.get(j)).add(jsonArrayParticipants));
        }
        return jsonArrayCategory.build();
    }

    public JsonArray getAllChallenges() {
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        for(int i = 2015; i < 2018; i++){
            jsonArrayBuilder.add(Json.createObjectBuilder().add("year", String.valueOf(i)).add("roundOne", i + "-11-25").add("roundTwo", i + "-12-13").add("roundThree", (i +1) + "-01-14").add("roundFour", (i +1) + "-02-16").add("roundFive", (i +1) + "-03-29").add("roundSix", (i +1) + "-04-17"));
        }
        return jsonArrayBuilder.build();
    }

    public JsonObject getChallengeById() {
        JsonObjectBuilder json = Json.createObjectBuilder().add("roundOne", 2018 + "-11-25").add("roundTwo", 2018 + "-12-13").add("roundThree", (2018 +1) + "-01-14").add("roundFour", (2018 +1) + "-02-16").add("roundFive", (2018 +1) + "-03-29").add("roundSix", (2018 +1) + "-04-17");

        return json.build();
    }

    public JsonArray getEmailDistanceReference() {
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        for(int i = 0; i < 40; i++){
            jsonArrayBuilder.add(Json.createObjectBuilder().add("email", "hansi@gmx.at").add("name", "Hansi Langott"));
        }
        return jsonArrayBuilder.build();
    }

    public JsonObject getKV(String language){
        if(language.equals("german")) {
            JsonObjectBuilder jsonGerman = Json.createObjectBuilder();
            jsonGerman.add("headerCountdown", "DIE CHALLENGE")
                    .add("headerDay", "Tage")
                    .add("headerHour", "Stunden")
                    .add("headerMinutes", "Minuten")
                    .add("headerSeconds", "Sekunden")
                    .add("headerStarts", "STARTET")
                    .add("headerEnds", "ENDET")
                    .add("homeBtn", "Start")
                    .add("homeHeadline", "Willkommen zur ERGO-Challenge Seite des Linzer Rudervereins ISTER")
                    .add("homeTextOne", "Breitensport und Rennsport bestehen schon lange nebeneinander, oft jedoch teilt dieser Umstand die Mitglieder im Verein. Bei einer Challenge kann jeder, unabhängig von dieser Zuordnung teilnehmen. Bei den Reihungen in den Ergebnislisten findet man sich in bekannter Gesellschaft von Freunden, Bekannten oder auch Neueinsteigern verschiedenster Vereine.")
                    .add("homeTextTwo", "Die veranstaltete Challenge beschränkt sich nicht auf Rudervereine allein. Jeder der dabei sein will, ist willkommen und findet seinen Platz. Teilnehmer aus aller Welt sind so willkommen.")
                    .add("homeTextThree", "Als veranstaltender Verein „Linzer Ruderverein ISTER“ haben diese Veranstaltungen natürlich Bezug zum Rudern, insbesondere die Winterchallenge an den Concept2 Ergometern wird auch an die Fitness Clubs getragen.")
                    .add("ergoHeadline", "30 (dirty) K Ergo Challenge")
                    .add("ergoSubheadlineOne", "Allgemeines")
                    .add("ergoBtn", "Ergo Challenge")
                    .add("ergoTextOne", "Bei diesem Bewerb gibt es weder etwas zu gewinnen, noch erhält man eine Medaille. Alle Ruderer, weiblich und männlich aus Vereinen oder privat, sind startberechtigt und als Administrator vertrauen wir auf die Richtigkeit der gelieferten Daten.")
                    .add("ergoSubheadlineTwo", "Bewerb")
                    .add("ergoTextTwo", "Die Teilnehmer sollen versuchen in der Zeit von 30 Minuten so viele Meter am Ergometer zurück zu legen, als es ihnen möglich ist. Es gibt über den Winter verteilt 6 Termine, wobei die 4 besten Ergebnisse gewertet werden. Die Termine sind immer von Donnerstag 18:00 Uhr bis Montag 18:00 Uhr berechnet:")
                    .add("session", "Session")
                    .add("ergoSubheadlineThree", "Ziel")
                    .add("ergoTextThree", "Bei vier Termine zusammengerechnet, mindestens 30 000 Meter (Männer) oder 26 000 (Frauen) zu rudern und dabei mit Ruderkollegen aus Österreich und der Welt messen.")
                    .add("ergoSubheadlineFour", "Daten")
                    .add("ergoTextFour", "Um an der Challenge teilnehmen zu können, muss man sich mit einer E-Mail auf dieser Website registrieren und weitere persönliche Daten wie Name, Alter, Gewicht, etc. für die Auswertung der Challenge angeben (Das Gewicht dient lediglich zur Berechnung und scheint nicht in der Auswertung auf). Ihre Daten werden vertraulich gespeichert und nicht an Dritte weitergegeben. Bei Fragen wenden Sie sich an challenge@ister.at. Die Reihung erfolgt gemäß der Concept2 Alterseinteilung:")
                    .add("ergoTextFourClasslist", "SchülerInnen: bis 14 Jahre;JuniorenInnen: 15 – 16 Jahre;JuniorenInnen: 17 – 18 Jahre;Allgemeine Klasse: 19 – 29 Jahre;Masters A: 30 – 39 Jahre;Masters B: 40 – 49 Jahre;Masters C: 50 – 59 Jahre;Masters D: 60 – 69 Jahre;Masters E: 70 – 79 Jahre;Masters F: 80 – 89 Jahre")
                    .add("clubRankingHeadline", "30K Club Ranking Liste")
                    .add("clubRankingBtn", "30K Club Ranking")
                    .add("participantRankingBtn", "30K Teilnehmer Ranking")
                    .add("rankingSubheadline", "Wählen Sie Ihre Filteroptionen")
                    .add("rankingYear", "Jahr")
                    .add("rankingResult", "Durchgänge")
                    .add("distanceBtn", "Distanz hochladen")
                    .add("rankingAll", "Alle")
                    .add("rankingSequence", "Sortierung")
                    .add("rankingDownloadBtn", "pdf erstellen")
                    .add("clubRankingEmailDistanceBtn", "Email - Name Liste erstellen")
                    .add("participantRankingHeadline", "30K Teilnehmer Ranking Liste")
                    .add("participantRankingSubheadline", "Wählen Sie Ihre Filteroptionen")
                    .add("rankingSequenceContent", "Alphabetisch;Top Down;Kategorien")
                    .add("distanceClubHeadlineOne", "Überprüfen Sie die Struktur")
                    .add("distanceClubSubheadlineOne", "So soll die Excel Tabelle aussehen (.xlsx Format)")
                    .add("distanceClubSubmitOne", "Verstanden")
                    .add("distanceClubHeadlineTwo", "Wählen Sie die Datei aus")
                    .add("distanceClubSelectTwo", "Wähle Excel Datei")
                    .add("distanceBackBtn", "Schritt zurück")
                    .add("distanceHeadlineThree", "Hochladen zum Server")
                    .add("distanceClubSuccessThree", "Ihre Excel Datei wurde erfolgreich hochgeladen")
                    .add("distanceClubErrorThree", "Excel Daten ungültig")
                    .add("distanceParticipantHeadlineOne", "Tragen Sie die erreichte Distanz ein")
                    .add("distance", "Distanz")
                    .add("distanceParticipantErrorMsg", "Ungültige Distanz")
                    .add("distanceParticipantHeadlineTwo", "Wählen Sie das Beweisbild aus")
                    .add("distanceParticipantSelectionTwo", "Beweisbild auswählen")
                    .add("distanceSubmitBtn", "Weiter")
                    .add("loginBtn", "Login")
                    .add("distanceParticipantSuccessThree", "Ihre Distanz wurde erfolgreich hochgeladen");
            return jsonGerman.build();
        }
        else{
            JsonObjectBuilder jsonEnglish = Json.createObjectBuilder();
            jsonEnglish.add("headerCountdown", "THE CHALLENGE")
                    .add("headerDay", "Days")
                    .add("headerHour", "Hours")
                    .add("headerMinutes", "Minutes")
                    .add("headerSeconds", "Seconds")
                    .add("headerStarts", "STARTS")
                    .add("headerEnds", "ENDS")
                    .add("homeBtn", "Home")
                    .add("homeHeadline", "Welcome to the ERGO-Challenge Website of Ruderverein ISTER Linz")
                    .add("homeTextOne", "blaaaaaaaaaaaaaaa aaaaaaaa aaaaa aaa aaaa aaaa aaaaa aaaaaaa aaa aaaaa aaaaaa aaaaaa   aaa aa aaa aaa aaaaa aaa aaa aaaa aaa aaa aaaaaaaaaa aaa english english english english english english english english english english english english english english english english ennglish")
                    .add("homeTextTwo", "english english english english english english english english english english english english english english english english english english english english english english english english ")
                    .add("homeTextThree", "english english english english english english english english english english english english english english english english english english english english english ")
                    .add("ergoHeadline", "30 (dirty) K Ergo Challenge")
                    .add("ergoSubheadlineOne", "allgmeinielgish")
                    .add("ergoTextOne", "english english english english english english english english english english english english english english english english english english english english english english english english english english english english english english english")
                    .add("ergoSubheadlineTwo", "Bewerb")
                    .add("ergoBtn", "Ergo Challenge")
                    .add("ergoTextTwo", "english english english english english english english english english english english english english english english english english english english english english english english english english english english english english english english english english english english english english english ")
                    .add("session", "Session")
                    .add("ergoSubheadlineThree", "Ziel")
                    .add("ergoTextThree", "english english english english english english english english english english english english english english english english english english english english english")
                    .add("ergoSubheadlineFour", "Daten")
                    .add("distanceBtn", "Upload Distance")
                    .add("ergoTextFour", "english english english english english english english english english english english english english english english english english english ")
                    .add("ergoTextFourClasslist", "SchülerInnen: bis 14 Jahre;JuniorenInnen: 15 – 16 Jahre;JuniorenInnen: 17 – 18 Jahre;Allgemeine Klasse: 19 – 29 Jahre;Masters A: 30 – 39 Jahre;Masters B: 40 – 49 Jahre;Masters C: 50 – 59 Jahre;Masters D: 60 – 69 Jahre;Masters E: 70 – 79 Jahre;Masters F: 80 – 89 Jahre")
                    .add("clubRankingHeadline", "30K Club Ranking Liste")
                    .add("clubRankingBtn", "30K Club Ranking")
                    .add("participantRankingBtn", "30K Particpant Ranking")
                    .add("rankingSubheadline", "Select Your Filter Options")
                    .add("rankingYear", "Year")
                    .add("rankingAll", "Total")
                    .add("rankingResult", "Result")
                    .add("rankingResultContent", "Total;1. Session;2. Session;3. Session;4. Session;5. Session;6. Session;")
                    .add("rankingSequence", "Order")
                    .add("rankingDownloadBtn", "Download pdf")
                    .add("clubRankingEmailDistanceBtn", "Load Email-Name List")
                    .add("participantRankingHeadline", "30K Participant Ranking Liste")
                    .add("rankingSequenceContent", "Alphabetic;Top Down; Categories")
                    .add("distanceClubHeadlineOne", "Check Your Structur")
                    .add("distanceClubSubheadlineOne", "This Is How The Excel Should Look Like (.xlsx Format)")
                    .add("distanceClubSubmitOne", "got it")
                    .add("distanceClubHeadlineTwo", "select yo data")
                    .add("distanceClubSelectTwo", "select excel")
                    .add("distanceSubmitBtn", "done")
                    .add("distanceBackBtn", "Step back")
                    .add("distanceHeadlineThree", "upload to Server")
                    .add("distanceClubSuccessThree", "succesfully uploaded")
                    .add("distanceClubErrorThree", "Excel invalid")
                    .add("distanceParticipantHeadlineOne", "Enter your distance")
                    .add("distance", "Distance")
                    .add("distanceParticipantErrorMsg", "invalid Distanz")
                    .add("distanceParticipantHeadlineTwo", "select the Beweisbild aus")
                    .add("distanceParticipantSelectionTwo", "select Beweisbild")
                    .add("loginBtn", "Login")
                    .add("distanceParticipantSuccessThree", "Ihre Distanz wurde succesful hochgeladen");
            return jsonEnglish.build();
        }
    }
}
