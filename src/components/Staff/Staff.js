import React, { useRef, useEffect } from 'react'
import VexFlow from 'vexflow'
import './Staff.css';

const VF = VexFlow.Flow
const { Formatter, Renderer, Stave, StaveNote } = VF

function Staff() {

    const clef='treble';
    const timeSignature='4/4';
    const width=450;
    const height=150;

    const container = useRef()
    const rendererRef = useRef()
    
    useEffect(() => {
        
      if (rendererRef.current == null) {
        rendererRef.current = new Renderer(container.current, Renderer.Backends.SVG);
      }

      const renderer = rendererRef.current
      renderer.resize(width, height)

      const context = renderer.getContext()
      context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed')

      const stave = new Stave(0, 0, width)
      stave.setWidth(width)
      stave.addClef(clef).addTimeSignature(timeSignature)
      stave.setContext(context).draw()

      // const processedNotes = notes
      // .map(note => (typeof note === 'string' ? { key: note } : note))
      // .map(note =>
      //     Array.isArray(note) ? { key: note[0], duration: note[1] } : note
      // )
      // .map(({ key, ...rest }) =>
      //     typeof key === 'string'
      //     ? {
      //         key: key.includes('/') ? key : `${key[0]}/${key.slice(1)}`,
      //         ...rest,
      //         }
      //     : rest
      // )
      // .map(
      //     ({ key, keys, duration = 'q' }) =>
      //     new StaveNote({
      //         keys: key ? [key] : keys,
      //         duration: String(duration),
      //     })
      // )

      // Formatter.FormatAndDraw(context, stave, processedNotes, {
      //     auto_beam: true,
      // })
    })

    return (<div ref={container} />);

}

export default Staff;