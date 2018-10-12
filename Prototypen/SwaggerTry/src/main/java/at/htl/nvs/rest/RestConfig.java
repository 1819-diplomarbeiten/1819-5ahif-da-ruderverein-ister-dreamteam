package at.htl.nvs.rest;

import io.swagger.jaxrs.config.BeanConfig;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("rs")
public class RestConfig extends Application {
    public RestConfig(){
        Init();
    }

    private void Init() {
        BeanConfig beanConfig = new BeanConfig();
        beanConfig.setVersion("1.0.0");
        beanConfig.setSchemes(new String[]{"http"});
        beanConfig.setHost("localhost:8080");
        beanConfig.setBasePath("/swagger/rs");
        beanConfig.setResourcePackage("at.htl.nvs.rest");
        beanConfig.setTitle("Person Server");
        beanConfig.setDescription("Rest Documentation");
        beanConfig.setScan(true);
    }
}
