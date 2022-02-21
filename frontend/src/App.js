import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState()
  const [parent, setParent] = useState()

  const clickHandler = (path) => {
    fetch('http://localhost:8000/?path=' + path)
      .then(res => res.json())
      .then(res => {
        let linkArr = res.path.split('/');
        linkArr.pop();
        setParent(linkArr.join('/'));
        setData(res);
      }).catch(err => console.log(err))

  }

  useEffect(() => {
    fetch('http://localhost:8000/').then(res => res.json()).then(result => {
      setParent('');
      setData(result);
    }).catch(err => console.log(err))
  }, [])


  return (
    <div className="file-manager">

      {data.path !== '' &&
        <div className='up' onClick={() => clickHandler(parent)}>
          <span className="material-icons">&#xe5d8;</span>
          LEVEL UP
        </div>
      }

      <div className="current-level">
        current: {data?.path === '' ? '/' : data?.path}
      </div>

      <ul className='folder-list'>
        {data?.files.map(item => {
          if (item.dir) {
            return <li className='folder' key={item.name}>
              <div onClick={() => clickHandler(data.path + '/' + item.name)}>
                <span className='material-icons'>&#xe2c7;</span>
                {item.name.toUpperCase()}
              </div>
            </li>
          } else {
            return <li className='file' key={item.name}>
              <span className='material-icons'>&#xe873;</span>
              {item.name}
            </li>
          }
        })}
      </ul>
    </div>
  );
}

export default App;
