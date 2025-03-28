package com.ishan.urlshort.url.repository;

import com.ishan.urlshort.url.model.Url;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;


public interface UrlRepository extends MongoRepository<Url, String> {   
    Optional<Url> findById(String id);
} 