import React, { useEffect } from 'react';

interface JsonEditorProps {
    jsonContent: string;
    setJsonContent: React.Dispatch<React.SetStateAction<string>>;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ jsonContent, setJsonContent }) => {
    useEffect(() => {
        setJsonContent(JSON.stringify({ type: 'FeatureCollection', features: [] }, null, 2));
    }, [setJsonContent]);

    const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setJsonContent(e.target.value);
    };

    return (
        <div className="p-4 flex-grow">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">JSON Editor</h2>
            <textarea
                className="w-full h-full p-2 border border-gray-300 rounded-md"
                value={jsonContent}
                onChange={handleJsonChange}
                placeholder="Insira ou edite o JSON do polígono"
            />
        </div>
    );
};

export default JsonEditor;
