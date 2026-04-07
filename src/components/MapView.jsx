import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

const ChangeView = ({ center }) => {
    const map = useMap();
    map.setView(center);
    return null;
};

const MapView = ({ lat = 28.6139, lng = 77.2090 }) => {
    const position = [lat, lng];

    return (
        <div className="h-[400px] w-full rounded overflow-hidden mt-4">
            <MapContainer
                center={position}
                zoom={10}
                scrollWheelZoom={true}
                className="h-full w-full"
            >
                <ChangeView center={position} />

                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    );
};

export default MapView;