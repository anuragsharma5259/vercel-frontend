import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";
import { Loader2, Upload, Flame, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import "./index.css";

const API_URL = "https://roastapi-production.up.railway.app"; // Updated API URL

export default function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [roastText, setRoastText] = useState("");
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState("English");
    const [isUploadVisible, setIsUploadVisible] = useState(true);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please upload a resume first!");
            return;
        }
    
        setLoading(true);
        const formData = new FormData();
        formData.append("resume", selectedFile);
        formData.append("language", language);
    
        try {
            const response = await fetch(`${API_URL}/upload-resume`, {
                method: "POST",
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
    
            const data = await response.json();
            setRoastText(data.roast || "No roast returned!");
    
            setIsUploadVisible(false);
        } catch (error) {
            console.error("Error uploading file:", error);
            setRoastText("Failed to get a roast. Try again!");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (!roastText) return;
        navigator.clipboard.writeText(roastText);
        alert("🔥 Roast copied to clipboard!");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 flex items-center gap-2 text-blue-400 neon-glow">
                <Flame className="h-10 w-10 md:h-12 md:w-12" />
                Roast My Resume 
            </h1>

            {!isUploadVisible && (
                <button 
                    onClick={() => setIsUploadVisible(true)} 
                    className="fixed top-6 right-6 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-700 transition flex items-center gap-1"
                >
                    <Upload size={20} /> Upload Again
                </button>
            )}

            {isUploadVisible && (
                <Card className="w-full max-w-lg p-6 bg-gray-900 shadow-xl border border-gray-800 rounded-2xl neon-card">
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle className="text-lg md:text-xl font-semibold text-white">Upload Your Resume</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <input 
                            type="file" 
                            accept="application/pdf" 
                            onChange={handleFileChange} 
                            className="mb-3 w-full p-2 bg-gray-800 text-white rounded cursor-pointer border border-gray-600 hover:border-blue-400 transition"
                        />

                        <select 
                            value={language} 
                            onChange={handleLanguageChange} 
                            className="w-full p-2 bg-gray-800 text-white rounded mb-4 border border-gray-600 hover:border-blue-400 transition"
                        >
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                            <option value="French">French</option>
                            <option value="Spanish">Spanish</option>
                        </select>

                        <button 
                            onClick={handleUpload} 
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition-all transform hover:scale-105"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Upload className="mr-2" />}
                            {loading ? "Roasting..." : "Upload & Roast"}
                        </button>
                    </CardContent>
                </Card>
            )}

            {roastText && (
                <Card className="relative w-full max-w-2xl mt-8 p-6 bg-gray-900/70 shadow-lg border border-blue-600 neon-card">
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle className="text-lg md:text-2xl font-extrabold text-blue-400">🔥 Your Roast 🔥</CardTitle>
                        <button onClick={handleCopy} className="text-gray-400 hover:text-white">
                            <Copy size={28} />
                        </button>
                    </CardHeader>
                    <CardContent>
                        <ReactMarkdown>{roastText}</ReactMarkdown>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
