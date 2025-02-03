

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Grid,
//   IconButton,
//   CircularProgress,
//   Alert,
//   Snackbar
// } from "@mui/material";
// import { Editor } from "@tinymce/tinymce-react";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import Navbar from "./navbar";

// const API_BASE_URL = "http://localhost:3000";

// const AdminFAQBoard = () => {
//   // State management
//   const [faqs, setFaqs] = useState([]);
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [editingFaq, setEditingFaq] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");

//   // Get admin token from localStorage
//   const getAdminToken = () => localStorage.getItem("adminToken");

//   // Fetch FAQs function
//   const fetchFAQs = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/faqs/fetchall`);
//       const data = await response.json();

//       if (response.ok) {
//         setFaqs(data);
//       } else {
//         setError(data.message || "Failed to fetch FAQs");
//       }
//     } catch (error) {
//       setError("Error connecting to the server");
//       console.error("Error fetching FAQs:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   // Initial fetch
//   useEffect(() => {
//     fetchFAQs();
//   }, [fetchFAQs]);

//   // Handle form submission (create/update)
//   const handleSubmit = async () => {
//     if (question.trim() === "" || answer.trim() === "") {
//       setError("Question and answer are required");
//       return;
//     }

//     setIsLoading(true);
//     const adminToken = getAdminToken();

//     try {
//       if (editingFaq) {
//         // Update existing FAQ
//         const response = await fetch(
//           `${API_BASE_URL}/api/admin/updatefaq/${editingFaq.id}`,
//           {
//             method: "PATCH",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${adminToken}`,
//             },
//             body: JSON.stringify({
//               question,
//               response: answer,
//             }),
//           }
//         );

//         const data = await response.json();

//         if (response.ok) {
//           setSuccessMessage("FAQ updated successfully");
//           await fetchFAQs();
//           resetForm();
//         } else {
//           setError(data.message || "Failed to update FAQ");
//         }
//       } else {
//         // Create new FAQ
//         const response = await fetch(`${API_BASE_URL}/api/admin/createfaq`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${adminToken}`,
//           },
//           body: JSON.stringify({
//             question,
//             response: answer,
//           }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setSuccessMessage("FAQ created successfully");
//           await fetchFAQs();
//           resetForm();
//         } else {
//           setError(data.message || "Failed to create FAQ");
//         }
//       }
//     } catch (error) {
//       setError("Error connecting to the server");
//       console.error("Error submitting FAQ:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle FAQ deletion
//   const handleDelete = async (faqId) => {
//     if (!window.confirm("Are you sure you want to delete this FAQ?")) {
//       return;
//     }

//     setIsLoading(true);
//     const adminToken = getAdminToken();

//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/api/admin/deletefaq/${faqId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${adminToken}`,
//           },
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage("FAQ deleted successfully");
//         await fetchFAQs();
//       } else {
//         setError(data.message || "Failed to delete FAQ");
//       }
//     } catch (error) {
//       setError("Error connecting to the server");
//       console.error("Error deleting FAQ:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle edit button click
//   const handleEdit = (faq) => {
//     setEditingFaq(faq);
//     setQuestion(faq.question);
//     setAnswer(faq.response);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Reset form
//   const resetForm = () => {
//     setQuestion("");
//     setAnswer("");
//     setEditingFaq(null);
//   };

//   // Clear error message
//   const handleCloseError = () => {
//     setError(null);
//   };

//   // Clear success message
//   const handleCloseSuccess = () => {
//     setSuccessMessage("");
//   };

//   return (
//     <>
//       <Navbar />
//       <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
//         <Typography variant="h4" sx={{ mb: 3 }}>
//           Admin FAQ Board
//         </Typography>

//         {/* Create/Edit Form */}
//         <Paper sx={{ p: 3, mb: 4 }}>
//           <Typography variant="h6">
//             {editingFaq ? "Edit FAQ" : "Create New FAQ"}
//           </Typography>
//           <TextField
//             label="Question"
//             variant="outlined"
//             fullWidth
//             sx={{ mt: 2, mb: 2 }}
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             disabled={isLoading}
//           />

