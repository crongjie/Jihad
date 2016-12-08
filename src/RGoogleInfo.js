/*
RGoogleInfo - RGoogleInfo Component
*/
import React from 'react'

let RGoogleInfo = React.createClass({
    getInitialState: function () {
        return { loginDisabled: false, loggedIn: false, userInfo: {} , displayName: '', email: '', photoURL: '' }
    },
    componentDidMount: function() {
        let oThis = this;
        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                /*
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                */
                //alert(JSON.stringify(user, null, '  '));
                oThis.setState({ loggedIn:true, userInfo: user });

            } else {
                oThis.setState({ loggedIn:false, userInfo: {} });
            }
        });
        // [END authstatelistener]

    },
	render: function() {
		return ((this.state.loggedIn) ? 
        <div >
            <h4>User Info from your Google Account</h4>
            <br />
            <div className="form-group">
                <img src = { this.state.userInfo.photoURL } style={{maxHeight: 100, maxWidth: 100}} />
            </div>
            <div className="form-group">
                <label>User Name:</label>
                <input readOnly type="text" value={this.state.userInfo.displayName} className="form-control" />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input readOnly type="text" value={this.state.userInfo.email} className="form-control" />
            </div>
        </div> 
        : 
        <h4>You have not logged in yet!</h4> );
	}
});
  	
export default RGoogleInfo
