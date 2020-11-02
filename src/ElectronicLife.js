import React, { Component } from 'react';
import World from "./World";
import { connect } from "react-redux";
import { populateWorld, takeTurn } from "./actionCreators";
import "./ElectronicLife.css";

class ElectronicLife extends Component{
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.props.populateWorld();
    setInterval(() => this.props.takeTurn(), 1000);
  }

  handleClick(e){
    this.props.takeTurn();
  }

  render(){
    return(
      <div id="electronic-life-div">
        <div id="button-panel-div">
          <div className="div-button" id="dbutton1"></div>
          <div className="div-button" id="dbutton2"></div>
          <div className="div-button" id="dbutton3"></div>
        </div>
        <World worldMap={this.props.grid}/>

      </div>

    );
  }
}

function mapStateToProps(reduxState){
  return {
    world: reduxState.world,
    grid: reduxState.grid,
    creatures: reduxState.creatures
  };
};

export default connect(mapStateToProps, { populateWorld, takeTurn })(ElectronicLife);
