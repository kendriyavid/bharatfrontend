import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Globe } from "lucide-react";
import Navbar from "./Navbar";

const FAQApp = () => {
  const [language, setLanguage] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFAQs();
  }, [language]);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/faqs/fetchall?lang=${language !== "en" ? language : ""}`);
      if (!response.ok) throw new Error("Failed to fetch FAQs");
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error(error);
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSpecificFAQ = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/faqs/${id}?lang=${language !== "en" ? language : ""}`);
      if (!response.ok) throw new Error("Failed to fetch FAQ");
      const data = await response.json();
      setSelectedFaq(data);
    } catch (error) {
      console.error(error);
      setSelectedFaq(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Globe className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              FAQ Management System
            </h1>
          </div>

          {/* Language Selector */}
          <div className="mb-8">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-60 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Language</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* FAQ List */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Available FAQs
              </h2>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <div
                      key={faq.id}
                      onClick={() => fetchSpecificFAQ(faq.id)}
                      className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <p className="text-gray-700">{faq.question}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {!loading && faqs.length === 0 && (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-500">
                    No FAQs available for the selected language
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Content */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                FAQ Content
              </h2>
              
              <div className="bg-white rounded-lg border border-gray-200 p-4 min-h-[500px]">
                {selectedFaq ? (
                  <Editor
                    apiKey="tcqb42dcxxho8wlaa0fpntlad563huxppvl6qc5k0os2zo07"
                    initialValue={selectedFaq.response}
                    init={{
                      height: 480,
                      menubar: false,
                      toolbar: false,
                      readonly: true,
                      plugins: [],
                      content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; font-size: 14px; }',
                      skin: 'oxide',
                      statusbar: false,
                    }}
                  />
                ) : (
                  <div className="h-[480px] flex items-center justify-center text-gray-500">
                    Select an FAQ from the list to view its content
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQApp;