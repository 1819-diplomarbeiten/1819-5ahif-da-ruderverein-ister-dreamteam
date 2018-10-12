package rs;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
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

    public JsonArray GetJsonArray(){
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        fillData();
        for(int i = 0; i < bestFour.size();i++){
            JsonObjectBuilder allSixDistances = Json.createObjectBuilder();
            allSixDistances.add("roundOne", one.get(i)).add("roundTwo", two.get(i)).add("roundThree", three.get(i)).add("roundFour", four.get(i)).add("roundFive", five.get(i)).add("roundSix", six.get(i));
            jsonArrayBuilder.add(Json.createObjectBuilder().add("bestFourDistances", bestFour.get(i)).add("firstName", names.get(i)).add("lastName", lastNames.get(i)).add("allSixDistances", allSixDistances));
        }
        return jsonArrayBuilder.build();
    }

    private void fillData(){
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

    }
}
