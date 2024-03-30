import Candidate from './Candidate/Candidate';

import './Vote.css';


export default function Vote() {
    return(<>
    <div className='VoteContainer'>
        <div id='naddo'>

    <h2 className='nameVote'>Имя голосования</h2>
    <h2>Описание:</h2>
    <h3 className='descriptionVote'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error quis nulla reiciendis incidunt deserunt atque quaerat, quod id optio aliquid labore, explicabo provident rem dolor quo? Nihil quod molestiae tempora.</h3>
        </div>
    <h2 id='candidatsH2'>Кандидаты</h2>
    <Candidate/>
    <Candidate></Candidate>
    </div>
    </>)
}