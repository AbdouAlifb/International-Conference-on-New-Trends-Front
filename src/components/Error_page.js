import React from 'react'
import { Link } from 'react-router-dom'

export default function Errore() {
  return (
    <div style={{ position: 'relative', textAlign: 'right', color: 'white', overflow: 'hidden' }}>
                <img src={`${process.env.PUBLIC_URL}/comm.jpg`} alt="Marrakech" style={{ width: '100%', height: 'auto' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3em', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}>
                        ERROR PAGE 
                    </h1>
                    <p style={{ marginTop: '1rem', fontSize: '1.5em' }}>
                        return a page <Link to={'/'}>acceuil</Link>  
                    </p>
                </div>
            </div>
  )
}
