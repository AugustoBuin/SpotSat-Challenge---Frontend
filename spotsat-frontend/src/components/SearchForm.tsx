import React, { useState } from 'react';
import { searchPolygonsByRadius } from '../services/api';
import { PolygonData } from '../types/polygonTypes';

interface SearchFormProps {
    setSearchResults: React.Dispatch<React.SetStateAction<PolygonData[]>>;
}

const SearchForm: React.FC<SearchFormProps> = ({ setSearchResults }) => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [radius, setRadius] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null); // Limpa erros anteriores
        try {
            if (!latitude || !longitude || !radius) {
                setErrorMessage('Todos os campos são obrigatórios.');
                return;
            }
            const response = await searchPolygonsByRadius(Number(latitude), Number(longitude), Number(radius));
            setSearchResults(response.data);
            if (response.data.length === 0) {
                setErrorMessage('Nenhum polígono encontrado para os critérios especificados.');
            }
        } catch (error) {
            console.error('Erro ao buscar polígonos:', error);
            setErrorMessage('Erro ao buscar polígonos. Tente novamente.');
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Pesquisar Polígonos por Raio</h2>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <form onSubmit={handleSearch} className="space-y-4">
                <input
                    type="number"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="Latitude"
                    className="w-full p-2 border rounded-md"
                />
                <input
                    type="number"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="Longitude"
                    className="w-full p-2 border rounded-md"
                />
                <input
                    type="number"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    placeholder="Raio (metros)"
                    className="w-full p-2 border rounded-md"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                    Buscar
                </button>
            </form>
        </div>
    );
};

export default SearchForm;
