import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import { PolygonData } from '../types/polygonTypes';
import { createPolygon } from '../services/api';

interface MapViewProps {
    polygons: PolygonData[];
    setPolygons: (updatedPolygons: PolygonData[]) => void;
    onSelectPolygon: (polygon: PolygonData) => void;
}

const MapView: React.FC<MapViewProps> = ({ polygons, setPolygons, onSelectPolygon }) => {
    const [unsavedPolygons, setUnsavedPolygons] = useState<PolygonData[]>([]);
    const drawControlRef = useRef<L.Control.Draw | null>(null);
    const drawnItemsRef = useRef(new L.FeatureGroup());

    const handleMapEvents = (map: L.Map) => {
        map.addLayer(drawnItemsRef.current);

        if (!drawControlRef.current) {
            drawControlRef.current = new L.Control.Draw({
                edit: { featureGroup: drawnItemsRef.current },
                draw: {
                    polygon: {},
                    rectangle: false,
                    circle: false,
                    marker: false,
                    polyline: false,
                },
            });
            map.addControl(drawControlRef.current);
        }

        // Ao criar um novo polígono
        map.on(L.Draw.Event.CREATED, (event: any) => {
            const layer = event.layer;
            drawnItemsRef.current.addLayer(layer);
            const geojson = layer.toGeoJSON();
            const newPolygon: PolygonData = {
                id: Date.now(),
                name: `Polígono ${polygons.length + 1}`,
                properties: { name: `Polígono ${polygons.length + 1}` },
                geom: geojson.geometry,
                centroid: { type: 'Point', coordinates: [0, 0] },
                area: 0,
                userId: 1,
            };
            setPolygons([...polygons, newPolygon]);
            setUnsavedPolygons([...unsavedPolygons, newPolygon]);
        });

        // Editar polígono
        map.on(L.Draw.Event.EDITED, (event: any) => {
            const editedLayers = event.layers;
            const updatedPolygons = polygons.map((polygon) => {
                const editedLayer = editedLayers.getLayer(polygon.id);
                return editedLayer ? { ...polygon, geom: editedLayer.toGeoJSON().geometry } : polygon;
            }).filter((polygon): polygon is PolygonData => !!polygon); // Remove undefined
            setPolygons(updatedPolygons);
        });
    };

    // Função para remover uma camada de polígono específica
    const removePolygonLayer = (id: number) => {
        drawnItemsRef.current.eachLayer((layer: L.Layer) => {
            const layerGeoJson = (layer as L.GeoJSON).toGeoJSON();
            if ((layerGeoJson as any).id === id) { // Casting temporário para acessar `id`
                drawnItemsRef.current.removeLayer(layer);
            }
        });
    };

    const MapWithDrawControl = () => {
        const map = useMap();
        useEffect(() => {
            handleMapEvents(map);
        }, [map]);

        useEffect(() => {
            drawnItemsRef.current.clearLayers();
            polygons.forEach((polygon) => {
                if (polygon.geom) {
                    const geoJsonLayer = new L.GeoJSON(polygon.geom as GeoJSON.GeoJsonObject);
                    geoJsonLayer.on('click', () => onSelectPolygon(polygon));
                    drawnItemsRef.current.addLayer(geoJsonLayer);
                }
            });
        }, [polygons]);

        return null;
    };

    const handleSavePolygons = async () => {
        try {
            const savePromises = unsavedPolygons.map((polygon) =>
                createPolygon({
                    name: polygon.name,
                    geom: polygon.geom,
                    properties: polygon.properties,
                })
            );
            await Promise.all(savePromises);
            alert('Polígonos salvos com sucesso!');
            setUnsavedPolygons([]);
        } catch (error) {
            console.error('Erro ao salvar polígonos:', error);
            alert('Erro ao salvar alguns ou todos os polígonos.');
        }
    };

    return (
        <div className="h-full w-full relative">
            <MapContainer center={[-23.1776, -45.8681]} zoom={10} className="h-full w-full rounded-md overflow-hidden shadow-md">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapWithDrawControl />
            </MapContainer>
            <button
                onClick={handleSavePolygons}
                className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
            >
                Salvar Polígonos
            </button>
        </div>
    );
};

export default MapView;
