import React from 'react'
import PropTypes from "prop-types";
import VexFlow from 'vexflow'
import './Staff.css';
import playTone from "../../libs/simpleTones";

class Staff extends React.Component {

    static propTypes = {
        clef: PropTypes.string,
        timeSignature: PropTypes.string,
        notes: PropTypes.array,
        tempo: PropTypes.number,
    };

    constructor(props){
        super(props);

        this.VF = VexFlow.Flow;
        this.width = 800;
        this.height = 150;

        // Refs for the div container and the renderer
        this.container = React.createRef();
        this.rendererRef = React.createRef();
        this.played=-1;
    }

    parseNotes (unparsedNotes) {

        // VF
        var barSum=0;
        const { StaveNote, Accidental, BarNote } = this.VF;
        const newUnparsednotes=[];
        //var last=unparsedNotes.length-1;
        for (const n in unparsedNotes){
            const keys=unparsedNotes[n].keys;
            const duration=unparsedNotes[n].duration
            var dot= unparsedNotes[n].dot!==undefined ? unparsedNotes[n].dot : null;
            if(dot!==null && dot[0]){
                barSum+=1/duration[0]+1/(duration[0]*2);
            }
            else{
                barSum+=1/duration[0];
            }
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
            if(barSum>1){
                newUnparsednotes.push(new BarNote());
                barSum=1/duration[0];
            }
            if (parseInt(n)=== parseInt(this.props.selected)){
                note.setStyle({ fillStyle: 'red', strokeStyle: 'red' });
            }
            if (parseInt(n)=== parseInt(this.played)){
                console.log("this.played = "+this.played);
                note.setStyle({ fillStyle: 'blue', strokeStyle: 'blue' });
            }
            newUnparsednotes.push(note);
            
        }
        return newUnparsednotes;
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

    paint = ()=> {
        this.initializeRenderer();
        this.initializeContext();

        // Open Group
        this.group = this.context.openGroup();

        this.paintStaff();
        if(this.props.notes.length>0){
            this.paintNotes();
        }
        // Close group:
        this.context.closeGroup();
    }

    clear = ()=> {
        // Delete the existing group to paint again
        this.context = this.renderer.getContext();
        this.context.svg.removeChild(this.group);
    }

    componentDidMount () {        
        this.paint();
    }

    componentDidUpdate () {
        this.clear();
        this.paint();
    }

    player=()=>{
        var total=0.0;
        for(const n in this.props.notes){
            var note=this.props.notes[n];
            var keys=note.keys;
            var duration=note.duration[0];
            var rest=false;
            if(String(note.duration).includes('r')){
                rest=true;
            }
            var dot=note.dot!==undefined ? note.dot : false;
            var toneDuration=((60/this.props.tempo)*4)/duration;
            if(String(dot)==="true"){
                toneDuration+=toneDuration/2;
            }
            for(const k in keys){
                var decomp=String(keys[k]).split('/');
                var name=decomp[0]+decomp[1];
                this.playNote(n,name,toneDuration, rest, total);
            }
            total=total+toneDuration;
        }
        var that=this;
        setTimeout(function(){ that.played=-1; that.componentDidUpdate();}, (total+1)*1000);
    }

    playNote=(nb,note,duration, rest,delay)=>{
        var time=1.5;
        if(duration>1.5){
            time=duration;
        }
        var that=this;
        if(rest===true){
            setTimeout(function(){ that.played=nb; that.componentDidUpdate(); console.log("chut"); }, delay*1000);
        }
        else{
            setTimeout(function(){ that.played=nb; that.componentDidUpdate(); playTone(note,"sine",time); }, delay*1000);
        }
        
    }

    render(){
        return (
            <div>
                <div id='Stave' ref={this.container} />
                <button onClick={this.player}>Play</button>
            </div>
            

        );
    }
}

export default Staff;
