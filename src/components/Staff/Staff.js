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

        // Ref to cointainer div
        this.container = React.createRef();
        this.rendererRef = React.createRef();
    }

    parseNotes (unparsedNotes) {

        // VF
        const { StaveNote } = this.VF;

        return unparsedNotes
            .map(
                ({ keys, duration = '1' }) =>
                    new StaveNote({
                        clef: this.props.clef,
                        keys: keys,
                        duration: duration,
                    })
            );

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

    paintStaff () {
        
        // VF
        const { Renderer, Stave } = this.VF;

        // Renderer
        if (this.rendererRef.current == null) {
            this.rendererRef.current = new Renderer(this.container.current, Renderer.Backends.SVG);
        }

        this.renderer = this.rendererRef.current;
        this.renderer.resize(this.width, this.height);

        // Context
        this.context = this.renderer.getContext()
        this.context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed')

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

    componentDidMount () {
        console.log("component mounted " + this.props.notes.map(note => note.keys));
        this.paintStaff();
        this.paintNotes();
    }

    componentDidUpdate () {
        console.log("component updated " + this.props.notes.map(note => note.keys));

        // const { StaveNote } = this.VF;
        // var mi = new StaveNote({
        //     keys: [String("e/4")],
        //     duration: String("1"),
        // })
        // this.parsedNotes.push(mi);

        this.paintNotes();
    }

    render(){
        return (
            <div>
                <div id='Stave' ref={this.container} />
            </div>
        );
    }
}

export default Staff;