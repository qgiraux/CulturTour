import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMapEvents, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import default Leaflet marker icon and shadow
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon issue
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41], // Default size
  iconAnchor: [12, 41], // Anchor point
  popupAnchor: [1, -34], // Popup position
  shadowSize: [41, 41], // Shadow size
});

// Set the default icon globally
L.Marker.prototype.options.icon = DefaultIcon;

// Define a type for GeoJSON data
type GeoJSONFeature = {
  type: 'Feature';
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    type_equipement_ou_lieu: string;
    nom?: string;
    adresse_postale?: string;
    [key: string]: any;
  };
};

type GeoJSONData = {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
};

function App() {
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
  const [filteredGeoData, setFilteredGeoData] = useState<GeoJSONData | null>(null);
  const [equipmentTypes, setEquipmentTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<L.LatLng | null>(L.latLng(46.603354, 1.888334));
  const [distance, setDistance] = useState<number>(10);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Initialize with an empty string

  const handleSearch = async () => {
    if (!searchQuery || !mapInstance) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const results = await response.json();

      if (results.length > 0) {
        const { lat, lon } = results[0];
        mapInstance.setView([parseFloat(lat), parseFloat(lon)], 13);
      } else {
        alert('Location not found. Please try a different search query.');
      }
    } catch (error) {
      console.error('Error searching location:', error);
      alert('An error occurred while searching for the location.');
    }
  };

  const MapSearchHandler = () => {
    const map = useMap();

    useEffect(() => {
      setMapInstance(map);
    }, [map]);

    return null;
  };

  useEffect(() => {
    // Fetch GeoJSON data and extract unique equipment types
    fetch(`${import.meta.env.BASE_URL}cleaned.geojson`)
      .then((response) => response.json())
      .then((data: GeoJSONData) => {
        setGeoData(data);

        // Extract unique `type_equipement_ou_lieu` values
        const types = Array.from(
          new Set(data.features.map((feature) => feature.properties.type_equipement_ou_lieu))
        );
        setEquipmentTypes(types);
      })
      .catch((error) => console.error('Error fetching GeoJSON data:', error));
  }, []);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedType(selected);
    applyFilters(selected, selectedPoint, distance);
  };

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dist = parseFloat(event.target.value);
    setDistance(dist);
    applyFilters(selectedType, selectedPoint, dist);
  };

  const applyFilters = (types: string | null, point: L.LatLng | null, dist: number) => {
    if (!geoData) return;

    let filteredFeatures = geoData.features;
    // If no filters are selected, display none
    if (!types) {
      setFilteredGeoData({
      type: 'FeatureCollection',
      features: [],
      });
      return;
    }
    // Filter by equipment type
    if (types) {
      const selectedTypes = types.split(','); // Split the selected types into an array
      filteredFeatures = filteredFeatures.filter((feature) =>
        selectedTypes.includes(feature.properties.type_equipement_ou_lieu)
      );
    }

    // Filter by distance
    if (point && dist > 0) {
      filteredFeatures = filteredFeatures.filter((feature) => {
        if (!feature.geometry || !feature.geometry.coordinates) return false;
        const [lng, lat] = feature.geometry.coordinates;
        const featurePoint = L.latLng(lat, lng);
        return featurePoint.distanceTo(point) <= dist * 1000; // Convert km to meters
      });
    }

    setFilteredGeoData({
      type: 'FeatureCollection',
      features: filteredFeatures,
    });
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setSelectedPoint(e.latlng);
        applyFilters(selectedType, e.latlng, distance);
      },
    });
    return selectedPoint ? (
      <Marker position={selectedPoint}>
        <Popup>Selected Point</Popup>
      </Marker>
    ) : null;
  };
  const exportToCSV = () => {
    if (!filteredGeoData) return;
  
    // Convert GeoJSON features to CSV rows
    const rows = filteredGeoData.features.map((feature) => {
      const { nom, adresse_postale, type_equipement_ou_lieu, code_insee_epci, telephone, email } = feature.properties;
      const [lng, lat] = feature.geometry.coordinates;
      return {
        Nom: nom || 'Nom non disponible',
        Adresse: adresse_postale || 'Adresse non disponible',
        Type: type_equipement_ou_lieu || 'Type non disponible',
        Longitude: lng,
        Latitude: lat,
        SIREN: code_insee_epci,
        email: email || 'email non disponible',
        telephone: telephone ? `'${telephone}'` : 'telephone non disponible',
      };
    });
  
    // Convert rows to CSV string
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Nom,Adresse,Type,Longitude,Latitude, SIREN, email, telephone']
        .concat(rows.map((row) => Object.values(row).join(',')))
        .join('\n');
  
    // Create a download link and trigger it
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'filtered_pins.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const FilteredGeoJSON = () => {
    const apiCache: { [key: string]: { telephone: string; email: string } } = {};
  
    const fetchBatchData = async (codes: string[]) => {
      try {
        // Join codes into a single query parameter
        const codesQuery = codes.map(encodeURIComponent).join('|');
        const response = await fetch(
          `https://tabular-api.data.gouv.fr/api/resources/c4cdd239-c82d-41ac-b0fb-530cccbab108/data/?N%C2%B0%20SIREN__in=${codesQuery}`
        );
        const data = await response.json();
        // Process the response and cache the results
        if(data.data){
          data.data.forEach((item: any) => {
            const code = item['N° SIREN'];
            const telephone = item['Téléphone du siège'] || item['Téléphone administrative'] || 'non disponible';
            const email = item['Courriel du siège'] || 'non disponible';
    
            // Cache the response
            apiCache[code] = { telephone, email };
          });
        }
      } catch (error) {
        console.error('Error fetching batch data:', error);
      }
    };
  
    const onEachFeature = async (feature: GeoJSON.Feature<GeoJSON.Geometry, any>, layer: L.Layer) => {
      if (feature.properties) {
        const { nom, adresse_postale, type_equipement_ou_lieu, code_insee_epci } = feature.properties;
        
        if (code_insee_epci) {
          // Check if the data is already in the cache
          if (apiCache[code_insee_epci]) {
            const { telephone, email } = apiCache[code_insee_epci];
            bindPopup(layer, nom, adresse_postale, type_equipement_ou_lieu, code_insee_epci, telephone, email);
          } else {
            // Fetch data in batches
            const codesToFetch = [code_insee_epci]; // Add the current code to the batch
            await fetchBatchData(codesToFetch);
  
            // Retrieve the cached data after the batch fetch
            const { telephone, email } = apiCache[code_insee_epci] || { telephone: 'non disponible', email: 'non disponible' };
            feature.properties.telephone = telephone;
            feature.properties.email = email;
            bindPopup(layer, nom, adresse_postale, type_equipement_ou_lieu, code_insee_epci, telephone, email);
          }
        } else {
          // Bind a default popup if no code_insee_epci is available
          bindPopup(layer, nom, adresse_postale, type_equipement_ou_lieu, 'non disponible', 'non disponible', 'non disponible');
        }
      }
    };
  
    const bindPopup = (
      layer: L.Layer,
      nom: string | undefined,
      adresse_postale: string | undefined,
      type_equipement_ou_lieu: string | undefined,
      code_insee_epci: string | undefined,
      telephone: string,
      email: string
    ) => {
      layer.bindPopup(
        `
        <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5;">
          <strong style="font-size: 16px; color: #333;">${nom || 'Nom non disponible'}</strong>
          <br />
          <span style="color: #555;">${adresse_postale || 'Adresse non disponible'}</span>
          <br />
          <span style="color: #555;">${type_equipement_ou_lieu || 'Type non disponible'}</span>
          <br />
          <span style="color: #555;">INSEE / SIREN : ${code_insee_epci || 'non disponible'}</span>
          <br />
          <span style="color: #555;">Téléphone : ${telephone}</span>
          <br />
          <span style="color: #555;">Email : ${email}</span>
        </div>
        `
      );
    };
  
    return filteredGeoData ? (
      <GeoJSON data={filteredGeoData} onEachFeature={onEachFeature} />
    ) : null;
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Side Menu */}
      
      <div
  style={{
    width: '300px',
    padding: '20px',
    background: '#f0f4f8',
    borderRight: '2px solid #ddd',
    overflowY: 'auto',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
  }}
