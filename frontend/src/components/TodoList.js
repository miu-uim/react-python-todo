import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch,Route,useParams,Redirect, Link,useHistory,} from 'react-router-dom';

// import './App.css';
import Axios from 'axios';

import Update from './Update.js'

// export const Update = ()=>{
//     return <h1>アップデート</h1>
// }

// export const About =()=>{
//     return(
//         <h2>About</h2>
//     )
// }

const TodoList = () => {
    const history = useHistory();
    const handleLink = path => history.push(path);

    const [todoList, setToDoList] = useState([])//表示のための配列
    // const [todos, setTodos] = useState(todoList)
    const [task, setTask] = useState('')
    const [upTask, setUpTask] = useState('')

    useEffect(()=>{
        console.log('useEffect発動')
        Axios.get('http://127.0.0.1:5000/')
        .then(function(res) {
          const firstDbData = res.data //DBのデータすべてを取得
          // console.log(res)
          console.log(firstDbData)
          const todoArray = Object.entries(firstDbData).map(([id, title]) => ({id, title}))
          console.log(todoArray)
          setToDoList(todoArray)
        })
      },[])
      
    const createTask = (e) =>{
        setTask(e.target.value)
      }
    
    const addToDoList = () => {
    //画面に追加
    console.log(task)
    if(task ==='') return

    Axios.post('http://127.0.0.1:5000/', {post_text: task})//title:taskとしてDBへ保存される。
    .then(function(res) { //res.data= {1:www,2:bbb,3:777,...}
        console.log('DB追加OK')
        console.log(res)
        console.log(res.data)
        // const resLine = Object.entries(res.data).map(([id, title]) => ({id, title}))
        // setToDoList(resLine)
        // console.log(resLine)
        const dbId = res.data + "" //DB上のIDをstr型に変換
        const newTodoList = [...todoList,{id:dbId,title:task}]
        console.log(newTodoList)
        setToDoList(newTodoList)
        console.log('画面追加OK')
    })
    setTask('')
    
    }

    const deleteToDoList = (dbIndex) => {
        console.log('削除')
        // const deleteItem = todoList[index]
        console.log(dbIndex)//DB上のID（todo.id）
        //削除するidのDB上のIDをfindIndexで検索
        const deleteItem =todoList.findIndex(todoList=>todoList.id === dbIndex)
        console.log(deleteItem)
        const newTodoList = [...todoList]
        newTodoList.splice(deleteItem,1)
        setToDoList(newTodoList)
        console.log('画面削除OK')
        Axios.post('http://127.0.0.1:5000/delete',{post_id:dbIndex})
        .then(function(){
            console.log('DB削除OK')
        })   
    }

    return (
        <React.Fragment>
            <Router>
                <h1>タスクの追加と一覧</h1>
                <input type='text' value={task} onChange={createTask}/>
                <button onClick={addToDoList}>追加</button>
                <ul>
                    {todoList.map((todo,frIndex) => {
                    return (
                        <li key={frIndex}>
                            <label>画面上のID：{frIndex}　DB上のID：{todo.id}　title：{todo.title}</label>
                            <button onClick={() => {deleteToDoList(todo.id)}}>削除</button>
                            <button onClick={()=>handleLink(`update/${todo.id}`)}>更新</button>
                            {/* <Link to={`/update/${todo.id}`}><button>編集</button></Link> */}
                            {/* <Link to={`/about/${todo.id}`}>アバウト</Link> */}
                        </li>
                    )
                    })}
                </ul>
                 
                <Switch>
                    <Route path="/update/:Id" component={Update}>
                        {/* <Update /> */}
                    </Route>
                    {/* <Route path ="/about">
                        <About />
                    </Route> */}
                </Switch>
            </Router>
        </React.Fragment>
    )

}

export default TodoList;
