import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// 🔥 FIX marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const ChangeView = ({ center }) => {
    const map = useMap();

    React.useEffect(() => {
        map.setView(center);
    }, [center, map]);

    return null;
};

const MapView = ({ lat, lng, markers = [] }) => {
    const position = [lat, lng];

    return (
        <div className="h-[500px] w-full rounded overflow-hidden">
            <MapContainer
                key={`${lat}-${lng}-${markers.length}`}
                center={position}
                zoom={10}
                className="h-full w-full"
            >
                <ChangeView center={position} />

                <TileLayer
                    attribution="&copy; OpenStreetMap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {markers.map((marker, index) => (
                    <Marker key={index} position={[marker.lat, marker.lng]}>
                        <Popup>{marker.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapView;