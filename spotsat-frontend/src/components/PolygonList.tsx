// PolygonList.tsx
import React from 'react';
import { deletePolygon } from '../services/api';
import { PolygonData } from '../types/polygonTypes';

interface PolygonListProps {
    polygons: PolygonData[];
    setPolygons: React.Dispatch<React.SetStateAction<PolygonData[]>>;
    setSelectedPolygon: (polygon: PolygonData) => void;
    setJsonContent: (content: string) => void;
    onPolygonDelete: (id: number) => void;
}

const PolygonList: React.FC<PolygonListProps> = ({ polygons, setPolygons, setSelectedPolygon, setJsonContent, onPolygonDelete }) => {
    const handleDelete = async (id: number) => {
        try {
            await deletePolygon(id.toString());
            setPolygons((prevPolygons) => prevPolygons.filter((polygon) => polygon.id !== id));
            onPolygonDelete(id);
        } catch (error) {
            alert('Erro ao deletar o polígono');
        }
    };

    const handleEdit = (polygon: PolygonData) => {
        setSelectedPolygon(polygon);
        setJsonContent(JSON.stringify(polygon, null, 2));
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Lista de Polígonos</h2>
            <ul className="space-y-2">
                {polygons.map((polygon) => (
                    <li key={polygon.id} className="flex justify-between items-center p-2 bg-gray-100 rounded-md shadow-sm">
                        <span
                            className="cursor-pointer text-blue-600 hover:underline"
                            onClick={() => setSelectedPolygon(polygon)}
                        >
                            {polygon.name || 'Polígono sem nome'}
                        </span>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleEdit(polygon)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(polygon.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                            >
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PolygonList;
