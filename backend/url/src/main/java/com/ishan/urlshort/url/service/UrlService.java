package com.ishan.urlshort.url.service;

import com.ishan.urlshort.url.model.Url;
import com.ishan.urlshort.url.repository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;



@Service
public class UrlService {
    @Autowired
    private UrlRepository urlRepository;
     
    public String shortenUrl(String longUrl,int expiryDays){
        String shortId = UUID.randomUUID().toString().substring(0, 6);
        Instant expiresAt = Instant.now().plusSeconds(expiryDays * 86400);
        Url url = new Url(shortId, longUrl, Instant.now(), expiresAt);
        urlRepository.save(url);
        return shortId;
    }
    
    public Optional<String> getLongUrl(String shortId) {
        return urlRepository.findById(shortId)
                .map(Url::getLongUrl);
    }
}
