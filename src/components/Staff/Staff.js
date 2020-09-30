import React, { useRef, useEffect } from 'react'
import VexFlow from 'vexflow'
import './Staff.css';

// ECRIRE SOURCE DU CODE
/*
const VF = VexFlow.Flow
const { Formatter, Renderer, Stave, StaveNote } = VF
const clef='treble';
const timeSignature='4/4';
const width=600;
const height=150;



function Staff(props) { 
    const container = useRef() //const
    const rendererRef = useRef()   //const
    const notes= props.mynotes
    
    useEffect(() => {
        
      if (rendererRef.current == null) {
        rendererRef.current = new Renderer(container.current, Renderer.Backends.SVG);
      }

      const renderer = rendererRef.current //const
      renderer.resize(width, height)

      const context = renderer.getContext()//const
      context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed')

      const stave = new Stave(0, 0, width) //const
      stave.setWidth(width)
      stave.addClef(clef).addTimeSignature(timeSignature)
      stave.setContext(context).draw()

      //draw notes
      const processedNotes = notes //const
      .map(note => (typeof note === 'string' ? { key: note } : note))
      .map(note =>
           Array.isArray(note) ? { key: note[0], duration: note[1] } : note
      )
      .map(({ key, ...rest }) =>
          typeof key === 'string'
          ? {
              key: key.includes('/') ? key : `${key[0]}/${key.slice(1)}`,
              ...rest,
              }
           : rest
       )
       .map(
           ({ key, keys, duration = '1' }) =>
           new StaveNote({
               keys: key ? [key] : keys,
               duration: String(duration),
           })
       )

       Formatter.FormatAndDraw(context, stave, processedNotes, {
           auto_beam: true,
       })
    })

    return (<div ref={container}/>);

}
*/

function Staff(props) { 
    const VF = VexFlow.Flow
    const { Formatter, Renderer} = VF//, Stave, StaveNote } = VF
    const container = useRef() //const
    const rendererRef = useRef()   //const
    const notes= props.mynotes
    const stave= props.stave
    const width=props.width
    const height=props.height
    
    useEffect(() => {
        
      if (rendererRef.current == null) {
        rendererRef.current = new Renderer(container.current, Renderer.Backends.SVG);
      }

      const renderer = rendererRef.current //const
      renderer.resize(width, height)

      const context = renderer.getContext()//const
      context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed')

      stave.setContext(context).draw()

       Formatter.FormatAndDraw(context, stave, notes, {
           auto_beam: true,
       })
    })

    return (<div ref={container}/>);

}



export default Staff;
