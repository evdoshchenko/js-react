// jsx
{
  const Header = () => {
    return <h2>Hello, world!</h2>
  }
  
  const Button = () => {
    const text = "Enter"
    const res = () => { return "Press function"}
    const p = <p>Press p</p>
    const logged = true;
    return <button>{logged ? text : "Log in"}</button>
  }
  
  const Input = () => {
    const styledInput = {
      width: '200px'
    }
    return <input
                style={styledInput}
                type ='text'
                placeholder='Are you rdy?'
                className = "first"     // not class !
                htmlFor = ""/>          // not for   !
  }
  
  const Danilynx = () => {
    return (
      <div>
        <Header />
        <Input />
        <Button />
      </div>
    )
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Danilynx />
    </React.StrictMode>
  );
}
// properties and states of components     bind
{
  // function WhoAmI({name, surname, link}) {
  //   return (
  //     <React.Fragment>
  //       <h1>My name is {name}, surname - {surname}</h1>
  //       <a href={link}>My profile</a>
  //     </React.Fragment>
  //   )
  // }

  class WhoAmI extends Component {
    constructor(props) {
      super(props);
      this.state = {
        years: 26
      }

      // this.nextYear = () => {                        // method 2
      //   this.setState(state => ({
      //     years: ++state.years
      //   }))
      // }

          // this.nextYear = this.nextYear.bind(this);  //  method 1 - bind
    }
          // nextYear() {
          //   this.setState(state => ({
          //     years: ++state.years
          //   }))
          // }

    nextYear = () => {                                 // method 3 - new
      this.setState(state => ({
        years: ++state.years
      }))
    }


    render() {
      const {name, surname, link} = this.props;
      const {years} = this.state;
      return (
        <React.Fragment>
          <button onClick={this.nextYear}>+</button>
          <h1>My name is {name}, surname - {surname}, {years} years </h1>
          <a href={link}>My profile</a>
        </React.Fragment>
      )
    }
  }

  const All = () => {
    return (
      <>
        <WhoAmI name ='Jack' surname="Daniels" link="https://fb.com"/>
        <WhoAmI name ='Leo' surname="Di Caprio" link="https://fb.com"/>
        <WhoAmI name ='Zinedin' surname="Zidan" link="https://fb.com"/>
      </>
    )
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <All />
    </React.StrictMode>
  );
}
