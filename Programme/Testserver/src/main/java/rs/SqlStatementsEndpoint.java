package rs;

import javax.json.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

@Path("/sql")
public class SqlStatementsEndpoint {
    @GET
    @Path("/actualChallengeTime")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject getActualChallengeTime(){
        System.out.println("================================");
        System.out.println("====Get Actual Challenge Time===");
        Date date = new GregorianCalendar(2018, Calendar.DECEMBER, 11).getTime();
        System.out.println(date);
        JsonObject jsonValues = Json.createObjectBuilder().add("time", date.getTime()).add("state", "STARTS").build();
        return jsonValues;
    }

    @POST
    @Path("/postPeriod")
    @Consumes(MediaType.APPLICATION_JSON)
    public void postPeriod(final JsonObject msg){
        System.out.println("================================");
        System.out.println("===========Post Period==========");
        System.out.println(msg.getInt("distance") + "  " + msg.getJsonString("evidencePic").getString());
    }

    @POST
    @Path("/postChallenge")
    @Consumes(MediaType.APPLICATION_JSON)
    public void postChallenge(final JsonObject msg){
        System.out.println("================================");
        System.out.println("===========Post Challenge==========");
        System.out.println(msg.getString("year") + "  " + msg.getString("roundOne") + "  " + msg.getString("roundTwo") + "  " + msg.getString("roundThree") + "  " + msg.getString("roundFour") + "  " + msg.getString("roundFive") + "  " + msg.getString("roundSix"));
    }

    @POST
    @Path("/postPeriods")
    @Consumes(MediaType.APPLICATION_JSON)
    public void postPeriods(final JsonArray periods){
        System.out.println("================================");
        System.out.println("===========Post Periods=========");
        for (int i = 0; i < periods.size(); i++) {
            JsonObject period = periods.getJsonObject(i);
            System.out.println(period.getInt("Distance") + "  " + period.getString("Email"));
        }
    }

    @GET
    @Path("/bestFourDistancesParticipants/{year}/{result}/{sequence}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonArray bestFourDistancesParticipants(@PathParam("year")String year, @PathParam("result")String result, @PathParam("sequence")String sequence){
        System.out.println("================================");
        System.out.println("Get Distances Table Participants");
        System.out.println("Year:\n" + year + "\nResult:  " + result + "  " + sequence);
        JsonArray jsonValues;
        if(result.equals("0") && !sequence.equals("Categories"))
            jsonValues = new JsonArrayCreator().GetJsonArrayParticipants();
        else if(!result.equals("0") && !sequence.equals("Categories"))
            jsonValues = new JsonArrayCreator().GetJsonArrayParticipantsParticular();
        else if(result.equals("0") && sequence.equals("Categories"))
            jsonValues = new JsonArrayCreator().GetJsonArrayParticipantsSequence();
        else if(!result.equals("0") && sequence.equals("Categories"))
            jsonValues = new JsonArrayCreator().GetJsonArrayParticipantsParticularSequence();
        else
            jsonValues = null;
        return jsonValues;
    }
    @GET
    @Path("/bestFourDistancesClubs/{year}/{result}/{sequence}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonArray bestFourDistancesClub(@PathParam("year")String year, @PathParam("result")String result, @PathParam("sequence")String sequence){
        System.out.println("================================");
        System.out.println("====Get Distances Table Clubs===");
        System.out.println(year + "  " + result + "  " + sequence);
        JsonArray jsonValues = new JsonArrayCreator().GetJsonArrayClubs();
        return jsonValues;
    }

    @GET
    @Path("/bestFourDistances/{mail}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject bestFourDistances(@PathParam("mail") String mail){
        System.out.println("================================");
        System.out.println("=============Email==============");
        System.out.println(mail);
        return Json.createObjectBuilder().add("bestFourDistances", 323900).add("name", "Hansi").build();
        //return Json.createObjectBuilder().add("bestFourDistances", 323900).add("bestFourDistances", 3222).build();
    }

