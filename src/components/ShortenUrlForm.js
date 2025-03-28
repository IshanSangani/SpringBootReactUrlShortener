import React, { useState } from 'react';
import axios from 'axios';
import PreviousUrls from './PreviousUrls';
import './UrlShortener.css';

const ShortenUrlForm = () => {
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        try {
            const res = await axios.post("http://localhost:8080/api/url/shorten", { longUrl });
            setShortUrl(res.data.shortUrl);
            setLongUrl(""); // Clear the input after successful shortening
        } catch (err) {
            console.error("Error while shortening URL", err);
            setError("Failed to shorten URL. Please check the URL and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl)
            .then(() => {
                alert("URL copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy URL: ", err);
            });
    };

    return (
        <div className="url-shortener-container">
            <h1 className="page-title">URL Shortener</h1>
            
            <div className="url-form">
                <h2 className="form-title">Shorten Your URL</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input 
                            type="text" 
                            className="url-input"
                            value={longUrl} 
                            onChange={(e) => setLongUrl(e.target.value)} 
                            placeholder="Enter your long URL here..." 
                            required 
                            disabled={isLoading}
                        />
                        <button 
                            type="submit" 
                            className="submit-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Shortening...' : 'Shorten URL'}
                        </button>
                    </div>
                </form>
                
                {error && <div className="error-message">{error}</div>}
            </div>
            
            {shortUrl && (
                <div className="result-container">
                    <h3 className="result-title">Your shortened URL:</h3>
                    <a 
                        href={shortUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="short-url-link"
                    >
                        {shortUrl}
                    </a>
                    <div>
                        <button onClick={copyToClipboard} className="copy-button">
                            Copy to Clipboard
                        </button>
                    </div>
                </div>
            )}

            <PreviousUrls />
        </div>
    );
};

export default ShortenUrlForm;