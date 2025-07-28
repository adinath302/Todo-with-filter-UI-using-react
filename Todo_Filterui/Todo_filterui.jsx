import { useScroll } from 'framer-motion'
import React, { useState } from 'react'

const Todo_filterui = () => {
    const [Input, setInput] = useState('')
    const [Todo, setTodo] = useState([])
    const [status, setstatus] = useState("all")

    const HandleSubmit = (event) => {
        event.preventDefault()
        if (Input.trim() === "") return;
        const NewTodo = {
            id: Date.now(),
            text: Input,
            complete: false,
        }
        setTodo([...Todo, NewTodo]);
        setInput("")
    }

    const HandleComplete = (id) => {
        console.log("clicked");

        setTodo(
            Todo.map((item) => (item.id === id ? { ...item, complete: !item.complete } : item))
        )
    }
    const FilteredTodo = Todo.filter(Todo => {
        if (status === "all") return true;
        if (status === "complete") return Todo.complete;
        if (status === "pending") return !Todo.complete;
    })

    const Handledelete = (id) => {
        setTodo(
            Todo.filter(item => item.id !== id)
        )
    }

    return (
        <div className='flex flex-col justify-center items-center text-center gap-6 mt-12 '>
            <form
                action=""
                onSubmit={HandleSubmit}
                className='flex flex-col gap-4'>
                <input
                    required
                    type="text"
                    className='border p-2'
                    placeholder='enter the todo'
                    value={Input}
                    onChange={(event) => setInput(event.target.value)}
                />
                <button
                    type='submit'
                    className='p-2 border bg-amber-400 select-none cursor-pointer'>Submit</button>
            </form>
            <div className='flex gap-3 '>
                <div className='border p-1 cursor-pointer' onClick={() => setstatus("all")}>All</div>
                <div className='border p-1 cursor-pointer' onClick={() => setstatus("complete")}>Complete</div>
                <div className='border p-1 cursor-pointer' onClick={() => setstatus("pending")}>Pending</div>
            </div>
            <ul className='gap-2 flex flex-col cursor-pointer'>
                {FilteredTodo.map((item) => (
                    <li key={item.id}>
                        <div className={`flex gap-2`}>
                            <p
                                className={`${item.complete ? "line-through" : "none"} border p-2 flex select-none`}
                                onClick={() => HandleComplete(item.id)}>{item.text}</p>
                            <div onClick={() => Handledelete(item.id)}>
                                ❌
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Todo_filterui