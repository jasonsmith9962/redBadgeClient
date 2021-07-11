import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import Logout from './Logout'

const Header = () => {
    return(
        <header>
            <Navbar className='header'>
                <NavbarBrand>Find an Apex Team</NavbarBrand>
                <Nav className='ml-auto' navbar>
                    <NavItem>
                        
                    </NavItem>
                </Nav>
            </Navbar>
        </header>
    );
};

export default Header;