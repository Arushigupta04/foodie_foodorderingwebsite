import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './TrackingPage.css';

const API_URL = 'http://localhost:5000'; // Replace with your backend URL

const TrackingPage = () => {
    const { id } = useParams(); // Order ID from URL parameters
    const [tracking, setTracking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const [currentActionIndex, setCurrentActionIndex] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [completedActions, setCompletedActions] = useState({});

    const actions = ['received', 'accepted', 'prepared', 'out-for-delivery', 'delivered'];

    // Fetch tracking data from the backend
    const fetchTracking = async () => {
        try {
            const response = await fetch(`${API_URL}/api/tracking/items/${id}/tracking`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setTracking(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tracking data:', error);
            setLoading(false);
        }
    };

    // Fetch the user's role
    const fetchUserRole = async () => {
        try {
            const response = await fetch(`${API_URL}/api/user`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setUserRole(data.role);
        } catch (error) {
            console.error('Error fetching user role:', error);
        }
    };

    // Handle action button click and log the action
    const handleLogAction = async (action, index) => {
        if (index !== currentActionIndex) {
            setErrorMessage(`Please complete "${actions[currentActionIndex]}" first.`);
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/tracking/items/${id}/${action}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({}),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Update the action state for this specific order in localStorage
            const nextActionIndex = currentActionIndex + 1;
            setCurrentActionIndex(nextActionIndex);

            // Store the next completed action index for this specific order
            const updatedActions = { ...completedActions, [id]: nextActionIndex };
            setCompletedActions(updatedActions);
            localStorage.setItem('completedActions', JSON.stringify(updatedActions));

            fetchTracking();
        } catch (error) {
            console.error('Error logging action:', error);
        }
    };

    // Load initial state from localStorage for this specific order
    useEffect(() => {
        const storedActions = JSON.parse(localStorage.getItem('completedActions')) || {};
        const storedActionIndex = storedActions[id] || 0; // Default to 0 if not found for the order
        setCompletedActions(storedActions);
        setCurrentActionIndex(storedActionIndex);

        fetchTracking();
        fetchUserRole();
    }, [id]);

    if (loading) {
        return <div className="loading-message">Loading...</div>;
    }

    // Sort the tracking actions to show the latest actions first
    const sortedTracking = [...tracking].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    return (
        <div className='newww'>
        <div className="tracking-page">
            <h1 className="page-title">Tracking Information</h1>
            <div className="content">
                <div className="button-column">
                    {userRole === 'Admin' && actions.map((action, index) => (
                        <button
                            key={action}
                            className={`action-button ${
                                index === currentActionIndex
                                    ? 'active-button'
                                    : index < currentActionIndex
                                    ? 'completed-button'
                                    : 'disabled-button'
                            }`}
                            onClick={() => handleLogAction(action, index)}
                            disabled={index !== currentActionIndex || index < currentActionIndex}
                        >
                            {action.charAt(0).toUpperCase() + action.slice(1)}
                        </button>
                    ))}

                    {userRole === 'User' && actions.map((action, index) => (
                        <div
                            key={action}
                            className={`action-box ${
                                completedActions[id] > index ? 'completed-box' : 'pending-box'
                            }`}
                        >
                            <span>{action.charAt(0).toUpperCase() + action.slice(1)}</span>
                        </div>
                    ))}
                </div>
                <div className="tracking-history">
                    <h2 className="history-title">Tracking History</h2>
                    <ul>
                        {sortedTracking.map((track) => (
                            <li key={track._id}>
                                <span className="action-name">{track.action}</span> by <b>{track.user}</b> at{' '}
                                <time>{new Date(track.timestamp).toLocaleString()}</time>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
        </div>
    );
};

export default TrackingPage;
