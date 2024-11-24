import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header>
            <nav>
                <div className="navigation">
                    <Link to="/">
                        <div>Programuotojai API</div>
                    </Link>
                    <Link to="/new">
                        <div>Prideti programuotoja</div>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;