import React, {useEffect, useState} from 'react';

const yeet = {
  fire: ''
};


document.addEventListener('DOMContentLoaded', () => {


  const options = {
    eventType: 'keydown',
    keystrokeDelay: 400
  };

  keyMapper([updateBackground, updateInputKeys], options);
});

function keyMapper(callbackList: any, options: any) {
  const delay = hasProperty('keystrokeDelay', options) && options.keystrokeDelay >= 300 && options.keystrokeDelay;
  const keystrokeDelay = delay || 1000;
  const eventType = hasProperty('eventType', options) && options.eventType || 'keydown';

  let state = {
    buffer: [],
    lastKeyTime: Date.now()
  };

  document.addEventListener(eventType, event => {
    event.preventDefault()
    const key = event.key;
    const currentTime = Date.now();
    let buffer:any = [];

    if (currentTime - state.lastKeyTime > keystrokeDelay) {
      buffer = [key];
    } else {
      buffer = [...state.buffer, key];
    }

    state = {buffer: buffer, lastKeyTime: currentTime};

    callbackList.forEach((callback: (arg0: any) => any) => callback(buffer));
  });

  function hasProperty(property:any, object:any) {
    return object && object.hasOwnProperty(property);
  }
}

function updateBackground(keySequence:any) {
  const validKeys = keySequence.every((key: string) => !isNaN(parseInt(key)) || key.toLowerCase() !== key.toUpperCase());
  // console.log(validKeys, "Yeet!")
}

function updateInputKeys(keySequence: any) {
  const userInput = keySequence.join('').toLowerCase();
  const keySequences = {
    'meta': 'Command Pressed',
    'shiftshift': 'Search Everywhere in all the things',

  };
  const userInputDisplay = document.querySelector('#user_input');
  // @ts-ignore
  userInputDisplay.textContent = userInput;
  console.log(userInput)

  yeet.fire =userInput // jank real jank

  const inputMessage = document.querySelector('#cheat_message');
  // @ts-ignore
  inputMessage.textContent = keySequences[userInput] || 'Nothing';
}

function App(){
  const [dankmeme] = useState(yeet.fire)
  const [viewCounter, setViewCounter] = useState(0)
  useEffect(()=> {
    setInterval(()=> {
      setViewCounter(viewCounter+1)
    }, 100)
  }, [])
  return (
      <div className="App">
      <aside className="sidebar">
        <h1 className="instructions">quickly type a key Ma sequences to do things:</h1>
        <ul className="list">
          {/*// flexbox add "Legend*/}
          {/*// ⇧ - Shift⌥ - Alt⌃ - Control⌘ - Command↵ - Enter"*/}
          <li className="list__item">Command</li>
          <li className="list__item">Shift Shift</li>
        </ul>
        <div className="user_input">
          <p className="user_input__label">You entered:</p>
          <p id="user_input" className="user_input__value"/>
        </div>
        <div id="cheat_block" className="cheat_block">
          <p>You got:</p>
          <p id="cheat_message" className="cheat_message">nothing yet</p>
        </div>
      </aside>
      {dankmeme}
    </div>
  );
}

export default App;
