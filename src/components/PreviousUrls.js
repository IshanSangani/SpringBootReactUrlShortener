import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UrlShortener.css';

const PreviousUrls = () => {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPreviousUrls = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/api/url/getPreviousUrls');
                setUrls(response.data.urls);
                setError(null);
            } catch (err) {
                console.error('Error fetching previous URLs:', err);
                setError('Failed to load previous URLs');
            } finally {
                setLoading(false);
            }
        };

        fetchPreviousUrls();
    }, []);

    // Function to format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="previous-urls-section">
            <h2 className="section-title">Previously Shortened URLs</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            {loading ? (
                <div className="loader">
                    <div className="spinner"></div>
                    <p>Loading URLs...</p>
                </div>
            ) : urls.length === 0 ? (
                <div className="empty-state">
                    <p>No URLs have been shortened yet</p>
                    <small>Shorten your first URL above to see it here</small>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="urls-table">
                        <thead>
                            <tr>
                                <th className="id-column">ID</th>
                                <th className="short-url-column">Short URL</th>
                                <th className="original-url-column">Original URL</th>
                                <th className="created-column">Created</th>
                                <th className="actions-column">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {urls.map((url, index) => (
                                <tr key={url.id || index}>
                                    <td>{url.id || '-'}</td>
                                    <td>
                                        <a 
                                            href={`http://localhost:8080/api/url/${url.id}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="short-url"
                                        >
                                            {`localhost:8080/api/url/${url.id}`}
                                        </a>
                                    </td>
                                    <td className="long-url-cell">
                                        <div className="url-wrapper" title={url.longUrl}>
                                            {url.longUrl}
                                        </div>
                                    </td>
                                    <td className="date-cell">
                                        {formatDate(url.createdAt)}
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button 
                                                className="copy-button-small"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(`http://localhost:8080/api/url/${url.id}`)
                                                        .then(() => alert("Short URL copied!"))
                                                        .catch(err => console.error("Failed to copy:", err));
                                                }}
                                            >
                                                Copy
                                            </button>
                                            <a 
                                                className="visit-button"
                                                href={`http://localhost:8080/api/url/${url.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Visit
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PreviousUrls;