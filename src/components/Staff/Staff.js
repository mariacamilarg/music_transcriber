import React from 'react'
import PropTypes from "prop-types";
import VexFlow from 'vexflow'
import './Staff.css';

class Staff extends React.Component {

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

        // Refs for the div container and the renderer
        this.container = React.createRef();
        this.rendererRef = React.createRef();
    }

    parseNotes (unparsedNotes) {

        // VF
        var barSum=0;
        const { StaveNote, Accidental, BarNote } = this.VF;
        const newUnparsednotes=[];
        for (const n in unparsedNotes){
            const keys=unparsedNotes[n].keys;
            const duration=unparsedNotes[n].duration
            barSum+=1/duration;
            var dot= unparsedNotes[n].dot!==undefined ? unparsedNotes[n].dot : null;
            const note=new StaveNote({
                clef:this.props.clef,
                keys:keys,
                duration:duration
            });
            for (const s in keys){
                var str=String(keys[s]);
                if(str.includes("#")){
                    note.addAccidental(s, new Accidental("#"));
                }
                if(str.includes("b")){
                    note.addAccidental(s, new Accidental("b"));
                }
            }
            for(var d in dot){
                if(dot[d]){
                    note.addDot(d);
                }
            }
            newUnparsednotes.push(note);
            if(barSum>=1){
                newUnparsednotes.push(new BarNote());
                barSum=0;
            }
        }
        return newUnparsednotes;
        /*return unparsedNotes
            .map(
                ({ keys, duration = '1' }) =>
                    new StaveNote({
                        clef: this.props.clef,
                        keys: keys,
                        duration: duration,
                    })
            );
        */
        // return unparsedNotes
        //     .map(
        //         note => (typeof note === 'string' ? { key: note } : note)
        //     )
        //     .map(
        //         note => Array.isArray(note) ? { key: note[0], duration: note[1] } : note
        //     )
        //     .map(
        //         ({ key, ...rest }) =>
        //             typeof key === 'string'
        //             ? { key: key.includes('/') ? key : `${key[0]}/${key.slice(1)}`, ...rest, }
        //             : rest
        //     )
        //     .map(
        //         ({ key, keys, duration = '1' }) =>
        //             new StaveNote({
        //                 keys: key ? [key] : keys,
        //                 duration: String(duration),
        //             })
        //     );
    }

    initializeRenderer() {
        // VF
        const { Renderer } = this.VF;

        // Renderer
        if (this.rendererRef.current == null) {
            this.rendererRef.current = new Renderer(this.container.current, Renderer.Backends.SVG);
        }

        this.renderer = this.rendererRef.current;
        this.renderer.resize(this.width, this.height);
    }

    initializeContext() {
        // Context
        this.context = this.renderer.getContext()
        this.context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed')
    }

    paintStaff () {
        
        // VF
        const { Stave } = this.VF;

        // Stave
        this.stave = new Stave(0, 0, this.width);
        this.stave.addClef(this.props.clef).addTimeSignature(this.props.timeSignature);
        this.stave.setContext(this.context).draw()
    }

    paintNotes () {

        // VF
        const { Formatter } = this.VF;

        // Notes
        this.parsedNotes = this.parseNotes(this.props.notes);
        // Update context
        this.context = this.renderer.getContext()
        
        // Formatter
        Formatter.FormatAndDraw(this.context, this.stave, this.parsedNotes, {
           auto_beam: true,
        });
    }

    paint () {
        this.initializeRenderer();
        this.initializeContext();

        // Open Group
        this.group = this.context.openGroup();

        this.paintStaff();
        this.paintNotes();

        // Close group:
        this.context.closeGroup();
    }

    clear () {
        // Delete the existing group to paint again
        this.context = this.renderer.getContext();
        this.context.svg.removeChild(this.group);
    }

    componentDidMount () {
        console.log("component mounted " + this.props.notes.map(note => note.keys));
        
        this.paint();
    }

    componentDidUpdate () {
        console.log("component updated " + this.props.notes.map(note => note.keys));

        this.clear();
        this.paint();
    }

    render(){
        return (
            <div id='Stave' ref={this.container} />
        );
    }
}

export default Staff;
