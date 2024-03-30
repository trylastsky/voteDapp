import testAvatar from '../../../../assets/testAvatarDef.png'

import './Candidate.css'

export default function Candidate() {
    return(<>
    <div className="CandidateContainer">
        <div id='Nado'>
    <img className="ave" src={testAvatar} alt="аватар" /> 
    <div>
    <h2>Natasha</h2> 
        </div>  
        <button className='ButtonVote'>Проголосовать</button>
        </div>
    <h2>Описание</h2>
    <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur corrupti earum doloribus, temporibus quasi aut, nobis qui iure repellendus corporis eum maxime nemo deserunt. Voluptate molestiae error excepturi iusto vero.</h3>
    </div>
    </>)
}