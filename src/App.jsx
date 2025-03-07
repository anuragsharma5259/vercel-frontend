import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";
import { Loader2, Upload, Flame, Copy, ChevronDown, ChevronUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import "./index.css";

export default function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [extractedText, setExtractedText] = useState("");
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
            const response = await fetch("https://vercel-backend-fine.vercel.app/upload-resume", {
                method: "POST",
                body: formData,
            });
            

            const data = await response.json();
            setExtractedText(data.extractedText || "No text extracted!");
            setRoastText(data.roast || "No roast returned!");

            // Minimize upload card after receiving response
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
            {/* Title Section */}
            <h1 className="text-5xl font-extrabold mb-6 flex items-center gap-2 text-blue-400 neon-glow">
                <Flame size={50} />
                Roast My Resume 
            </h1>

            {/* Toggle Upload Card Button */}
            {!isUploadVisible && (
                <button 
                    onClick={() => setIsUploadVisible(true)} 
                    className="fixed top-6 right-6 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-700 transition flex items-center gap-1"
                >
                    <Upload size={20} /> Upload Again
                </button>
            )}

            {/* Upload Card (Minimizable) */}
            {isUploadVisible && (
                <Card className="w-full max-w-lg p-6 bg-gray-900 shadow-xl border border-black-800 rounded-2xl neon-card">
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle className="text-xl font-semibold text-black-400">Upload Your Resume</CardTitle>
                        <button onClick={() => setIsUploadVisible(false)} className="text-gray-400 hover:text-white">
                            <ChevronUp size={24} />
                        </button>
                    </CardHeader>
                    <CardContent>
                        <input 
                            type="file" 
                            accept="application/pdf" 
                            onChange={handleFileChange} 
                            className="mb-3 w-full p-2 bg-gray-800 text-white rounded cursor-pointer border border-gray-600 hover:border-blue-400 transition"
                        />

                        {/* Language Selection */}
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

            {/* Roast Output Card */}
            {roastText && (
                <Card className="relative w-full max-w-2xl mt-8 p-6 bg-gray-900/70 shadow-[0_0_30px_rgba(0,150,255,0.8)] border border-blue-600 neon-card transition-transform transform hover:scale-105 rounded-2xl">
                    <CardHeader className="flex justify-between items-center">
                        <CardTitle className="text-2xl font-extrabold text-blue-400 flex items-center gap-2 transition-all duration-300 hover:text-blue-500">
                            🔥 Your Roast 🔥
                        </CardTitle>
                        <button 
                            onClick={handleCopy} 
                            className="text-gray-400 hover:text-white transition-transform transform hover:scale-125"
                        >
                            <Copy size={28} />
                        </button>
                    </CardHeader>

                    <CardContent>
                        <ReactMarkdown 
                            components={{ 
                                p: ({ node, ...props }) => (
                                    <p 
                                        {...props} 
                                        className="text-gray-100 leading-relaxed text-lg font-medium tracking-wide transition-all duration-300 hover:text-red-100 hover:shadow-lg hover:shadow-blue-500 hover:scale-105 "
                                    />
                                )
                            }}
                        >
                          {roastText}
                        </ReactMarkdown>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
