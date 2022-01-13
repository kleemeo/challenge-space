import { useEffect, useState } from 'preact/hooks';
import './style';
import Card from './components/Card';


export default function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  
  const url = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${API_KEY}`;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    const result = await fetch(url).then(res => res.json());
    setData(result);
    console.log(result)
    setIsLoading(false);
  }, [])

  return (
    <>
      <header>
        <h1>Spacestagram</h1>
        <p>These images were taken by NASA's Earth Polychromatic Imaging Camera (EPIC) camera onboard the NOAA DSCOVR spacecraft</p>
        <div className='checkbox-label'>
          <label htmlFor="">Show your liked posts </label>
          <input type='checkbox' onChange={() => setShowFilter(!showFilter)} />
        </div>
      </header>
      <main>
        {isLoading ? (<div className="loading"><i class="fas fa-circle-notch fa-spin"></i></div>) :
          <section class='main-grid'>
            {data.slice(0, 9)
              .filter(item => showFilter ? localStorage.getItem(item.identifier) === 'true' : item)
              .map(item => (item.length === 0 ? <p>Nothing here</p> :
                <Card key={item.identifier} id={item.identifier} date={item.date} image={item.image} />
              ))}
          </section>
        }
      </main>
    </>
  );
}
