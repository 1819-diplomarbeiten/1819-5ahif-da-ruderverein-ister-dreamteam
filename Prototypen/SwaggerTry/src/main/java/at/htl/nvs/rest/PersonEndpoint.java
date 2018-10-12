package at.htl.nvs.rest;

import at.htl.nvs.business.PersonFacade;
import at.htl.nvs.entities.Person;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
@Path("person")
@Api(value = "person", description = "PersonEndpoint")
public class PersonEndpoint {
    PersonFacade personFacade = new PersonFacade();
    @GET
    @ApiOperation(value = "Finds All Persons",
            response = Person.class,
            responseContainer = "List")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllPersons(){
        return Response.ok(personFacade.getAllPersons()).build();
    }
}
