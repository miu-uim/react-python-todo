import React from 'react';
import {useHistory, BrowserRouter as Router} from 'react-router-dom';

const Navi = (props) =>{
    const history = useHistory();
    const handleLink = path =>history.push(path);
    return (
        <React.Fragment>
            <Router>
                <h2>TODOリスト</h2>
                <button onClick={()=>handleLink('/')}>トップへ戻る</button>
            </Router>
        </React.Fragment>

    )
}

export default Navi