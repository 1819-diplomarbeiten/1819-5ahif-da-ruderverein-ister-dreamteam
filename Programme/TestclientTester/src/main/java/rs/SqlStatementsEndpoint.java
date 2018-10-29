package rs;

import entities.Message;

import javax.json.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.*;

@Path("/sql")
public class SqlStatementsEndpoint {

    @POST
    @Path("/postPeriod")
    @Consumes(MediaType.APPLICATION_JSON)
    public void postPeriod(final JsonObject msg){
        System.out.println("===========\nPost Period\n==========");
        System.out.println(msg.getInt("distance") + "  " + msg.getString("evidencePic"));
    }


    @POST
    @Path("/postPeriods")
    @Consumes(MediaType.APPLICATION_JSON)
    public void postPeriods(final JsonArray periods){
        System.out.println("===========\nPost Periods\n==========");
        for (int i = 0; i < periods.size(); i++) {
            JsonObject period = periods.getJsonObject(i);
            System.out.println(period.getInt("Distance") + "  " + period.getString("Email"));
        }
    }

    @GET
    @Path("/bestFourDistances/{year}/{result}/{sequence}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonArray bestFourDistances(@PathParam("year")String year, @PathParam("result")String result, @PathParam("sequence")String sequence){
        System.out.println("===========\nGet Distances Table\n==========");
        System.out.println(year + "  " + result + "  " + sequence);
        JsonArray jsonValues = new JsonArrayCreator().GetJsonArray();
        return jsonValues;
    }

    @GET
    @Path("/bestFourDistances/{mail}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject bestFourDistances(@PathParam("mail") String mail){
        System.out.println("===========\nE-Mail: " + mail + "\n==========");
        return Json.createObjectBuilder().add("bestFourDistances", 323900).add("name", "Hansi").build();
        //return Json.createObjectBuilder().add("bestFourDistances", 323900).add("bestFourDistances", 3222).build();
    }

    @GET
    @Path("/totalDistances/{mail}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject totalDistances(@PathParam("mail") String mail){
        System.out.println("===========\nE-Mail: " + mail + "\n==========");
        return Json.createObjectBuilder().add("totalDistances", 46130).build();
    }

    @GET
    @Path("/clubCount/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject clubCount(@PathParam("name") String clubname){
        System.out.println("===========\nClubname: " + clubname + "\n==========");
        return Json.createObjectBuilder().add("clubCount", 193).build();
    }

    @GET
    @Path("/totalResults")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject totalResult(){
        System.out.println("===========\nTotalResult\n==========");
        return Json.createObjectBuilder().add("totalResults", 11609355).build();
    }

    @GET
    @Path("/totalResultsClub")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject totalResultClub(){
        System.out.println("===========\nTotalResultClub\n==========");
        return Json.createObjectBuilder().add("totalResultsClub", 4087611).build();
    }

    @GET
    @Path("/sexCountParticipant/{sex}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject sexCountParticipant(@PathParam("sex")String sex){
        System.out.println("===========\nSexCountParticipant: " + sex + "\n==========");
        return Json.createObjectBuilder().add("sexCountParticipant", 327).build();
    }

    @GET
    @Path("/sexDistanceParticipant/{sex}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject sexDistanceParticipant(@PathParam("sex")String sex){
        System.out.println("===========\nSexDistanceParticipant: " + sex + "\n==========");
        return Json.createObjectBuilder().add("sexDistanceParticipant", 7781748).build();
    }

    @GET
    @Path("/totalResultsChallenge/{challenge}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject totalResultsChallenge(@PathParam("challenge")String challenge){
        System.out.println("===========\ntotalResultsChallenge: " + challenge + "\n==========");
        return Json.createObjectBuilder().add("totalResultsChallenge", 1414325).build();
    }

    @GET
    @Path("/totalDistanceRange/{sex}/{distance}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject totalDistanceRange(@PathParam("sex")String sex, @PathParam("distance")String distance){
        System.out.println("===========\ntotalDistanceRange: " + sex + ", " + distance + "\n==========");
        return Json.createObjectBuilder().add("totalDistanceRange", 750).build();
    }

    @GET
    @Path("/fiveHoundredMeterTime/{mail}/{challenge}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject fiveHoundredMeterTime(@PathParam("mail")String mail, @PathParam("challenge")String challenge){
        System.out.println("===========\nfiveHoundredMeterTime: " + mail + ", " + challenge + "\n==========");
        return Json.createObjectBuilder().add("fiveHoundredMeterTime", 284100000).build();
    }

    @GET
    @Path("/wattParticipant/{mail}/{challenge}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject wattParticipant(@PathParam("mail")String mail, @PathParam("challenge")String challenge){
        System.out.println("===========\nwattParticipant: " + mail + ", " + challenge + "\n==========");
        return Json.createObjectBuilder().add("wattParticipant", "208.77").build();
    }

    @GET
    @Path("/wattPerKgParticipant/{mail}/{challenge}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject wattPerKgParticipant(@PathParam("mail")String mail, @PathParam("challenge")String challenge){
        System.out.println("===========\nwattPerKgParticipant: " + mail + ", " + challenge + "\n==========");
        return Json.createObjectBuilder().add("wattPerKgParticipant", "13.58").build();
    }

    @GET
    @Path("/getClass/{mail}")
    @Produces(MediaType.APPLICATION_JSON)
    public JsonObject getClass(@PathParam("mail")String mail){
        System.out.println("===========\ngetClass: " + mail + "\n==========");
        return Json.createObjectBuilder().add("getClass", "A").build();
    }
}
