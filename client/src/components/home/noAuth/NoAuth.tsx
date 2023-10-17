import '../../../styles/home/NoAuth.scss'
import s from '../../../store/store'
import { Link } from 'react-router-dom'

export default ()=>{
    const interfaceStore = s.interfaceStore

    return (
        <div className={"no-auth-block"}>
            <div className="no-auth-header">
                <header>Notify.</header>
                <div className="no-auth-best">
                    Best way to manage your tasks!
                </div>
            </div>
            <div className="no-auth-now">
                    <Link to={'/auth/sign'} className="no-auth-sign-in">
                        Sign in
                    </Link>
                    <span> or </span>
                    <Link to={'/auth/log'} className="no-auth-log-in">
                        Log in
                    </Link>
                </div>
        </div>
    )
}