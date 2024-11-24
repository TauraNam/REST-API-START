const Create = () => {

    const citiesMap = {
        Vilnius: [54.38, 25.19],
        Kaunas: [54.54, 23.54],
        Klaipeda: [55.43, 21.10],
        Panevezys: [55.42, 24.25],
        Alytus: [54.24, 24.03]
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const elements = e.target.elements

        const name = elements.name.value
        const technology = elements.technology.value.split(',')
        const availability = { yes: true, no: false }[elements.availability.value]
        const city = citiesMap[elements.city.value]

        technology.map((tech) => { return tech.trim() })

        fetch('/api/programuotojai/',
            {
                method: 'POST',
                body: JSON.stringify({
                    vardas: name, tech: technology, laisvas: availability, location: { "type": "Point", "coordinates": city }
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response')
                return response.json()
            })
            .catch(err => console.log('Error during fetch', err))
    }

    return (
        <div id="create">
            <h2>Pridėti naują programuotoją</h2>
            <form onSubmit={handleSubmit}>
                <label>Vardas:</label>
                <input type="text" placeholder="vardas" name="name" required />
                <label>Technologijos:</label>
                <input type="text" placeholder="technologijos" name="technology" required />
                <label>Ar šiuo metu esate laisvas darbo pasiūlymui?</label>
                <div className="radio-group">
                    <input type="radio" id="yes" name="availability" value="yes" />
                    <label htmlFor="yes">Taip</label>
                    <input type="radio" name="availability" id="no" value="no" />
                    <label htmlFor="no">Ne</label>
                </div>
                <label>Miestas</label>
                <select className="city-option" name="city">
                    <option selected>Pasirinkite miesta</option>
                    <option value="Vilnius">Vilnius</option>
                    <option value="Kaunas">Kaunas</option>
                    <option value="Klaipeda">Klaipėda</option>
                    <option value="Panevezys">Panevėžys</option>
                    <option value="Alytus">Alytus</option>
                </select>
                <input type="submit" value='Pridėti programuotoją' />
            </form>
        </div>
    );
}

export default Create;