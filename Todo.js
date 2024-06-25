import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const TodoList = () => {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);

    function create() {
        axios.post('http://localhost:5000/posting', { todo })
            .then(() => {
                alert('Data has been posted successfully');
                setTodo('');
            })
            .catch(() => {
                alert('Failed to post data');
            });
    }

    function getData() {
        axios.get('http://localhost:5000/getting')
            .then((response) => {
                setTodos(response.data);
            })
            .catch(() => {
                alert('Failed to retrieve data');
            });
    }

    const updatedTodo = (id, updatedData) => {
        axios.put(`http://localhost:5000/updating/${id}`, { todo: updatedData })
            .then(() => {
                console.log('Todo updated successfully');
                getData();
            })
            .catch((error) => {
                console.error('Failed to update todo:', error);
                alert('Failed to update todo');
            });
    };

    const handleEditButtonClick = (id) => {
        const newdata = prompt("Enter the new data");

        if (newdata === null || newdata.trim() === '') {
            alert("Please enter valid new data");
            return;
        }

        updatedTodo(id, newdata.trim());
    };

    function deleteTodo(id) {
        axios.delete(`http://localhost:5000/deleting/${id}`)
            .then(() => {
                getData();
            })
            .catch(() => {
                alert("Failed to delete todo");
            });
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Todo App
                    </Typography>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">About</Button>
                    <Button color="inherit">Contact</Button>
                </Toolbar>
            </AppBar>

            <div style={{ display: 'flex', marginBottom: '10px', marginTop: '50px' }}>
                <TextField id="todo" label="Todo" variant="outlined" value={todo} onChange={(e) => setTodo(e.target.value)} />
                <Button variant="outlined" onClick={create} style={{ marginLeft: '10px' }}>Post</Button>
                <Button variant="outlined" onClick={getData} style={{ marginLeft: '10px' }}>Get All</Button>
            </div>

            <ol>
                {todos.map((item) => (
                    <li key={item._id}>
                        {item.todo}
                        <Button onClick={() => handleEditButtonClick(item._id)}>Edit</Button>
                        <Button onClick={() => deleteTodo(item._id)}>Delete</Button>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default TodoList;