//           <Typography variant="body1" sx={{ mb: 1 }}>
//             Answer
//           </Typography>
//           <Editor
//             apiKey="tcqb42dcxxho8wlaa0fpntlad563huxppvl6qc5k0os2zo07"
//             value={answer}
//             onEditorChange={(newContent) => setAnswer(newContent)}
//             init={{
//               height: 200,
//               menubar: true,
//               plugins: [
//                 "advlist",
//                 "autolink",
//                 "lists",
//                 "link",
//                 "image",
//                 "charmap",
//                 "preview",
//                 "anchor",
//                 "searchreplace",
//                 "visualblocks",
//                 "code",
//                 "fullscreen",
//                 "insertdatetime",
//                 "media",
//                 "table",
//                 "help",
//                 "wordcount",
//               ],
//               toolbar:
//                 "undo redo | formatselect | " +
//                 "bold italic backcolor | alignleft aligncenter " +
//                 "alignright alignjustify | bullist numlist outdent indent | " +
//                 "removeformat | help",
//               content_style:
//                 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; font-size: 14px; }',
//             }}
//             disabled={isLoading}
//           />

//           <Grid container spacing={2} sx={{ mt: 2 }}>
//             <Grid item xs={12} sm={6}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 onClick={handleSubmit}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <CircularProgress size={24} color="inherit" />
//                 ) : editingFaq ? (
//                   "Update FAQ"
//                 ) : (
//                   "Add FAQ"
//                 )}
//               </Button>
//             </Grid>
//             {editingFaq && (
//               <Grid item xs={12} sm={6}>
//                 <Button
//                   variant="outlined"
//                   color="secondary"
//                   fullWidth
//                   onClick={resetForm}
//                   disabled={isLoading}
//                 >
//                   Cancel Edit
//                 </Button>
//               </Grid>
//             )}
//           </Grid>
//         </Paper>

//         {/* FAQ List */}
//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Existing FAQs
//           </Typography>
          
//           {isLoading && !faqs.length ? (
//             <div style={{ textAlign: "center", padding: "20px" }}>
//               <CircularProgress />
//             </div>
//           ) : faqs.length === 0 ? (
//             <Typography color="textSecondary" align="center">
//               No FAQs available.
//             </Typography>
//           ) : (
//             <Grid container spacing={2}>
//               {faqs.map((faq) => (
//                 <Grid item xs={12} key={faq.id || faq._id}>
//                   <Paper
//                     sx={{
//                       p: 2,
//                       mb: 2,
//                       backgroundColor: "#f5f5f5",
//                       position: "relative",
//                     }}
//                     elevation={2}
//                   >
//                     <Typography variant="h6" gutterBottom>
//                       {faq.question}
//                     </Typography>
//                     <div
//                       dangerouslySetInnerHTML={{ __html: faq.response }}
//                       style={{ marginBottom: "10px" }}
//                     />
//                     <div style={{ position: "absolute", right: 8, top: 8 }}>
//                       <IconButton
//                         color="primary"
//                         onClick={() => handleEdit(faq)}
//                         disabled={isLoading}
//                         size="small"
//                       >
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDelete(faq.id || faq._id)}
//                         disabled={isLoading}
//                         size="small"
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </div>
//                   </Paper>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </Paper>

//         {/* Error Snackbar */}
//         <Snackbar
//           open={!!error}
//           autoHideDuration={6000}
//           onClose={handleCloseError}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         >
//           <Alert onClose={handleCloseError} severity="error">
//             {error}
//           </Alert>
//         </Snackbar>

