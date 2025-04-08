# CulturTour

This project is a web application that visualizes and filters GeoJSON data on a map. It allows users to search for locations, filter data by type and distance, and export filtered results to a CSV file. The application also fetches additional information (telephone and email) for each feature from an external API.

## Features

- **Interactive Map**: Displays GeoJSON data on a map using Leaflet.
- **Search Functionality**: Search for locations using the OpenStreetMap Nominatim API.
- **Filters**:
  - Filter by type of equipment or location.
  - Filter by distance from a selected point.
- **Dynamic Popups**: Show detailed information for each feature, including telephone and email fetched from an external API.
- **Export to CSV**: Export filtered data to a CSV file.

## Technologies Used

- **Frontend**: React, TypeScript
- **Mapping Library**: Leaflet, React-Leaflet
- **APIs**:
  - [OpenStreetMap Nominatim API](https://nominatim.org/) for location search.
  - [Tabular API](https://tabular-api.data.gouv.fr/) for fetching additional feature details.
- **GeoJSON**: Used for storing and visualizing geographical data.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/open-data-challenge.git
   cd open-data-challenge
   ```

2. Install dependencies:
    ```bash
    nvm install node
    nvm install --lts
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Open your browser and navigate to:
    ```bash
    http://localhost:3000
    ```

## Usage
1. Search for a Location
Enter a location in the search bar on the left panel.
Click the "Search" button to center the map on the searched location.
2. Filter Data
Use the checkboxes to filter by types of equipment or locations.
Adjust the distance slider to filter features within a specific radius of the selected point.
Click on the map to select a point for distance filtering.
3. View Feature Details
Click on a feature on the map to view its details in a popup.
The popup includes:
Name
Address
Type
INSEE/SIREN code
Telephone
Email
4. Export to CSV
After applying filters, click the "Export to CSV" button to download the filtered data as a CSV file.

##Project Structure
```
src/
├── App.tsx               # Main application component
├── components/           # Reusable components
├── assets/               # Static assets (e.g., images, icons)
├── styles/               # CSS or SCSS files
└── utils/                # Utility functions
```

##API Details
1. OpenStreetMap Nominatim API
Endpoint: https://nominatim.openstreetmap.org/search
Purpose: Search for locations by name.
Parameters:
q: The search query.
format: Response format (JSON).
2. Tabular API
Endpoint: https://tabular-api.data.gouv.fr/api/resources/c4cdd239-c82d-41ac-b0fb-530cccbab108/data/
Purpose: Fetch additional details (telephone and email) for features using their INSEE/SIREN codes.
Parameters:
N° SIREN__in: A comma-separated list of SIREN codes.
Future Enhancements
Add user authentication for personalized data management.
Allow users to upload their own GeoJSON files.
Add more advanced filtering options (e.g., by date or category).
Improve performance for large datasets.
###License
This project is licensed under the Apache License Version 2.0.

###Acknowledgments
Leaflet for the mapping library.
React-Leaflet for integrating Leaflet with React.
OpenStreetMap for location data.
Data.gouv.fr for the Tabular API.
