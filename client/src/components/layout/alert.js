import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { useSelector } from "react-redux";      // useSelector hook to pull the state from the Redux store


const Alert = () => {
    const alerts = useSelector((state) => state.alert);
    console.log(alerts);
    return(
        alerts !== null && alerts.length > 0 && alerts.map((alert) => (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                {alert.msg}
            </div>
        ))
    );
}

export default Alert;



// const Alert = props => {
//     return (
//         props.alerts!=null && props.alerts.length > 0 && props.alerts.map(alert =>{
//             <div key={alert.id} className={`alert alert-${alert.alertType}`}>
//                 {alert.msg}
//             </div>
//         })
//     )
// }

// Alert.PropTypes = {
//     alerts: PropTypes.array.isRequired
// }

// // this function is used for subscribing to the store or mapping redux state to props
// function mapStateToProps(state){
//     alerts.state.alert;     // now we'll have props.alerts also
// }

// export default connect(mapStateToProps)(Alert);












/*import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = props => {
    return(
        <div>

        </div>
    )
}

Alert.PropTypes = {

}

export default connect()(Alert);
*/