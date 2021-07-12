import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';


const Header = () => {
    return(
        <header>
            <Navbar className='header'>
                <NavbarBrand>Find an APEX Team</NavbarBrand>
                <Nav className='ml-auto' navbar>
                    <NavItem>
                        
                    </NavItem>
                </Nav>
            </Navbar>
        </header>
    );
};

export default Header;