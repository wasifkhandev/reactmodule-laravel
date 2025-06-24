import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fetched, setFetched] = useState(false);

    const fetchPosts = () => {
        setLoading(true);
        setError(null);
        setFetched(true);
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
            .then((response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    // Google Fonts link injection
    React.useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Roboto:wght@400;500&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => document.head.removeChild(link);
    }, []);

    return (
        <div style={{ fontFamily: 'Roboto, Montserrat, sans-serif', minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', padding: 0, margin: 0 }}>
            <div style={{ maxWidth: 650, margin: '48px auto', padding: 32, background: 'rgba(255,255,255,0.95)', borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
                <h1 style={{
                    textAlign: 'center',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 700,
                    fontSize: 32,
                    marginBottom: 18,
                    background: 'linear-gradient(90deg, #007bff 0%, #00c6ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: 1,
                    paddingTop: 20
                }}>
                    Fetch  Posts
                </h1>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <button
                        onClick={fetchPosts}
                        style={{
                            padding: '12px 32px',
                            fontSize: 18,
                            background: 'linear-gradient(90deg, #007bff 0%, #00c6ff 100%)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontWeight: 600,
                            fontFamily: 'Montserrat, sans-serif',
                            boxShadow: '0 2px 8px rgba(0,123,255,0.10)',
                            transition: 'transform 0.1s, box-shadow 0.1s',
                            outline: 'none',
                        }}
                        disabled={loading}
                        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
                        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        {loading ? 'Loading...' : 'Fetch Posts'}
                    </button>
                </div>
                {error && <p style={{ color: '#e74c3c', textAlign: 'center', fontWeight: 500 }}>Error: {error}</p>}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 8, animation: posts.length ? 'fadeIn 0.7s' : 'none' }}>
                    {posts.map(post => (
                        <div key={post.id} style={{
                            background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
                            borderRadius: 14,
                            boxShadow: '0 2px 8px rgba(253,160,133,0.10)',
                            padding: 24,
                            transition: 'transform 0.15s, box-shadow 0.15s',
                            cursor: 'pointer',
                            border: '1.5px solid #fff',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(253,160,133,0.18)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(253,160,133,0.10)';
                        }}
                        >
                            <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: 20, color: '#333', marginBottom: 8 }}>{post.title}</div>
                            <div style={{ color: '#444', fontSize: 16, lineHeight: 1.6 }}>{post.body}</div>
                        </div>
                    ))}
                </div>
                {fetched && !loading && posts.length === 0 && !error && (
                    <p style={{ textAlign: 'center', color: '#888', marginTop: 32 }}>No posts found.</p>
                )}
            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />); 
