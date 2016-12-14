
import RGoogleInfo from '../components/RGoogleInfo.js' 
import Ri18n from '../Ri18n.js' 
import RStore from './RStore.js' 

let PointForm = React.createClass({
    getInitialState: function () {
        return { id: 0, name: '', point: 0, point_available: 0 }
    },
    componentDidMount: function(user_info) {
        let oThis = this;
        Promise.all([RStore.getUserInfo()]).then(function(userData) {
             oThis.setState(userData[0]);
        });
    },
	render: function() {
			return (
				<div>

					{ (RStore.getLoggedIn()) ? <div>
							<p>Welcome to JiBuy {this.state.name}~~~</p>
								<div className="form-group">
								<label>{ Ri18n.point }:</label>
								<div className="inputGroupContainer">
									<div className="input-group">
										<input type="text" readOnly value={this.state.point} className="form-control" name="point" />
										<span className="input-group-addon">{ Ri18n.RJpoint }</span>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label>{ Ri18n.point_available }:</label>
								<div className="inputGroupContainer">
									<div className="input-group">
										<input type="text" readOnly value={this.state.point_available} className="form-control" name="point" />
										<span className="input-group-addon">{ Ri18n.RJpoint }</span>
									</div>
								</div>
							</div>
						</div>
					 : <p>Welcome to JiBuy.</p>
					}
					

				</div>
		);
	}
});

let home = [
{ 
	type: 'memo', 
	title: 'JiBuy', 
	text: '',
	items: [
		<PointForm / >
	]
}, <RGoogleInfo / >
];

export default home