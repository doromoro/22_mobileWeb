import React from "react";

const ThemeContext = React.createContext("light");

function ContextApp() {
  return (
    <ThemeContext.Provider value="lavender">
      <Toolbar/>
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return (
    <div>
      <ThemeButton/>
    </div>
  );
}

function ThemeButton() {
  return (
    <div>
      <Button/>
    </div>
  );
}

function Button() {
  return (
    <div>
      <ThemeContext.Consumer>
        {value => (<div
                    style={{
                      margin:50,
                      padding:50,
                      backgroundColor:value,
                    }}>
                      <p>컨텍스트 사용예시</p>
                      <button>확인</button>
                    </div>)}
      </ThemeContext.Consumer>
    </div>
  );
}

export default ContextApp;