    @GET
    @Path("/totalDistances/{mail}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject totalDistances(@PathParam("mail") String mail){
        System.out.println("================================");
        System.out.println("=============Email==============");
        System.out.println(mail);
        return Json.createObjectBuilder().add("totalDistances", 46130).build();
    }

    @GET
    @Path("/clubCount/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject clubCount(@PathParam("name") String clubname){
        System.out.println("================================");
        System.out.println("============Clubname============");
        System.out.println(clubname);
        return Json.createObjectBuilder().add("clubCount", 193).build();
    }

    @GET
    @Path("/totalResults")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject totalResult(){
        System.out.println("================================");
        System.out.println("=========Total Result===========");
        return Json.createObjectBuilder().add("totalResults", 11609355).build();
    }

    @GET
    @Path("/totalResultsClub")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject totalResultClub(){
        System.out.println("================================");
        System.out.println("=======Total Result Club========");
        return Json.createObjectBuilder().add("totalResultsClub", 4087611).build();
    }

    @GET
    @Path("/sexCountParticipant/{sex}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject sexCountParticipant(@PathParam("sex")String sex){
        System.out.println("================================");
        System.out.println("====Sex Count Participant=======");
        System.out.println(sex);
        return Json.createObjectBuilder().add("sexCountParticipant", 327).build();
    }

    @GET
    @Path("/sexDistanceParticipant/{sex}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject sexDistanceParticipant(@PathParam("sex")String sex){
        System.out.println("================================");
        System.out.println("===Sex Distance Participant=====");
        System.out.println(sex);
        return Json.createObjectBuilder().add("sexDistanceParticipant", 7781748).build();
    }

    @GET
    @Path("/totalResultsChallenge/{challenge}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject totalResultsChallenge(@PathParam("challenge")String challenge){
        System.out.println("================================");
        System.out.println("====Total Result Challenge======");
        System.out.println(challenge);
        return Json.createObjectBuilder().add("totalResultsChallenge", 1414325).build();
    }

    @GET
    @Path("/totalDistanceRange/{sex}/{distance}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject totalDistanceRange(@PathParam("sex")String sex, @PathParam("distance")String distance){
        System.out.println("================================");
        System.out.println("====Total Distance Range========");
        System.out.println(sex);
        System.out.println(distance);
        return Json.createObjectBuilder().add("totalDistanceRange", 750).build();
    }

    @GET
    @Path("/fiveHoundredMeterTime/{mail}/{challenge}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject fiveHoundredMeterTime(@PathParam("mail")String mail, @PathParam("challenge")String challenge){
        System.out.println("================================");
        System.out.println("====Fivehoundred Meter Time=====");
        System.out.println(mail);
        System.out.println(challenge);
        return Json.createObjectBuilder().add("fiveHoundredMeterTime", 284100000).build();
    }

    @GET
    @Path("/wattParticipant/{mail}/{challenge}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject wattParticipant(@PathParam("mail")String mail, @PathParam("challenge")String challenge){
        System.out.println("================================");
        System.out.println("=======Watt Participant=========");
        System.out.println(mail);
        System.out.println(challenge);
        return Json.createObjectBuilder().add("wattParticipant", "208.77").build();
    }

    @GET
    @Path("/wattPerKgParticipant/{mail}/{challenge}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject wattPerKgParticipant(@PathParam("mail")String mail, @PathParam("challenge")String challenge){
        System.out.println("================================");
        System.out.println("======Watt kg Participant=======");
        System.out.println(mail);
        System.out.println(challenge);
        return Json.createObjectBuilder().add("wattPerKgParticipant", "13.58").build();
    }

    @GET
    @Path("/getClass/{mail}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject getClass(@PathParam("mail")String mail){
        System.out.println("================================");
        System.out.println("============Get Class===========");
        System.out.println(mail);
        return Json.createObjectBuilder().add("getClass", "A").build();
    }
}