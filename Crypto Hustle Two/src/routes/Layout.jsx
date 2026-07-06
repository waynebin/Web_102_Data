import{Outlet,Link} from 'react-router-dom'
const Layout = () => {
    return(
        <div>
            <nav className='home-link'key="home-button">
                <Link style={{color:"white"}} to="/">
                    Home
                </Link>
            </nav>
            <Outlet />
        </div>
    )
}
export default Layout;