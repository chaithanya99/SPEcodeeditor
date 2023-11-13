import React, { useEffect,useRef } from 'react'
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/clike/clike';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closebrackets';
// import {fromTextArea} from 'codemirror'
const CodeEditor = ({startcode,updatecode}) => {
    const textareaRef= useRef(null);
    const mirrorInstanceRef=useRef(null);
  useEffect(()=>{
    const textareaelement= textareaRef.current;
    if(textareaelement){
        if(mirrorInstanceRef.current){
            mirrorInstanceRef.current.toTextArea();
        }
        

          mirrorInstanceRef.current=Codemirror.fromTextArea(document.getElementById('codeeditor'),{
              mode:{ name: "text/x-c++src"},
              theme: 'dracula',
              lineNumbers: true,
              autoCloseBrackets: true, 
              matchBrackets: true,
          }
          )
        //   mirrorInstanceRef.current.setValue(startcode);
        // mirrorInstanceRef.current.on('change', (editor, changeObj) => {
        //   // Handle the CodeMirror editor change
        //   updatecode(editor.getValue());
        // });
    }
    return () => {
      if (mirrorInstanceRef.current) {
        mirrorInstanceRef.current.toTextArea();
      }
    };
    // start();
  },[startcode,updatecode])
  // useEffect(()=>{
  //   mirrorInstanceRef.current.setValue(startcode);
  //   mirrorInstanceRef.current.on('change', (editor, changeObj) => {
  //     // Handle the CodeMirror editor change
  //     updatecode(editor.getValue());
  //   });
  // },[startcode,updatecode])
  return (
    <textarea ref={textareaRef} id="codeeditor" ></textarea>
  );
}

export default CodeEditor