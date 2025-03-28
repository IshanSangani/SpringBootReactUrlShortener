package com.ishan.urlshort.url.controller;

import com.ishan.urlshort.url.model.Url;
import com.ishan.urlshort.url.repository.UrlRepository; 
import com.ishan.urlshort.url.service.UrlService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/url")
@CrossOrigin(
  origins = "http://localhost:3000",
  allowedHeaders = "*",
  methods = {RequestMethod.GET, RequestMethod.POST}
)
public class UrlController {
    @Autowired
    private UrlService urlService;
    @Autowired
    private UrlRepository UrlRepository;

    @PostMapping("/shorten")
    public Map<String,String> shortenUrl(@RequestBody Map<String,Object> request){
        String longUrl = (String)request.get("longUrl");
        int expiryDays = (int) request.getOrDefault("expiryDays", 7);
        String shortId = urlService.shortenUrl(longUrl, expiryDays);
        
        return Map.of("shortUrl","http://localhost:8080/api/url/"+shortId);
    }

    @GetMapping("/{shortUrl}")
public RedirectView redirectToOriginalUrl(@PathVariable String shortUrl) {
    Optional<Url> urlOptional = UrlRepository.findById(shortUrl);

    if (urlOptional.isPresent()) {
        String originalUrl = urlOptional.get().getLongUrl();
        
        // Ensure the URL has "https://" or "http://"
        if (!originalUrl.startsWith("http")) {
            originalUrl = "https://" + originalUrl;
        }

        return new RedirectView(originalUrl);
    } else {
        return new RedirectView("/error");  // Redirect to an error page if not found
    }
}



    @GetMapping("/getPreviousUrls")
    public Map<String, Object> getPreviousUrls() {
        return Map.of("urls", UrlRepository.findAll());
    }

}
