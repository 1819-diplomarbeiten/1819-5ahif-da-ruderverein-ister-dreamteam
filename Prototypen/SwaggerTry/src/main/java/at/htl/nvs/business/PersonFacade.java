package at.htl.nvs.business;

import at.htl.nvs.entities.Person;
import io.swagger.annotations.Api;

import java.util.ArrayList;
import java.util.List;
@Api
public class PersonFacade {
    public List<Person> getAllPersons() {
        Person p1 = new Person();
        p1.setId(1L);
        p1.setAge(12);
        p1.setName("Hansi");
        Person p2 = new Person();
        p2.setId(2L);
        p2.setAge(25);
        p2.setName("Mister Bla");
        List<Person> people = new ArrayList<>();
        people.add(p1);
        people.add(p2);
        return people;
    }
}
