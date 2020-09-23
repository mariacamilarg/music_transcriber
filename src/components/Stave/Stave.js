import React from 'react';
import Vex from 'vexflow';

import "./Stave.css";
 
function Stave() {
    var VF = Vex.Flow;
    var info ={
        canvas : document.getElementById("stave-canvas"),
        div: document.getElementById("staveDic"),
        canvasWidth : 500,
        canvasHeight: 500,
    };

    var renderer = new VF.Renderer(
        info.candivvas,
        VF.Renderer.Backends.CANVAS
    );
    
    renderer.resize(info.canvasWidth, info.canvasHeight);
    var context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    var stave = new VF.Stave(10,40,400);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();
    
    return (
        <div>
            <canvas id="stave-canvas"></canvas>
        </div>
      
    );
    
}

export default Stave;