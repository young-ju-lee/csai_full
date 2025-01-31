package com.kt.csai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;

@EnableEncryptableProperties
@EnableJpaRepositories
@EnableScheduling
@SpringBootApplication
public class Application extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(Application.class);
	}
	
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
