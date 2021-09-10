import React, { useState } from 'react';
import linkToServerSide from './LinkToServerSide';


const AddTasks = ({fetchTasks}) => {
	const [creator, setCreator] = useState('')
	const [title, setTitle] = useState('')
	const [email, setEmail] = useState('')
	const [text, setText] = useState('')
	const [style, setStyle] = useState('alert alert-success invisible')
	const [taskName, setTaskName] = useState('')

	const [creatorDirty, setCreatorDirty] = useState(false)
	const [titleDirty, setTitleDirty] = useState(false)
	const [emailDirty, setEmailDirty] = useState(false)
	const [textDirty, setTextDirty] = useState(false)

	const [creatorError] = useState('add creators name')
	const [titleError] = useState('add title name')
	const [textError] = useState('add text name')
	const [emailError, setEmailError] = useState('incorrect email please try again')

	


	function clearValues(){
		setCreator('')
		setTitle('')
		setEmail('')
		setText('')
	}
	
	function alertStyle(status){
		if ( status === true){
			setStyle('alert alert-success visible')
		} else if ( status === false){
			setStyle('alert alert-success invisible')
		}
	}

	function submitAddTaskHandler(event){
		event.preventDefault()


		// validation

		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		!re.test(String(email).toLowerCase()) ? setEmailDirty(true) : setEmailError('')
		
		if(creator === '' || title === '' || text === ''){
			creator !== ''? setCreatorDirty(false) : setCreatorDirty(true)
			title !== ''? setTitleDirty(false) : setTitleDirty(true)
			text !== ''? setTextDirty(false) : setTextDirty(true)
		} else{
			setTaskName(title)
			fetch(linkToServerSide + 'api/v1/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					"creator": creator,
					"email": email,
					"title": title,
					"text": text,
					"status": 0
				})
			})
				.then(response => {
					fetchTasks()
					clearValues()
					alertStyle(true)
				})
				.catch(error => console.log('error', error))
				.then(
					setCreatorDirty(false),
					setTitleDirty(false),
					setTextDirty(false)
				)
		}		
	}
	

	return(
		<div>
			
			<button 
				type="button" 
				className="btn btn-primary mb-3" 
				data-toggle="modal" 
				data-target="#exampleModal"
			>
			add task
			</button>

			<div 
				className="modal fade" 
				id="exampleModal" 
				tabIndex="-1" 
				aria-labelledby="exampleModalLabel" 
				aria-hidden="true"
			>
				<div className={style} role="alert">
					task: {taskName} was added 
					<span 
						className="float-right" 
						onClick={()=> alertStyle(false)}
					>
						close
					</span>
				</div>
				
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								add task
							</h5>
							<button 
								type="button" 
								className="close" 
								data-dismiss="modal" 
								aria-label="Close"
								onClick={()=> alertStyle(false)}
							>
							<span aria-hidden="true" >&times;</span>
							</button>
						</div>
						<div className="modal-body"> 
							<form onSubmit={submitAddTaskHandler}>
								<div className="mb-3">
									<label 
										htmlFor="creator" 
										className="form-label"
										> 
										creator
									</label>
									<input 
										value={creator} 
										onChange={event => setCreator(event.target.value)} 
										id="creator" 
										type="text" 
										className="form-control"
									/>
									{(creatorDirty && creatorError) &&  <div className="invalid-feedback d-block">
										{creatorError}
									</div>}
									
								</div>
								<div className="mb-3">
									<label 
										htmlFor="title" 
										className="form-label"
									> 
										title
									</label>
									<input 
										value={title} 
										onChange={event => setTitle(event.target.value)} 
										id="title" 
										type="text" 
										className="form-control"
									/>
									{(titleDirty && titleError) &&  <div className="invalid-feedback d-block">
										{titleError}
									</div>}
								</div>
								<div className="mb-3">			
									<label 
										htmlFor="email" 
										className="form-label"
									> 
										email
									</label>
									<input 
										value={email} 
										onChange={event => setEmail(event.target.value)} 
										id="email" 
										type="email" 
										className="form-control"
									/>
									{(emailDirty && emailError) &&  <div className="invalid-feedback d-block">
										{emailError}
									</div>}
								</div>
								<div className="mb-3">
									<label 
										htmlFor="text" 
										className="form-label"
									> 
										text
									</label>
									<input 
										value={text} 
										onChange={event => setText(event.target.value)} 
										id="text" 
										type="text" 
										className="form-control"
									/>
									{(textDirty && textError) &&  <div className="invalid-feedback d-block">
										{textError}
									</div>}
								</div>
								
								<button 
									type="submit" 
									className="btn btn-success mb-3" 
								>
									Add
								</button>
							</form>
						</div>
					</div>
  				</div>
			</div>


			
		</div>
	)
}

export default AddTasks