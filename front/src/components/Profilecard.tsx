import { useState } from 'react'
import '../styles/Profilecard.css'

const Profilecard = () => {
    const [languages, setlanguages] = useState(['python', 'javascript', 'c#', 'react'])

    return (
        <div className='card'>
            <div className='card-item'>
                <img className='profile-img' src='https://picsum.photos/200/300' alt='...' />
            </div>
            <div className="card-item">
                <h2 className='name-title'>your name</h2>
                <small className='title'>software engineer</small>
                <p>
                    Ex exercitation et pariatur in ea
                </p>
            </div>
            <p className='card-item'>Mollit cupidatat consequat voluptate duis voluptate eiusmod minim aliqua deserunt aute. Non labore sunt incididunt aliquip ipsum. Magna proident irure nisi do fugiat dolore. Dolor cillum ipsum et excepteur do.</p>
            <div className='card-item'>
                <p >
                    {languages.map(lang => <p className='text-right'>{lang}</p>)}
                </p>
            </div>
        </div>
    )
}

export default Profilecard