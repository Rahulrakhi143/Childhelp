import React, { useRef, useState, useEffect } from 'react'
import './HandwritingCanvas.css'

const HandwritingCanvas = ({ target, mode, language, subject, onSubmit, disabled }) => {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [showTracing, setShowTracing] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw tracing guide if in tracing mode
    if (mode === 'tracing' && showTracing && target) {
      drawTracingGuide(ctx, target, canvas.width, canvas.height)
    }
  }, [target, mode, showTracing])

  const drawTracingGuide = (ctx, text, width, height) => {
    ctx.strokeStyle = '#FFB6C1'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.font = 'bold 120px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.strokeText(text, width / 2, height / 2)
    ctx.setLineDash([])
  }

  const startDrawing = (e) => {
    if (disabled) return
    setIsDrawing(true)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
    
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e) => {
    if (!isDrawing || disabled) return
    e.preventDefault()
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
    
    ctx.strokeStyle = '#FF6B9D'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Redraw tracing guide if needed
    if (mode === 'tracing' && showTracing && target) {
      drawTracingGuide(ctx, target, canvas.width, canvas.height)
    }
  }

  const handleSubmit = () => {
    const canvas = canvasRef.current
    const imageData = canvas.toDataURL('image/png')
    onSubmit(imageData)
  }

  return (
    <div className="handwriting-canvas-container">
      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="drawing-canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      
      <div className="canvas-controls">
        <button 
          className="clear-btn" 
          onClick={clearCanvas}
          disabled={disabled}
        >
          🗑️ Clear
        </button>
        {mode === 'tracing' && (
          <button 
            className="toggle-tracing-btn"
            onClick={() => setShowTracing(!showTracing)}
          >
            {showTracing ? '👁️ Hide Guide' : '👁️ Show Guide'}
          </button>
        )}
        <button 
          className="submit-btn" 
          onClick={handleSubmit}
          disabled={disabled}
        >
          ✅ Check
        </button>
      </div>
    </div>
  )
}

export default HandwritingCanvas
