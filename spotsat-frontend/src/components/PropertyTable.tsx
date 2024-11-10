import React from 'react';

interface PropertyTableProps {
    properties: { [key: string]: string | number };
}

const PropertyTable: React.FC<PropertyTableProps> = ({ properties }) => {
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Propriedades do Polígono</h2>
            <table className="w-full border border-gray-300 rounded-md">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-2 py-1 text-left font-medium text-gray-600">Propriedade</th>
                        <th className="border px-2 py-1 text-left font-medium text-gray-600">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(properties).map(([key, value]) => (
                        <tr key={key}>
                            <td className="border px-2 py-1 text-gray-700">{key}</td>
                            <td className="border px-2 py-1 text-gray-700">{String(value)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PropertyTable;
