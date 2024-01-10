import React, { useContext, useEffect, useRef } from 'react';
import { audioContext } from '../../providers/AudioContextProvider';
import './index.scss';

const Oscilloscope = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { analyser } = useContext(audioContext);

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);

  useEffect(() => {
    draw();
  }, [canvasRef]);

  const draw = () => {
    requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasCtx = canvasRef.current.getContext('2d');

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = '#39ff14';

    canvasCtx.beginPath();

    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * canvas.height) / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }
    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  };

  return <canvas id="oscilloscope" ref={canvasRef}></canvas>;
};

export default Oscilloscope;
