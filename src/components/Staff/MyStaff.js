//import React from 'react';
import React from 'react'
import PropTypes from "prop-types";
import VexFlow from 'vexflow'
import './MyStaff.css';
//import Staff from './Staff';

class MyStaff extends React.Component {

    static propTypes = {
        clef: PropTypes.string,
        timeSignature: PropTypes.string,
        notes: PropTypes.array,
    };

    constructor(props){
        super(props);

        this.VF = VexFlow.Flow;
        this.width = 600;
        this.height = 150;

        // Ref to cointainer div
        this.container = React.createRef();
        this.rendererRef = React.createRef();
    }

    componentDidMount() {
        console.log("component mounted " + this.props.notes);

        // VF
        const { Formatter, Renderer, Stave, StaveNote } = this.VF;

        // Renderer
        if (this.rendererRef.current == null) {
            this.rendererRef.current = new Renderer(this.container.current, Renderer.Backends.SVG);
        }

        this.renderer = this.rendererRef.current;
        this.renderer.resize(this.width, this.height);

        // Context
        const context = this.renderer.getContext()//const
        context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed')

        // Stave
        this.stave = new Stave(0, 0, this.width);
        this.stave.addClef(this.props.clef).addTimeSignature(this.props.timeSignature);
        this.stave.setContext(context).draw()

        // Notes
        const processedNotes = this.props.notes
            .map(
                note => (typeof note === 'string' ? { key: note } : note)
            )
            .map(
                note => Array.isArray(note) ? { key: note[0], duration: note[1] } : note
            )
            .map(
                ({ key, ...rest }) =>
                    typeof key === 'string'
                    ? { key: key.includes('/') ? key : `${key[0]}/${key.slice(1)}`, ...rest, }
                    : rest
            )
            .map(
                ({ key, keys, duration = '1' }) =>
                    new StaveNote({
                        keys: key ? [key] : keys,
                        duration: String(duration),
                    })
            );
        
        // TEST
        // var mi =new StaveNote({
        //     keys: [String("e/4")],
        //     duration: String("1"),
        // })
        // processedNotes.push(mi);

        // Formatter
        Formatter.FormatAndDraw(context, this.stave, processedNotes, {
           auto_beam: true,
        });
    }

    componentDidUpdate () {
        console.log("component updated " + this.props.notes);
    }

    render(){
        return (
            <div id='Stave' ref={this.container}>
            </div>
        );
    }
}

export default MyStaff;