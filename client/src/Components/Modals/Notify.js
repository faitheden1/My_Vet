import React, {useState,useEffect,useContext} from 'react'
import Moment from 'react-moment'
import {Tabs, Tab, Button } from "react-bootstrap";




const Notify = (props) => {
    const [notifyItems, setNotifyItems] = useState(props?.vals)
	const [key, setKey] = useState('Medications');
  
	let petmeds = {};
	let vetvisits = {};
	let reminders = {};

		useEffect(() => {
			if (notifyItems[0]) {
				petmeds = notifyItems[0];
				console.log(petmeds)}
			if (notifyItems[1]) vetvisits = notifyItems[1];
			if (notifyItems[2]) reminders = notifyItems[2];
        console.log(vetvisits)
			//for(let i = 0; i < petmeds.length; i++) console.log(petmeds[i])
			vetvisits.forEach(pet => {
				console.log('here',pet)
			});
			// return () => {
		
			// }
		}, [notifyItems])
	


	return (


		<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
		<Tab eventKey="home" title="Home">
		<div>
				Here	 					{ petmeds && (
							            <li>
					 						{petmeds.Pet}
					 						<Moment utc format="MM/DD/YYYY">
					 							{petmeds.Date}
					 						</Moment>	
					 						{petmeds.Medication}
					 						{petmeds.Dose}
					 			         </li>
					 					)}

</div>
										 Test
					 				
		</Tab>
		<Tab eventKey="profile" title="Profile">
		
		</Tab>
		<Tab eventKey="contact" title="Contact" disabled>
		 
		</Tab>
	  </Tabs>




					// 	<div>
					// 		<ul className="nav nav-tabs" id="myTab" role="tablist">
					// 			<li className="nav-item" role="presentation">
					// 				<button
					// 					className="nav-link active"
					// 					id="home-tab"
					// 					data-bs-toggle="tab"
					// 					data-bs-target="#home"
					// 					type="button"
					// 					role="tab"
					// 					aria-controls="home"
					// 					aria-selected="true"
					// 				>
					// 					Medications
					// 				</button>
					// 			</li>
					// 			<li className="nav-item" role="presentation">
					// 				<button
					// 					className="nav-link"
					// 					id="profile-tab"
					// 					data-bs-toggle="tab"
					// 					data-bs-target="#profile"
					// 					type="button"
					// 					role="tab"
					// 					aria-controls="profile"
					// 					aria-selected="false"
					// 				>
					// 					Visits
					// 				</button>
					// 			</li>
					// 			<li className="nav-item" role="presentation">
					// 				<button
					// 					className="nav-link"
					// 					id="contact-tab"
					// 					data-bs-toggle="tab"
					// 					data-bs-target="#contact"
					// 					type="button"
					// 					role="tab"
					// 					aria-controls="contact"
					// 					aria-selected="false"
					// 				>
					// 					Reminders
					// 				</button>
					// 			</li>
					// 		</ul>
					// 		<div className="tab-content" id="myTabContent">
					// 			<div
					// 				className="tab-pane fade show active"
					// 				id="home"
					// 				role="tabpanel"
					// 				aria-labelledby="home-tab"
					// 			>
			 		// 		      <ul>
					// 					{ Object.keys(petmeds).map((med,i) => (
					// 					<li	
					// 					    key={i}
					// 						className="pet-list card-body">
					// 						{petmeds[med].Pet}
					// 						<Moment utc format="MM/DD/YYYY">
					// 							{petmeds[med].Date}
					// 						</Moment>	
					// 						{petmeds[med].Medication}
					// 						{petmeds[med].Dose}
					// 					</li>
					// 					))}
					// 				</ul>
					// 			<div
					// 				className="tab-pane fade"
					// 				id="profile"
					// 				role="tabpanel"
					// 				aria-labelledby="profile-tab"
					// 			>
					// 				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
					// 				dolorem.
					// 			</div>
					// 			<div
					// 				className="tab-pane fade"
					// 				id="contact"
					// 				role="tabpanel"
					// 				aria-labelledby="contact-tab"
					// 			>
					// 				Lorem ipsum dolor sit amet consectetur adipisicing elit.
					// 				Fugiat, explicabo.
					// 			</div>
					// 		</div>
					// 	</div>
					// </div>
					
	);
};

export default Notify;
