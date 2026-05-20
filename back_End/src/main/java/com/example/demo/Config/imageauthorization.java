package com.example.demo.Config;



import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class    imageauthorization implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry reg)
    {
        String path= Paths.get("imagefolder").toAbsolutePath().toString();
        reg.addResourceHandler("/imagefolder/**").addResourceLocations("file:"+path+"/");;
    }
}
