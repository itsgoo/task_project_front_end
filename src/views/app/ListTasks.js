import React, { useState, useEffect, Fragment } from 'react';
import { query } from './Actions';
import linkToServerSide from './links';

const ListTasks = ({items, fetchTasks, editItem}) =>{
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
	  if (localStorage.getItem('token') !== null) {
		setIsAuth(true);
	  }
	}, []);

	function deleteItem(param){

		query('DELETE', linkToServerSide + 'api/v1/' + param.id)
		.then(response => {
			fetchTasks()
		})
		.catch(error => console.log('error', error))
	
	}
	
	return(
		<div>
			{items.map(item =>{
				return(

					<div className="card mb-5" key={item.id}>
						<div className="card-header">
						{item.title} by {item.creator} ({item.email})
						<small className="float-right text-muted">
							{item.status === 1 ? 'task is done' : ''}
						</small>
						
						</div>
						<div className="card-body">
							<p className="card-text">{item.text}</p>
							{isAuth === true ? (
						<Fragment>
						{' '}
							<button 
								type="button" 
								className="btn btn-primary mr-3"
								onClick={()=> editItem(item.id)}
								data-toggle="modal" 
								data-target="#EditTaskModal"
							>
								Edit
							</button>
							<button 
							type="button" 
							className="btn btn-danger"
							onClick={()=> deleteItem(item)}
							>
								Delete
							</button>
						</Fragment>
						) : (
						<Fragment>
						{' '}
						</Fragment>
					)} 
					      <small className="d-block mt-3 text-muted">{item.edited_by_admin === true ? 'edited_by_admin' : ''}</small>
						  
							
							</div>
							
					</div>
				)
			})}
		</div>
		
	)
}













export default ListTasks