import React, { useState, useEffect, Fragment } from 'react';
import { query } from './Actions';
import AddTasks from './AddTasks';
import EditTasks from './EditTasks';
import ListTasks from './ListTasks';
import Pagination from './Pagination';
import Sort from './Sort';

const Dashboard = () => {
  const [tasks, setTasks] = useState('');
  const [loading, setLoading] = useState(true);
  const [tasksPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortUpdate, setSortUpdate] = useState('sortasc');

  // consts for edit component
	const [editTitle, setEditTitle] = useState('');
	const [editEmail, setEditEmail] = useState('');
	const [editText, setEditText] = useState('');
	const [editCreator, setEditCreator] = useState('');
	const [editId, setEditId] = useState('');
	const [editStatus, setEditStatus] = useState('');

  useEffect(() => {
		fetchTasks()
  }, []);



  function fetchTasks(){
          query('GET', 'http://127.0.0.1:8000/api/v1/')
          .then(response => response.json())
          .then(data => {
            setTasks(data.reverse());
            setLoading(false)
          })
    }

  // for pagination
  const lastTaskIndex = currentPage * tasksPerPage
  const firstTaskIndex = lastTaskIndex - tasksPerPage
  const tasksSlice = tasks.slice(firstTaskIndex, lastTaskIndex) 
  
  const paginate = pageNumber => setCurrentPage(pageNumber)


  // for sort 
  function sortArrayByParam(tasks, param, sort){
    tasks.sort(function(a, b){
      let paramA = ''
      let paramB = ''
      if (param === 'text'){
        paramA = a.text.toLowerCase()
        paramB =b.text.toLowerCase()      
      } else if (param === 'title'){
        paramA = a.title.toLowerCase()
        paramB =b.title.toLowerCase()
      } else if (param === 'creator'){
        paramA = a.creator.toLowerCase()
        paramB =b.creator.toLowerCase()
      } else if (param === 'email'){
        paramA = a.email.toLowerCase()
        paramB =b.email.toLowerCase()
      }
  
      if(sort === 'asc'){
        if (paramA < paramB)
        return -1
        if (paramA > paramB)
          return 1
        return 0
      }else if (sort === 'desc'){
        if (paramA > paramB)
        return -1
        if (paramA < paramB)
          return 1
        return 0
      }
      
      return tasks
    })
  }


    


  const sortName = (param) => {
    
    if (sortUpdate === 'sortdesc'){
      sortArrayByParam(tasks, param, 'desc')
      setSortUpdate('sortasc')
    } else if(sortUpdate === 'sortasc') {
      sortArrayByParam(tasks, param, 'asc')
      setSortUpdate('sortdesc')
    }
    
    setTasks(tasks)
    return tasks
  }


  // for edit component.
  // get default patameters for changing
  function editItem(itemId){

    query('GET', 'http://127.0.0.1:8000/api/v1/' + itemId + '/')
    .then(response => response.json())
    .then(data => {

        setEditCreator(data.creator)
        setEditText(data.text)
        setEditEmail(data.email)
        setEditTitle(data.title)
        setEditId(data.id)
        setEditStatus(data.status)
        
      
    })
  }



  return (
    <div className="container">
      {loading === false && (
        <Fragment>
          <div className="col-md-9 mx-auto">
            <h1>Dashboard</h1>
            <AddTasks fetchTasks={fetchTasks}/>
            <EditTasks 
              fetchTasks={fetchTasks} 
              editCreator={editCreator} 
              setEditCreator={setEditCreator}
              editTitle={editTitle} 
              setEditTitle={setEditTitle}
              editText={editText} 
              setEditText={setEditText}
              editEmail={editEmail} 
              setEditEmail={setEditEmail}
              editId={editId} 
              setEditId={setEditId}
              editStatus={editStatus}
              setEditStatus={setEditStatus}
            />
            <Sort 
              sortName={sortName}
              tasks={tasks} 
              setTasks={setTasks} 
            />
            <ListTasks 
              items={tasksSlice} 
              fetchTasks={fetchTasks}
              editItem={editItem}
            />
            <Pagination 
              totalTasks={tasks.length} 
              tasksPerPage={tasksPerPage}
              paginate={paginate}
              
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;