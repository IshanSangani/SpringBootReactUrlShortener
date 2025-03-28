package com.ishan.urlshort.url.model;


import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;



@Document(collection="url")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Url {
    @Id 
    private String id;  // This will be the short URL key
    private String longUrl;
    private Instant createdAt;
    private Instant expiresAt;
}
