import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const Edit = () => {

    const { id } = useParams();
    const [dev, setDev] = useState(null);
    const navigate = useNavigate();

    const citiesMap = {
        Vilnius: [54.38, 25.19],
        Kaunas: [54.54, 23.54],
        Klaipeda: [55.43, 21.10],
        Panevezys: [55.42, 24.25],
        Alytus: [54.24, 24.03]
    }

    const getDeveloper = () => {
        fetch('/api/programuotojai/' + id,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response')
                return response.json()
            })
            .then(devData => {
                setDev(devData)
            })
            .catch(err => console.log('Error during fetch', err))
    }

    useEffect(() => {
        getDeveloper()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const elements = e.target.elements
        const name = elements.name.value
        const technology = elements.technology.value
        const availability = { yes: true, no: false }[elements.availability.value]
        const city = citiesMap[elements.city.value]

        fetch('/api/programuotojai/' + id,
            {
                method: 'PUT',
                body: JSON.stringify({
                    vardas: name, tech: technology, laisvas: availability, location: { "type": "Point", "coordinates": city }
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response')
                navigate('/')
            })
            .catch(err => console.log('Error during fetch', err))
    }

    const getDefaultCity = () => {
        if (dev.length === 0) return '';
        const devCity = Object.keys(citiesMap).find(city => {
            const [lat, lng] = citiesMap[city];
            return lat === dev.location.coordinates[0] && lng === dev.location.coordinates[1];
        });
        return devCity || '';
    };

    return (
        <div id="edit-page">
            <h2>Redaguoti programuotojo informaciją</h2>
            {dev && (
                <form onSubmit={handleSubmit}>
                    <label>Vardas:</label>
                    <input type="text" placeholder="vardas" name="name" defaultValue={dev.vardas} required />
                    <label>Technologijos:</label>
                    <input type="text" placeholder="technologijos" name="technology" defaultValue={dev.tech} required />
                    <label>Ar šiuo metu esate laisvas darbo pasiūlymui?</label>
                    <div className='radio-group'>
                        <input type="radio" id="yes" name="availability" value="yes"
                            defaultChecked={dev.laisvas === true} />
                        <label htmlFor="yes">Taip</label>
                        <input type="radio" name="availability" id="no" value="no"
                            defaultChecked={dev.laisvas === false} />
                        <label htmlFor="no">Ne</label>
                    </div>
                    <label>Miestas</label>
                    <select className="city-option" name="city" defaultValue={getDefaultCity()}>
                        <option value=''>Pasirinkite miesta</option>
                        <option value="Vilnius">Vilnius</option>
                        <option value="Kaunas">Kaunas</option>
                        <option value="Klaipeda">Klaipėda</option>
                        <option value="Panevezys">Panevėžys</option>
                        <option value="Alytus">Alytus</option>
                    </select>
                    <input type="submit" value='Atnaujinti duomenis' />
                </form>
            )}
        </div>
    );
}


export default Edit;
