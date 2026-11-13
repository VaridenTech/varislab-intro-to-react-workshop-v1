import logo from "./assets/logo.svg";

export default function App() {
  return (
    <div className="welcome">
      <div className="welcome__card">
        <img className="welcome__logo" src={logo} alt="" />
        <h1 className="welcome__title">Aroi is ready</h1>
        <p className="welcome__text">
          The starter project is running. Open <code>src/App.tsx</code> and
          follow the lessons to turn this screen into a recipe finder.
        </p>
      </div>
    </div>
  );
}
