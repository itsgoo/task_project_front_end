import React, { useState } from 'react'

const EditTasks = (props) => {


	const [isChecked, setCheck] = useState(false)	
	const [style, setStyle] = useState('alert alert-success invisible')

	// notification alert
	function alertStyle(status){
		if ( status === true){
			setStyle('alert alert-success visible')
		} else if ( status === false){
			setStyle('alert alert-success invisible')
		}
	}
	


	function submitEditTaskHandler(event){
		event.preventDefault()

		if (window.localStorage.getItem('username')){

		

			let edited_by_admin = false
			if(window.localStorage.getItem('username') === 'user'){
				edited_by_admin = true
			} else {
				edited_by_admin = false
			}


			fetch('http://127.0.0.1:8000/api/v1/' + props.editId + '/' , {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					"id": props.editId,
					"creator": props.editCreator,
					"email": props.editEmail,
					"title": props.editTitle,	
					"text": props.editText,
					"edited_by_admin": edited_by_admin,
					"status": isChecked === true ? 1 : 0,
				})
			})
				.then(response => {
					props.fetchTasks()
					alertStyle(true)
				})
				.catch(error => console.log('error', error))
		}else{
			window.location.replace('http://localhost:3000/login')
		}
	}



	return(
		
		<div>

			<div 
				className="modal fade" 
				id="EditTaskModal" 
				tabIndex="-1" 
				aria-labelledby="EditTaskModalLabel" 
				aria-hidden="true"
			>
				<div className={style} role="alert">
					task was updated
					<span className="float-right" onClick={()=> alertStyle(false)}>close</span>
				</div>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="EditTaskModalLabel">
								add task
							</h5>
							<button 
								type="button" 
								className="close" 
								data-dismiss="modal" 
								aria-label="Close"
								onClick={()=> alertStyle(false)}
							>
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body"> 
							<form onSubmit={submitEditTaskHandler}>
							
								<div className="mb-3">
									<label 
										htmlFor="title" 
										className="form-label"
									> 
										title
									</label>
									<input 
										value={props.editTitle}
										onChange={event => props.setEditTitle(event.target.value)} 
										id="title" 
										type="text" 
										className="form-control"
									/>
								</div>
								
								<div className="mb-3">
									<label 
										htmlFor="text" 
										className="form-label"
									> 
										text
									</label>
									<input 
										value={props.editText} 
										onChange={event => props.setEditText(event.target.value)} 
										id="text" 
										type="text" 
										className="form-control"
									/>
								</div>

								<div className="form-group form-check">
									<input 
										type="checkbox" 
										className="form-check-input" 
										id="CheckIsDone" 
										
										onChange={event => setCheck(event.target.checked)} 
										checked = {isChecked}
										/>
									<label 
										className="form-check-label" 
										htmlFor="CheckIsDone"
									>
										Complete task
									</label>
								</div>
								
								<button 
									type="submit" 
									className="btn btn-success mb-3" 
								>
									edit
								</button>
							</form>
						</div>
					</div>
  				</div>
			</div>

			
		</div>
	
	)
}

export default EditTasks