//         {/* Success Snackbar */}
//         <Snackbar
//           open={!!successMessage}
//           autoHideDuration={6000}
//           onClose={handleCloseSuccess}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         >
//           <Alert onClose={handleCloseSuccess} severity="success">
//             {successMessage}
//           </Alert>
//         </Snackbar>
//       </Container>
//     </>
//   );
// };

// export default AdminFAQBoard;


import React, { useState, useEffect, useCallback } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { X, Edit, Trash2, Loader2 } from "lucide-react";
import Navbar from "./navbar";

const API_BASE_URL = "http://localhost:3000";

const AdminFAQBoard = () => {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editingFaq, setEditingFaq] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const getAdminToken = () => localStorage.getItem("adminToken");

  const fetchFAQs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/faqs/fetchall`);
      const data = await response.json();

      if (response.ok) {
        setFaqs(data);
      } else {
        setError(data.message || "Failed to fetch FAQs");
      }
    } catch (error) {
      setError("Error connecting to the server");
      console.error("Error fetching FAQs:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  const handleSubmit = async () => {
    if (question.trim() === "" || answer.trim() === "") {
      setError("Question and answer are required");
      return;
    }

    setIsLoading(true);
    const adminToken = getAdminToken();

    try {
      if (editingFaq) {
        const response = await fetch(
          `${API_BASE_URL}/api/admin/updatefaq/${editingFaq.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify({
              question,
              response: answer,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setSuccessMessage("FAQ updated successfully");
          await fetchFAQs();
          resetForm();
        } else {
          setError(data.message || "Failed to update FAQ");
        }
      } else {
        const response = await fetch(`${API_BASE_URL}/api/admin/createfaq`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({
            question,
            response: answer,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccessMessage("FAQ created successfully");
          await fetchFAQs();
          resetForm();
        } else {
          setError(data.message || "Failed to create FAQ");
        }
      }
    } catch (error) {
      setError("Error connecting to the server");
      console.error("Error submitting FAQ:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (faqId) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) {
      return;
    }

    setIsLoading(true);
    const adminToken = getAdminToken();

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/deletefaq/${faqId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("FAQ deleted successfully");
        await fetchFAQs();
      } else {
        setError(data.message || "Failed to delete FAQ");
      }
    } catch (error) {
      setError("Error connecting to the server");
      console.error("Error deleting FAQ:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.response);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setQuestion("");
    setAnswer("");
    setEditingFaq(null);
  };

  return (
    <>
      <Navbar></Navbar>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin FAQ Board</h1>

        {/* Create/Edit Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editingFaq ? "Edit FAQ" : "Create New FAQ"}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question
              </label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                placeholder="Enter your question"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Answer
              </label>
              <Editor
                apiKey="tcqb42dcxxho8wlaa0fpntlad563huxppvl6qc5k0os2zo07"
                value={answer}
                onEditorChange={(newContent) => setAnswer(newContent)}
                init={{
                  height: 200,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; font-size: 14px; }',
                }}
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <span>{editingFaq ? "Update FAQ" : "Add FAQ"}</span>
                )}
              </button>
              
              {editingFaq && (
                <button
                  onClick={resetForm}
                  disabled={isLoading}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Existing FAQs
          </h2>

          {isLoading && !faqs.length ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
            </div>
          ) : faqs.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No FAQs available.</p>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id || faq._id}
                  className="relative bg-gray-50 rounded-lg p-6 transition-shadow duration-200 hover:shadow-md"
                >
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(faq)}
                      disabled={isLoading}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id || faq._id)}
                      disabled={isLoading}
                      className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mb-2 pr-20">
                    {faq.question}
                  </h3>
                  <div
                    className="prose prose-sm max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: faq.response }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Toast Messages */}
        {error && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-4 text-red-700 hover:text-red-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {successMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md flex items-center justify-between">
            <span>{successMessage}</span>
            <button
              onClick={() => setSuccessMessage("")}
              className="ml-4 text-green-700 hover:text-green-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
    </>
    
  );
};

export default AdminFAQBoard;