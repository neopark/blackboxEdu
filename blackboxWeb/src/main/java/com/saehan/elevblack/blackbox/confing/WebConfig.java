package com.saehan.elevblack.blackbox.confing;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;


@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Value("${custom.path.upload-images}")
       private String uploadImagesPath;

    
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry
				.addMapping("/**")
				.allowedOrigins("http://127.0.0.1:2022/","http://localhost:2022/","http://221.143.48.220:2022/"
                ,"http://127.0.0.1:3000/","http://localhost:3000/","http://221.143.48.220:3000/","https://221.143.48.220:443/"
                , "http://blackbox.saehanel.co.kr/", "https://blackbox.saehanel.co.kr/");
	}

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
  registry
      .addResourceHandler("/upload/**", "/upload-test/**")
      .addResourceLocations("file:" + uploadImagesPath + "/");

      registry.addResourceHandler("/**")
      .addResourceLocations("classpath:/static/")
      .resourceChain(true)
      .addResolver(new PathResourceResolver() {
          @Override
          protected Resource getResource(String resourcePath,
              Resource location) throws IOException {
              Resource requestedResource = location.createRelative(resourcePath);
              return requestedResource.exists() && requestedResource.isReadable() ? requestedResource
              : new ClassPathResource("/static/index.html");
          }
      })
      .addResolver(new PathResourceResolver() {
          @Override
          protected Resource getResource(String resourcePath,
              Resource location) throws IOException {
              Resource requestedResource = location.createRelative(resourcePath);
              return requestedResource.exists() && requestedResource.isReadable() ? requestedResource
              : new ClassPathResource("/static/run_hist.xlsx");
          }
      });
    }
}
