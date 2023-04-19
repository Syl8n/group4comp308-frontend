import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function GameFrame() {
  const { id } = useParams();
  const navigate = useNavigate();

  function handleCancelClick() {
    navigate(`/patient/${id}`);
  }

  return (
    <div
      style={{
        paddingTop: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          alignItems: 'center',
          justifyContent: 'center',
          width: '700px',
          height: '550px',
          border: '1px solid gray',
        }}
      >
        <iframe
          src="game.html"
          title="Matching Game"
          style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        />
        <Button variant="secondary" onClick={handleCancelClick}>Cancel</Button>
      </div>
    </div>
  );
}

export default GameFrame;
