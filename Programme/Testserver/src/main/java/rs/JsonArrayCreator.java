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

    private void fillData(){
        for(int i = 0; i < 40; i ++){
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
}
