//import React from 'react';
import React, { useRef, useEffect } from 'react'
import VexFlow from 'vexflow'
import './MyStaff.css';
//import Staff from './Staff';

function Staff(props) { 
    const VF = VexFlow.Flow
    const { Formatter, Renderer, StaveNote } = VF
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
       //var mi =new StaveNote({
       // keys: String("c/4"),
       // duration: String("1"),
       // })
       //processedNotes.push(mi);
       Formatter.FormatAndDraw(context, stave, processedNotes, {
           auto_beam: true,
       })
    })

    return (<div ref={container}/>);

}



class MyStaff extends React.Component {
    constructor(props){
        super(props);
        this.VF = VexFlow.Flow
        const { Stave } = this.VF
        this.clef='treble';
        this.timeSignature='4/4';
        this.width=600;
        this.height=150;

        //this.container = useRef() //const
        //this.rendererRef = useRef()   //const
        this.notes= props.mynotes
        console.log(this.notes)
        this.stave = new Stave(0, 0, this.width) //const
        this.stave.setWidth(this.width)
        this.stave.addClef(this.clef).addTimeSignature(this.timeSignature)
    }

    componentDidMount () {
        if (this.props.onMounted) {
            this.props.onMounted({
                addNote: note => this.addNote(note)
            });
        }
    }

    addNote(note){
        console.log("I am in MyStaff Method :"+note);
        this.notes.push(note);
        console.log(this.notes);
        this.forceUpdate();

    }


    render(){
        return (
            <div id='Stave'>
            <p>{this.notes}</p>
            <div id="staffPic">
                <Staff mynotes={this.notes} stave={this.stave} width={this.width} height={this.height}/>
            </div>
            <button onClick={() =>this.addNote("b/4")}>Add B/4</button>
        </div>
            );
    }

}

export default MyStaff;