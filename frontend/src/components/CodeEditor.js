import React, { useEffect,useRef } from 'react'
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/clike/clike';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closebrackets';
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
          mirrorInstanceRef.current.setValue(startcode);
    }
    return () => {
      if (mirrorInstanceRef.current) {
        mirrorInstanceRef.current.toTextArea();
      }
    };
  },[startcode])


  useEffect(() => {
    const handleChange = (editor, changeObj) => {
      // Handle the CodeMirror editor change
      updatecode(editor.getValue());
    };

    if (mirrorInstanceRef.current) {
      mirrorInstanceRef.current.on('change', handleChange);
    }

    return () => {
      if (mirrorInstanceRef.current) {
        mirrorInstanceRef.current.off('change', handleChange);
      }
    };
  }, [updatecode]);

  return (
    <textarea ref={textareaRef} id="codeeditor" ></textarea>
  );
}

export default CodeEditor