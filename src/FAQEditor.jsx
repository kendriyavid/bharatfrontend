import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Save, ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';

const FAQEditor = () => {
  const [faqData, setFaqData] = useState({
    question: '',
    language: 'en',
    response: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Add your FAQ creation API call here
      console.log('Submitting FAQ:', faqData);
      // After successful submission, redirect or clear form
    } catch (error) {
      console.error('Failed to create FAQ:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <Navbar></Navbar>
        <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            className="flex items-center text-gray-600 hover:text-gray-900"
            onClick={() => {/* Add navigation back to FAQ board */}}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to FAQ Board
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save FAQ'}
          </button>
        </div>

        {/* Editor Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="space-y-6">
            {/* Question Input */}
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                Question
              </label>
              <input
                id="question"
                type="text"
                required
                className="w-full px-4 py-2 border rounded-lg"
                value={faqData.question}
                onChange={(e) => setFaqData({ ...faqData, question: e.target.value })}
                placeholder="Enter FAQ question"
              />
            </div>

            {/* Language Selector */}
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                id="language"
                className="w-full px-4 py-2 border rounded-lg bg-white"
                value={faqData.language}
                onChange={(e) => setFaqData({ ...faqData, language: e.target.value })}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>

            {/* TinyMCE Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response
              </label>
              <Editor
                apiKey="tcqb42dcxxho8wlaa0fpntlad563huxppvl6qc5k0os2zo07"
                value={faqData.response}
                onEditorChange={(content) => setFaqData({ ...faqData, response: content })}
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; font-size: 14px; }',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default FAQEditor;