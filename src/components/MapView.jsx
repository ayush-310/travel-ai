import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const MapView = () => {
    return (
        <div className="h-[400px] w-full rounded overflow-hidden">
            <MapContainer
                center={[28.6139, 77.2090]} // Delhi (default)
                zoom={10}
                scrollWheelZoom={true}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    );
};

export default MapView;