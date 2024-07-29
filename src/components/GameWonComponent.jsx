import React from 'react'

export const GameWonComponent = ({setGameWon}) => {
  return (
    <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
            <div className="alert alert-success text-center">
            <h1 className="mb-5">You win!</h1>
                <button 
                    className="btn btn-primary"
                    onClick={() => setGameWon(false)}    
                >
                    Play Again
                </button>
            </div>
        </div>
    </div>
  )
}
