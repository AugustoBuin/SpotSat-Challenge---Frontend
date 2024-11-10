// Home.tsx
import React, { useState, useCallback } from 'react';
import MapView from '../components/MapView';
import PolygonList from '../components/PolygonList';
import PropertyTable from '../components/PropertyTable';
import JsonEditor from '../components/JsonEditor';
import SearchForm from '../components/SearchForm';
import { PolygonData } from '../types/polygonTypes';

const Home: React.FC = () => {
    const [polygons, setPolygons] = useState<PolygonData[]>([]);
    const [selectedPolygon, setSelectedPolygon] = useState<PolygonData | null>(null);
    const [jsonContent, setJsonContent] = useState<string>('');
    const [activeTab, setActiveTab] = useState<'list' | 'properties' | 'json' | 'search'>('list');

    const updateJsonContent = useCallback((updatedPolygons: PolygonData[]) => {
        setPolygons(updatedPolygons);
        setJsonContent(JSON.stringify({ type: 'FeatureCollection', features: updatedPolygons }, null, 2));
    }, []);

    const handleSavePolygon = () => {
        try {
            const parsedData = JSON.parse(jsonContent);
            setPolygons(parsedData.features || []);
            alert('Polígonos atualizados com sucesso!');
        } catch (error) {
            alert('Erro ao salvar os polígonos. Verifique o formato JSON.');
        }
    };

    // Função para remover camada de polígono do MapView ao deletar
    const onPolygonDelete = (id: number) => {
        setPolygons((prevPolygons) => prevPolygons.filter((polygon) => polygon.id !== id));
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <div className="w-2/3 h-full shadow-md">
                <MapView polygons={polygons} setPolygons={updateJsonContent} onSelectPolygon={setSelectedPolygon} />
            </div>
            <div className="w-1/3 h-full flex flex-col bg-white p-6 border-l border-gray-200">
                <div className="flex justify-around mb-6 space-x-2">
                    <button onClick={() => setActiveTab('list')} className={`p-2 ${activeTab === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md`}>
                        Lista
                    </button>
                    <button onClick={() => setActiveTab('properties')} className={`p-2 ${activeTab === 'properties' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md`}>
                        Propriedades
                    </button>
                    <button onClick={() => setActiveTab('json')} className={`p-2 ${activeTab === 'json' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md`}>
                        Editor JSON
                    </button>
                    <button onClick={() => setActiveTab('search')} className={`p-2 ${activeTab === 'search' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md`}>
                        Buscar
                    </button>
                </div>

                <div className="mt-4 flex-grow overflow-y-auto space-y-6">
                    {activeTab === 'list' && <PolygonList polygons={polygons} setPolygons={setPolygons} setSelectedPolygon={setSelectedPolygon} setJsonContent={setJsonContent} onPolygonDelete={onPolygonDelete} />}
                    {activeTab === 'properties' && selectedPolygon && <PropertyTable properties={selectedPolygon.properties} />}
                    {activeTab === 'json' && (
                        <JsonEditor jsonContent={jsonContent} setJsonContent={setJsonContent} />
                    )}
                    {activeTab === 'search' && <SearchForm setSearchResults={setPolygons} />}
                </div>

                {activeTab === 'json' && (
                    <button
                        className="w-full bg-green-500 text-white p-2 mt-4 rounded-md hover:bg-green-600"
                        onClick={handleSavePolygon}
                    >
                        Salvar Polígono
                    </button>
                )}
            </div>
        </div>
    );
};

export default Home;
