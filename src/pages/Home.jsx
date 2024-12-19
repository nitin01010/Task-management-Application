import React, { useEffect, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { IoMdAdd } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, deleteTodo, updateTodo } from '../features/todo/todoSlice'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify'
import NodataGif from '../assite/Animation.gif'

const Home = () => {
  const data = useSelector((state) => state.todo.value);
  const [statusBar, setStatusBar] = useState(false);
  const dispatch = useDispatch()
  
  const [input, setInput] = useState({
    id: '',
    task: ''
  });


  const HandlerInput = (e) => {
    const { name, value } = e.target;
    setInput(values => ({ ...values, [name]: value }));
  }

  const HandleClicked = (newId) => {
    const { task } = input;
    const Item = {
      id: newId,
      task
    }

    if (Item.task === '') {
      toast.error('Please enter a Valid Task');
    } else {
      dispatch(addTodo(Item));
      setInput({
        id: '',
        task: ''
      });
      toast.success('Task added successfully!');
    }
  }

  const HandleDelete = (deleteId) => {
    dispatch(deleteTodo(deleteId));
    toast.warn('Task deleted successfully!', deleteId);
  }

  const HandleEdit = (EditId) => {
    setStatusBar(true);
    const newdata = data.filter((item) => {
      return item.id === EditId
    })
    setInput(newdata[0]);
  }

  const handleUpdate = (updateData)=> {
    dispatch(updateTodo(updateData))
    setInput({id:"",task:""});
    setStatusBar(false);
    toast.success('updated');
  }

  return (
    <div className=' p-1'>
      {/* Header */}
      <div className=' flex items-center justify-center h-[60px] bg-black p-2'>
        <h1 className=' text-2xl font-semibold text-white'>Task management</h1>
      </div>

      {/* Main */}
      <div className=' flex gap-3 bg-black p-3    w-full  md:w-[50%] m-auto mt-10 rounded'>
        <input type="text" name='task' value={input.task} placeholder='Enter your task ...' className=' outline-none w-full py-3 rounded-md px-3 ' onChange={(e) => HandlerInput(e)} />
        <button onClick={() => HandleClicked(uuidv4())} className=' flex justify-center items-center gap-2 bg-white w-[100px] text-lg py-2 rounded'> <IoMdAdd size={20} />
        </button>
      </div>

      {/* List of task  */}
      <ul className=' flex flex-col gap-3 bg-black text-white p-3  w-full  md:w-[50%] m-auto mt-10 rounded'>

        {data.length === 0 ? <img src={NodataGif} className='  w-[200px] m-auto rounded' alt="Loading..." /> : null}

        {
          data.map((item) => {
            return (
              <div key={item.id} className=' flex items-center justify-center gap-2'>
                <li className=' bg-white w-full  text-black px-2 py-2 rounded '>{item.task}</li>
                <MdDelete size={29} onClick={() => HandleDelete(item.id)} />
                <FaPencilAlt size={22} onClick={() => HandleEdit(item.id)} />
              </div>
            )
          })
        }

      </ul>

      {/* Edit Components  */}
      <div className=' flex justify-center items-center'>
        {statusBar && (
          <div className="flex justify-center z-10 items-center bg-black p-1 mt-2 opacity-85 absolute w-[99%] top-0 left-0 h-screen" onClick={() => setStatusBar(false)} />
        )}
        {
          statusBar && (
            <div className=' flex items-center  gap-2  justify-center absolute bg-[#374151] z-50 rounded h-[450px]   p-2 w-[97%] md:w-[50%]'>
              <input type="text" name='task' value={input.task} placeholder='Enter your task ...' className=' outline-none w-full py-3 rounded-md px-3 ' onChange={(e) => HandlerInput(e)} />
              <button onClick={() => handleUpdate(input)} className=' flex justify-center items-center gap-2 bg-white w-[100px] text-lg py-3 rounded'> <IoMdAdd size={20} />
              </button>
            </div>
          )
        }
      </div>

    </div>
  )
}

export default Home