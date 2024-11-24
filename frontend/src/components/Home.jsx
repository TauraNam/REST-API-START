import { useState } from 'react';
import Devs from './Devs';

const Home = () => {
    const [devs, setDevs] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        const elements = e.target.elements
        const lng = elements.lng.value
        const lat = elements.lat.value

        fetch('/api/programuotojai/?lng=' + lng + '&lat=' + lat)
            .then(response => {
                if (!response.ok) throw new Error('Network response')
                return response.json()
            })
            .then(json => {
                setDevs([...json])
            })
            .catch(err => console.log('Error during fetch', err))
    }

    const handleDelete = (devId) => {
        fetch('/api/programuotojai/' + devId, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) throw new Error('Nepavyko delete');
                return response.json();
            })
            .then(deleteDev => {
                const updateDevs = devs.filter(dev => dev._id !== deleteDev._id);
                setDevs(updateDevs);
            })
            .catch(err => console.log('Error during delete', err));
    };

    return (
        <div className="dev-container">
            <h1 className="title">Programuotojai API</h1>
            <div id="homepage">
                <h2>Surask programuotoją šalia savęs!</h2>
                <div id="devs">
                    <form id='search' onSubmit={handleSubmit}>
                        <label> Ilguma: </label>
                        <input id="lng" type="number" step="0.01" name="lng" placeholder='ilguma' required />
                        <label> Platuma: </label>
                        <input id="lat" type="number" step="0.01" name="lat" placeholder='platuma' required />
                        <input type="submit" value='Rasti programuotojus' />
                    </form>
                </div>
            </div>
            <ul>{devs.length > 0 && <Devs devs={devs} handleDelete={handleDelete} />}</ul>
        </div>
    );
}

export default Home;