import React from 'react'


const Sort = ({sortName}) => {
	return (
		<div className="mb-3">
			<span className="mr-3">sort by: </span>
			<button 
				type="button" 
				className="btn btn-light mr-3" 
				onClick={()=> sortName('text') }
			>
				text
			</button>
			<button 
				type="button" 
				className="btn btn-light mr-3" 
				onClick={()=> sortName('title') }
			>
				title
			</button>
			<button 
			type="button" 
			className="btn btn-light mr-3" 
			onClick={()=> sortName('creator') }
			>
				creator
			</button>
			<button 
				type="button" 
				className="btn btn-light" 
				onClick={()=> sortName('email') }
			>
				email
			</button>
		</div>
	)
}

export default Sort
