//package com.saiph.application.GestionRH.configuration;
//import com.fasterxml.jackson.core.JsonGenerator;
//import com.fasterxml.jackson.core.JsonParser;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.DeserializationContext;
//import com.fasterxml.jackson.databind.JsonDeserializer;
//import com.fasterxml.jackson.databind.JsonSerializer;
//import com.fasterxml.jackson.databind.SerializerProvider;
//import com.fasterxml.jackson.databind.module.SimpleModule;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//
//import java.io.IOException;
//
//@Configuration
//public class JacksonConfig {
//
//    @Bean
//    public Jackson2ObjectMapperBuilder jacksonBuilder() {
//        Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder();
//        SimpleModule module = new SimpleModule();
//        module.addSerializer(GrantedAuthority.class, new GrantedAuthoritySerializer());
//        module.addDeserializer(GrantedAuthority.class, new GrantedAuthorityDeserializer());
//        builder.modules(module);
//        return builder;
//    }
//
//    public static class GrantedAuthoritySerializer extends JsonSerializer<GrantedAuthority> {
//        @Override
//        public void serialize(GrantedAuthority value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
//            gen.writeString(value.getAuthority());
//        }
//    }
//
//    public static class GrantedAuthorityDeserializer extends JsonDeserializer<GrantedAuthority> {
//        @Override
//        public GrantedAuthority deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
//            return new SimpleGrantedAuthority(p.getValueAsString());
//        }
//    }
//}
