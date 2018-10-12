import org.junit.Before;
import org.junit.Test;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matcher.*;
import static org.junit.Assert.assertThat;
import javax.json.JsonObject;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public class PhpRestSqlStmts {
    private Client client;
    private WebTarget target;
    private String baseurl = "http://localhost/restApi/rest/";
    private String testMail = "scarlett.gelleszun@nomail.com";
    private String testMail2 = "birgit.neuwirth@nomail.com";
    private String testClub = "LIA";

    @Before
    public void init(){
        this.client = ClientBuilder.newClient();
    }

    @Test
    //Should get 4 dest distances of one participant
    public void T01_BestFourDistances(){
        this.target = this.client.target(this.baseurl + "bestFourDistances.php?email=" + testMail);
        Response response = target.request(MediaType.APPLICATION_JSON).get();
        JsonObject jsonObject = response.readEntity(JsonObject.class);
        assertThat(jsonObject.getString("bestFourDistances"), is("30900"));
    }

    @Test
    //Should get total distance of one participant
    public void T02_TotalDistances(){
        this.target = this.client.target(this.baseurl + "distanceTotal.php?email=" + testMail);
        Response response = target.request(MediaType.APPLICATION_JSON).get();
        JsonObject jsonObject = response.readEntity(JsonObject.class);
        assertThat(jsonObject.getString("distanceTotal"), is("46130"));
    }

    @Test
    //Should get the amount of participants in one club
    public void T03_ClubCount(){
        this.target = this.client.target(this.baseurl + "clubCount.php?club=" + testClub);
        Response response = target.request(MediaType.APPLICATION_JSON).get();
        JsonObject jsonObject = response.readEntity(JsonObject.class);
        assertThat(jsonObject.getString("clubCount"), is("193"));
    }

    @Test
    //Should get the total distance of all participants
    public void T04_TotalResults(){
        this.target = this.client.target(this.baseurl + "totalResults.php");
        Response response = target.request(MediaType.APPLICATION_JSON).get();
        JsonObject jsonObject = response.readEntity(JsonObject.class);
        assertThat(jsonObject.getString("totalResults"), is("11609355"));
    }

    @Test
    //Should get the count of male/female in challenge
    public void T05_SexCountParticipant(){
        this.target = this.client.target(this.baseurl + "sexCountParticipant.php?gender=M&challenge=1");
        Response response = target.request(MediaType.APPLICATION_JSON).get();
        JsonObject jsonObject = response.readEntity(JsonObject.class);
        assertThat(jsonObject.getString("sexCountParticipant"), is("327"));
    }

    @Test
    //Should get the distance of male/female in challenge
    public void T06_SexDistanceParticipant(){
        this.target = this.client.target(this.baseurl + "sexDistanceParticipant.php?gender=M&challenge=1");
        Response response = target.request(MediaType.APPLICATION_JSON).get();
        JsonObject jsonObject = response.readEntity(JsonObject.class);
        assertThat(jsonObject.getString("sexDistanceParticipant"), is("7781748"));
    }

    @Test
    //Should get the total distance of all participants on one challenge
    public void T07_TotalResultsPerWeekend(){
        this.target = this.client.target(this.baseurl + "totalResultsChallenge.php?challenge=1");
        Response response = target.request(MediaType.APPLICATION_JSON).get();
        JsonObject jsonObject = response.readEntity(JsonObject.class);
        assertThat(jsonObject.getString("totalResultsChallenge"), is("1414325"));
    }

    @Test
    //f.e. how many males got total more than 7000
    public void T08_TotalDistanceRange(){
        this.target = this.client.target(this.baseurl + "totalDistanceRange.php?gender=M&range=7000");
        Response response = target.request(MediaType.APPLICATION_JSON).get();
        JsonObject jsonObject = response.readEntity(JsonObject.class);
        assertThat(jsonObject.getString("totalDistanceRange"), is("750"));
    }

    @Test
    //calculates the 500m-Time of a participant from one challenge
    public void T09_FiveHundredMeterTime(){
        this.target = this.client.target(this.baseurl + "fiveHundredMeterTime/" + testMail + "/1");
        Response response = target.request(MediaType.APPLICATION_JSON).get();
        JsonObject jsonObject = response.readEntity(JsonObject.class);
        assertThat(jsonObject.getString("fiveHundredMeterTime"), is("284100000"));
    }

    @Test
    //Should get the watt of a participant from one challenge
    public void T10_WattParticipant(){
        this.target = this.client.target(this.baseurl + "wattParticipant.php?email=" + testMail + "&challenge=1");
        Response response = target.request(MediaType.APPLICATION_JSON).get();
        JsonObject jsonObject = response.readEntity(JsonObject.class);
        assertThat(jsonObject.getString("wattParticipant"), is("208.77"));
        assertThat(jsonObject.getString("wattParticipant"), closeTo());
    }

    @Test
    //Should get the watt/kg of a participant from one challenge
    public void T11_WattPerKgParticipant(){
        this.target = this.client.target(this.baseurl + "wattPerKgParticipant.php?email="+ testMail2 + "&challenge=1" );
        Response response = target.request(MediaType.APPLICATION_JSON).get();
        JsonObject jsonObject = response.readEntity(JsonObject.class);
        assertThat(jsonObject.getString("wattPerKgParticipant"), is("13.58"));
    }

    @Test
    //Should get class of a participant
    public void T12_GetClass(){
        this.target = this.client.target(this.baseurl + "getClass.php?email=" + testMail);
        Response response = target.request(MediaType.APPLICATION_JSON).get();
        JsonObject jsonObject = response.readEntity(JsonObject.class);
        assertThat(jsonObject.getString("getClass"), is("A"));
    }

    @Test
    public void T13_GetTotalClub(){
        this.target = this.client.target(this.baseurl + "totalResultsPerClub.php?club=" + testClub);
        Response response = target.request(MediaType.APPLICATION_JSON).get();
        JsonObject jsonObject = response.readEntity(JsonObject.class);
        assertThat(jsonObject.getString("totalResultsPerClub"), is("4087611"));
    }
}
