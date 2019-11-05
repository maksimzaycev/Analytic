import React from 'react';
import '../css/main.css';

function Loader() {
    return (
        <div className="modal-backdrop">
            <span className="spinner"></span>
        </div>
    );
}

export default Loader;