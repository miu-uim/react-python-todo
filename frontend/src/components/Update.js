import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch,Route,Link,useParams,useHistory,Redirect } from 'react-router-dom';
import Axios from 'axios';
import TodoList from './TodoList.js'



const Update = ()=>{
    const [upTask, setUpTask] = useState('')
    const history = useHistory();
    // const location = useLocation();
    const handleLink = path => history.push(path);
    const params = useParams()
    const upId= params.Id

    useEffect(()=>{
        console.log(params)
        console.log(upId)
    },[])

    const updateTask = (e) =>{
        setUpTask(e.target.value)
    }

    const updateTodoList = async updateId =>{
        console.log(updateId)
        console.log(upTask)
        if(upTask ==='') return
        await Axios.post(`http://127.0.0.1:5000/update/${updateId}`, {post_text: upTask})//title:taskとしてDBへ保存される。
        .then(function(res) { //res.data= {1:www,2:bbb,3:777,...}
            console.log('DB追加OK')
            console.log(res)
            console.log(res.data)
        })
        setUpTask('')
        handleLink('/')
        return (
        <Redirect to ="/"/>
        )
    }
    return(
        <React.Fragment>
                <h2>アップデート！！</h2>
                <p>編集するタスクのDB上のID：{upId}</p>
                <input type="text" value={upTask} onChange={updateTask}/>
                <button onClick={()=>{updateTodoList(upId)}}>更新するよ</button>
        </React.Fragment>
    )
}
export default Update;
