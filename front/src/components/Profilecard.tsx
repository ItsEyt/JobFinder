import { useEffect, useState } from 'react'
import '../styles/Profilecard.css'
import '../styles/animations.css'
import {useAppSelector} from '../../apps/hooks'
import { didAccept, didReject } from '../features/DecisionSlice'

const Profilecard = () => {
    const [languages, setlanguages] = useState(['python', 'javascript', 'c#', 'react'])
    const didUserAccept = useAppSelector(didAccept);
	const didUserReject = useAppSelector(didReject);

    useEffect(() => {
		console.log(didUserAccept, didUserReject);
	}, [didUserAccept, didUserReject]);


    return (
        <div className={`card card-gradient ${didUserAccept ? 'flip-vertical-left': didUserReject ? 'flip-vertical-right' : null}`}>
            <div className='card-item'>
                <img className='profile-img-card' src='https://picsum.photos/200/300' alt='...' />
            </div>
            <div className="card-item">
                <h2 className='name-title'>YOUR NAME</h2>
                <small className='title'>software engineer</small>
                <p>
                    Ex exercitation et pariatur in ea
                </p>
            </div>
            <p className='card-item'>Mollit cupidatat consequat voluptate duis voluptate eiusmod minim aliqua deserunt aute. Non labore sunt incididunt aliquip ipsum. Magna proident irure nisi do fugiat dolore. Dolor cillum ipsum et excepteur do.</p>
            <div className='card-item'>
                <p >
                    {languages.map(lang => <p key={lang} className='text-right'>{lang}</p>)}
                </p>
            </div>
        </div>
    )
}

export default Profilecard