package com.batch10.moviecollectionmanager.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI movieCollectionOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Movie Collection Manager API")
                        .description("REST API documentation for Movie Collection Manager")
                        .version("1.0"));
    }
}