package com.saehan.elevblack.blackbox;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan()
public class BlackboxApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlackboxApplication.class, args);
	}

}
