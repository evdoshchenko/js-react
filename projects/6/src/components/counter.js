import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const Counter = ({counter, inc, dec, res, rnd}) => {
    return (
        <div className="back">
            <div className="counter-block">
                <div className="counter">
                    <p id="counter" >{counter}</p>
                </div>
            </div>
            <div className="blocks">
                <div onClick={inc} className="block plus" type="button" >
                    <img src="img/plus.png" alt="plus" className="symbol"/>
                </div>
                <div onClick={dec} className="block minus" type="button" >
                    <img src="img/minus.png" alt="plus" className="symbol"/>
                </div>
                <div onClick={res} className="block reset" type="button">
                    <img src="img/reset.png" alt="plus" className="symbol"/>
                </div>
                <div onClick={rnd} className="block random" type="button"/>
            </div>
      </div>
    );
}
const mapStateToProps = (state) => {
    return {
        counter: state
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators(actions, dispatch);
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
export default connect(mapStateToProps, actions)(Counter);