import React from 'react';
//import './Staff';
import './Staff.css';
//import Staff from './Staff';
import MyStaff from './MyStaff'


class StaveClass extends React.Component {
    /*
    constructor(props){
        super(props);
        //this.myStaff=<MyStaff mynotes={this.props.notes} onMounted={callbacks => this.cowMounted(callbacks)}/>;
    }
    */

    removeNote(index){
        console.log("Remove note number "+index);
        this.props.notes.pop()
        console.log(this.props.notes);
        //document.getElementById('staveStaff').remove(); 
        this.forceUpdate();
    }

    addNote(note){
        console.log("Add "+note);
        //this.props.notes.push(note);
        this.myStaff.addNote(note);
        //this.forceUpdate();
    }

    shouldComponentUpdate(nextProps) {
        console.log("Check if different");
        const differentNotes = this.props.notes !== nextProps.notes;
        return differentNotes;
    }

    /*
    If several props to check
    shouldComponentUpdate(nextProps) {
        const differentTitle = this.props.title !== nextProps.title;
        const differentDone = this.props.done !== nextProps.done
        return differentTitle || differentDone;
    }
    */
    staffMounted(callbacks){
        this.myStaff=callbacks;
    }

    render(){
        console.log("drawing");
        return (
        <div id='Stave'>
            <p>{this.props.notes}</p>
            <div id="staffPic">
                <MyStaff mynotes={this.props.notes} onMounted={callbacks => this.staffMounted(callbacks)}/>;
            </div>
            <button onClick={() =>this.addNote("b/4")}>Add B/4</button>
            <button onClick={() =>this.removeNote()}>Remove last note</button>
        </div>
        
        );
    }
}

export default StaveClass;