import React from 'react'

const Pagination = ({totalTasks, tasksPerPage, paginate}) => {

	const pageNumbers = []

	for( let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++){
		pageNumbers.push(i)
	}

	return(
		<ul className="pagination">
			{pageNumbers.map(pageNumber => (
				<li className="page-item" key={pageNumber}>
					
					<button 
					type="button" 
					className="btn btn-link mr-3"
					onClick={() => paginate(pageNumber)}
					>
						{pageNumber}
					</button>
			
				</li>

			))}
		</ul>
	)
}

export default Pagination