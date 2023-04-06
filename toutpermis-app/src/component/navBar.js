import '../css/LandingPage.css'
import Burger from '../images/iconsAwesome/bars-solid.svg'
import localLogo from '../images/toutpermisLogoVidepng.png'
import volant from '../images/volantLogo.png'
import Login from '../images/iconsAwesome/user-regular (1).svg'
import { NavLink } from 'react-router-dom'
function Navbar(){
    return(
      <div>
        <navbar className="navbar">
            <img src={Burger} className="burger" ></img>
            <div className="logoParaPicto">
              <div className='picto'>
                <img src={localLogo} className="LogoSphère" ></img>
                <img src={volant} className="Volant" ></img>
              </div>
              <div className="paraLogo">
                <p className="tout">Tout</p>
                <p className="permis">permis</p>
              </div>
            </div>
            <div className='loginContainer'>
                <img src={Login} className='login'></img>
            </div>
        </navbar>
     </div>
    )
}

export default Navbar