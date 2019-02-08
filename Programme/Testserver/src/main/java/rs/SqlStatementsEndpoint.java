package rs;

import javax.json.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

@Path("/sql")
public class SqlStatementsEndpoint {
    @GET
    @Path("/translate/{language}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject getTranslation(@PathParam("language")String language){
        System.out.println(language);
        JsonObject json = new JsonArrayCreator().getKV(language);
        System.out.println(json);
        return json;
    }

    @PUT
    @Path("/updateSessionDate")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateSessionDate(final JsonObject json){
        System.out.println("================================");
        System.out.println("=======Update Session Date======");
        System.out.println(json);
    }

    @POST
    @Path("/postPeriod")
    @Consumes(MediaType.APPLICATION_JSON)
    public void postPeriod(final JsonObject msg){
        System.out.println("================================");
        System.out.println("===========Post Period==========");
        System.out.println(msg.getInt("distance") + "  " + msg.getJsonString("evidencePic").getString());
    }

    @GET
    @Path("/actualChallengeTime")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject getActualChallengeTime(){
        System.out.println("================================");
        System.out.println("====Get Actual Challenge Time===");
        Date date = new GregorianCalendar(2019, Calendar.JANUARY, 10).getTime();
        System.out.println(date);
        JsonObject jsonValues = Json.createObjectBuilder().add("time", date.getTime()).add("state", "STARTS").build();
        return jsonValues;
    }

    @GET
    @Path("/picSearch/{email}/{year}/{session}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject picSearch(@PathParam("email")String email, @PathParam("year")String year, @PathParam("session")String session) throws IOException {
        System.out.println("================================");
        System.out.println("=======Get Evidence Picture=====");
        String content = new String(Files.readAllBytes(Paths.get("C:\\Users\\Daniel\\Desktop\\Schule\\Diplomarbeit\\Ruderverein_ISTER\\1819-5ahif-da-ruderverein-ister-dreamteam\\Programme\\Testserver\\test.txt")));
        return Json.createObjectBuilder().add("picture", content).add("name", "Der Name").build();
    }

    @GET
    @Path("/getAllChallenges")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonArray getAllChallenges(){
        System.out.println("================================");
        System.out.println("=======Get All Challenges=======");
        return new JsonArrayCreator().getAllChallenges();
    }

    @GET
    @Path(("/getChallenge/{id}"))
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject getChallengeById(@PathParam("id")String id){
        System.out.println("================================");
        System.out.println("=======Get Challenge By Id======");
        System.out.println(id);
        return new JsonArrayCreator().getChallengeById();
    }

    @GET
    @Path("/getEmailNameReference")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonArray getEmailDistanceReference(){
        System.out.println("================================");
        System.out.println("========EmailDistance Ref=======");
        return new JsonArrayCreator().getEmailDistanceReference();
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
    @Path("/bestFourDistancesClubs/{year}/{sequence}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject bestFourDistancesClub(@PathParam("year")String year, @PathParam("sequence")String sequence){
        System.out.println("================================");
        System.out.println("====Get Distances Table Clubs===");
        System.out.println(year + "  " + "  " + sequence);
        //JsonArray jsonValues = new JsonArrayCreator().GetJsonArrayClubs();
        JsonObject jsonValues = new JsonArrayCreator().GetJsonArrayClubsNew();
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
    @Path("/getAllClassess")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonArray getAllClasses(){
        System.out.println("================================");
        System.out.println("===========Get Classes==========");
        return new JsonArrayCreator().getAllClubs();
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

    @GET
    @Path("/challengeStatus/{email}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject getChallengeStatus(@PathParam("email") String email){
        System.out.println("================================");
        System.out.println("======Get Challenge Status======");
        System.out.println(email);
        return Json.createObjectBuilder().add("challengeStatus", "true").add("emailStatus", "schramm").build();
    }

    @GET
    @Path("/getDataByParticipant/{mail}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject getDataByParticipant(@PathParam("mail")String email){
        System.out.println("================================");
        System.out.println("======Get Challenge Status======");
        System.out.println(email);
        return Json.createObjectBuilder().add("firstName", "Daniel").add("lastName", "Mazanek").add("birthday", "07-07-1999").add("weight", "68").add("gender", "m").add("club", "Donau Wien").build();
    }
}