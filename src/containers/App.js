import React, { Component } from 'react';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			character: ' ',
			maxCharLength: 0,
			newCharacter: [],
		};
	}

	generateQueries = () => {
		let {character, maxCharLength, newCharacter} = this.state;
		let charArr = character.split(' ');
		 // ["happy c ol fantastic abc"] 15
		 // ["happy OR c OR o oool", "fantastic", "abc"] 15
		let elemNewChar = '';
		charArr.map((item, id) => {
			console.log("elemNewChar", elemNewChar);
			let elLengh = elemNewChar.length, 
				iLengh = item.length;

			if (elemNewChar == '') {
				if (item.length >= maxCharLength || item.length + 4 >= maxCharLength) {
					newCharacter.push(item);
				} else {
					elemNewChar = item + " OR " ;
				}
			} else {
				if (elLengh + iLengh + 4 >= maxCharLength) {
					elemNewChar = elemNewChar + item; 
					newCharacter.push(elemNewChar);
					elemNewChar = '';
				} else {
					if (charArr[id+1]) {
						if (elLengh + iLengh + 4 + charArr[id+1].length > maxCharLength) {
							elemNewChar = elemNewChar + item; 
							newCharacter.push(elemNewChar);
							elemNewChar = '';
						} else {
							elemNewChar = elemNewChar + item + " OR " ;
						}
					} else {
						elemNewChar = elemNewChar + item + " OR " ;
					}
				}
			};
		});

		this.setState({
            newCharacter
        });
	}

	render() {
		let {character, maxCharLength, newCharacter} = this.state;
	    return (
	      	<div>
		        <h1>Query</h1>
		        <div className="col-sm-12">
		            <label>
		            	<span className="custom-lbl">{'character'}</span>
		                <input type="text"
		                    name="character"
		                    onChange={(event) => {
		                    	this.setState({
						            character: event.target.value
						        });
		                    }} />
		            </label>
		        </div>
		        <div className="col-sm-12">
		            <label>
		            	<span className="custom-lbl">{'maximal Char Length'}</span>
		                <input type="text"
		                    name="maxCharLength"
		                    onChange={(event) => {
		                    	this.setState({
						            maxCharLength: event.target.value
						        });
		                    }} />
		            </label>
		        </div>
		        <div className="col-sm-12">
		            <ul>
		            	{newCharacter.map((item) => {
		            		return <li>{item}</li>
		            	 })
		            	}
		            </ul>
		        </div>
		        <span onClick={()=>{this.generateQueries();}}>Go Queries</span>
	      	</div>
	    );
  	}
}
