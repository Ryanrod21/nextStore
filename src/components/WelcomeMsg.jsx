'use client';
import { useEffect, useState } from 'react';
import './Welcome.css';

export default function WelcomeModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenWelcome');

    if (!hasSeenModal) {
      setShow(true);
      sessionStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Welcome to Our Site!</h2>
        <p className="modal-message">We're glad you're here.</p>
        <button className="close-button" onClick={() => setShow(false)}>
          Close
        </button>
      </div>
    </div>
  );
}