>
  {/* Search Section */}
  <div
    id="section"
    style={{
      marginBottom: '20px',
      padding: '15px',
      background: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}
  >
    <h3 style={{ marginBottom: '10px', color: '#333' }}>Search Location</h3>
    <input
      type="text"
      placeholder="Enter a location"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px',
      }}
    />
    <button
      onClick={handleSearch}
      style={{
        padding: '10px',
        background: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
        fontSize: '14px',
      }}
    >
      Search
    </button>
  </div>

  {/* Filters Section */}
  <div
    id="section"
    style={{
      marginBottom: '20px',
      padding: '15px',
      background: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}
  >
    <h3 style={{ marginBottom: '10px', color: '#333' }}>Filters</h3>
    <label htmlFor="equipmentType" style={{ fontWeight: 'bold', color: '#555' }}>
      Types of Locations:
    </label>
    <div
      id="equipmentType"
      style={{
        marginBottom: '10px',
        maxHeight: '200px',
        overflowY: 'auto',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        background: '#f9f9f9',
      }}
    >
      {equipmentTypes.map((type) => (
        <div key={type} style={{ marginBottom: '5px' }}>
          <input
            type="checkbox"
            id={`type-${type}`}
            value={type}
            checked={selectedType?.split(',').includes(type)}
            onChange={(e) => {
              const selectedTypes = selectedType ? selectedType.split(',') : [];
              let updatedTypes;
              if (e.target.checked) {
                updatedTypes = [...selectedTypes, type];
              } else {
                updatedTypes = selectedTypes.filter((t) => t !== type);
              }
              setSelectedType(updatedTypes.join(','));
              applyFilters(updatedTypes.join(','), selectedPoint, distance);
            }}
          />
          <label
            htmlFor={`type-${type}`}
            style={{ marginLeft: '5px', color: '#555', fontSize: '14px' }}
          >
            {type}
          </label>
        </div>
      ))}
    </div>

    <label htmlFor="distance" style={{ fontWeight: 'bold', color: '#555' }}>
      Distance (km):
    </label>
    <input
      id="distance"
      type="range"
      min="1"
      max="100"
      value={distance}
      onChange={handleDistanceChange}
      style={{
        width: '100%',
        marginTop: '10px',
        marginBottom: '10px',
      }}
    />
    <div
      style={{
        textAlign: 'center',
        fontSize: '14px',
        color: '#333',
        fontWeight: 'bold',
      }}
    >
      {distance} km
    </div>

    {selectedPoint && (
      <div
        style={{
          marginTop: '10px',
          fontSize: '14px',
          color: '#555',
          padding: '10px',
          background: '#f9f9f9',
          borderRadius: '4px',
          border: '1px solid #ddd',
        }}
      >
        <strong>Selected Point:</strong>
        <br />
        Lat: {selectedPoint.lat.toFixed(4)}, Lng: {selectedPoint.lng.toFixed(4)}
      </div>
    )}
  </div>

  {/* Export Section */}
  <div
    id="section"
    style={{
      padding: '15px',
      background: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}
  >
    <button
      onClick={exportToCSV}
      style={{
        padding: '10px',
        background: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
        fontSize: '14px',
      }}
    >
      Export to CSV
    </button>
  </div>
</div>

      {/* Map */}
      <div style={{ flex: 1 }}>
        <MapContainer center={[46.603354, 1.888334]} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapSearchHandler />
          <MapClickHandler />
          {filteredGeoData && <FilteredGeoJSON />}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;