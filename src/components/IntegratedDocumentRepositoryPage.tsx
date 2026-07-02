
import React, { useState, useMemo } from 'react';
import { Trash2, ArrowUp, ArrowDown, File, Pencil, Eye, UploadCloud, Download, X } from 'lucide-react';

// Define the type for a document
interface Document {
  id: number;
  name: string;
  category: 'Business' | 'Personal';
  type: 'GST Return' | 'Invoice' | 'Registration Form' | 'PAN Card' | 'Legal Document';
  returnPeriod: '1 Month' | '3 Months' | 'Yearly' | 'N/A';
  file: File | null;
}

type SortableColumns = 'name' | 'type' | 'returnPeriod';

const IntegratedDocumentRepositoryPage: React.FC = () => {
  // State for documents, form inputs, filter, and search
  const [documents, setDocuments] = useState<Document[]>([]);
  const [docName, setDocName] = useState('');
  const [docCategory, setDocCategory] = useState<'Business' | 'Personal'>('Business');
  const [docType, setDocType] = useState<'GST Return' | 'Invoice' | 'Registration Form' | 'PAN Card' | 'Legal Document'>('GST Return');
  const [returnPeriod, setReturnPeriod] = useState<'1 Month' | '3 Months' | 'Yearly' | 'N/A'>('1 Month');
  const [docFile, setDocFile] = useState<File | null>(null);
  const [filterPeriod, setFilterPeriod] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<SortableColumns>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocFile(e.target.files[0]);
    }
  };

  // Handle adding or updating a document
  const handleSaveDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    if (editingDocument) {
      // Update existing document
      setDocuments(documents.map(doc => 
        doc.id === editingDocument.id 
          ? { ...doc, name: docName, category: docCategory, type: docType, returnPeriod: returnPeriod, file: docFile }
          : doc
      ));
    } else {
      // Add new document
      const newDocument: Document = {
        id: Date.now(),
        name: docName,
        category: docCategory,
        type: docType,
        returnPeriod: returnPeriod,
        file: docFile,
      };
      setDocuments([newDocument, ...documents]);
    }

    // Reset form and close modal
    setDocName('');
    setDocCategory('Business');
    setDocType('GST Return');
    setReturnPeriod('1 Month');
    setDocFile(null);
    setIsEditModalOpen(false);
    setEditingDocument(null);
  };

  // Handle deleting a document
  const handleDeleteDocument = (id: number) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  const handleSort = (column: SortableColumns) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Open modal for editing
  const handleEdit = (doc: Document) => {
    setEditingDocument(doc);
    setDocName(doc.name);
    setDocCategory(doc.category);
    setDocType(doc.type);
    setReturnPeriod(doc.returnPeriod);
    setDocFile(doc.file);
    setIsEditModalOpen(true);
  };

  // Open modal for viewing
  const handleView = (doc: Document) => {
    setViewingDocument(doc);
    setIsViewModalOpen(true);
  };
  
  const handleExport = () => {
    const header = ['ID', 'Name', 'Category', 'Type', 'Return Period', 'File Name'];
    const csv = [
      header.join(','),
      ...documents.map(doc => 
        [doc.id, doc.name, doc.category, doc.type, doc.returnPeriod, doc.file?.name || 'N/A'].join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documents.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Filter and search logic for business documents
  const filteredBusinessDocuments = useMemo(() => {
    return documents
      .filter(doc => doc.category === 'Business')
      .filter(doc => {
        if (filterPeriod === 'All') return true;
        return doc.returnPeriod === filterPeriod;
      })
      .filter(doc => {
        return doc.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue < bValue) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
  }, [documents, filterPeriod, searchTerm, sortColumn, sortDirection]);
  
    // Filter and search logic for personal documents
  const filteredPersonalDocuments = useMemo(() => {
    return documents
      .filter(doc => doc.category === 'Personal')
      .filter(doc => {
        return doc.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue < bValue) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
  }, [documents, searchTerm, sortColumn, sortDirection]);


  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Integrated Document Repository</h1>

      {/* Add Document Button */}
      <div className="mb-8">
        <button
            onClick={() => { setEditingDocument(null); setIsEditModalOpen(true); }}
            className="w-full md:w-auto bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center shadow-lg"
          >
            <UploadCloud size={20} className="mr-2"/>
            Add New Document
        </button>
      </div>

      {/* Modal for Add/Edit Document */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl transform transition-all">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">{editingDocument ? 'Edit Document' : 'Add New Document'}</h2>
              <form onSubmit={handleSaveDocument} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="docName" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Document Name</label>
                    <input
                      id="docName"
                      type="text"
                      value={docName}
                      onChange={(e) => setDocName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="e.g., GSTR-3B April"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="docCategory" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Category</label>
                    <select
                      id="docCategory"
                      value={docCategory}
                      onChange={(e) => setDocCategory(e.target.value as any)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option>Business</option>
                      <option>Personal</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="docType" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Document Type</label>
                    <select
                      id="docType"
                      value={docType}
                      onChange={(e) => setDocType(e.target.value as any)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      {docCategory === 'Business' ? (
                        <>
                          <option>GST Return</option>
                          <option>Invoice</option>
                          <option>Registration Form</option>
                        </>
                      ) : (
                        <>
                          <option>PAN Card</option>
                          <option>Legal Document</option>
                        </>
                      )}
                    </select>
                  </div>
                  {docCategory === 'Business' && (
                    <div>
                      <label htmlFor="returnPeriod" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Return Period</label>
                      <select
                        id="returnPeriod"
                        value={returnPeriod}
                        onChange={(e) => setReturnPeriod(e.target.value as any)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option>1 Month</option>
                        <option>3 Months</option>
                        <option>Yearly</option>
                        <option>N/A</option>
                      </select>
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <label htmlFor="docFile" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Upload File</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <File size={40} className="mx-auto text-gray-400" />
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                          <label htmlFor="docFile" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload a file</span>
                            <input id="docFile" name="docFile" type="file" className="sr-only" onChange={handleFileChange} />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, PDF up to 10MB</p>
                        {docFile && <p className="text-sm text-green-500">{docFile.name}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                    >
                      Cancel
                    </button>
                     <button
                      type="submit"
                      className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {editingDocument ? 'Save Changes' : 'Add Document'}
                    </button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal for Viewing Document */}
      {isViewModalOpen && viewingDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg transform transition-all">
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Document Details</h2>
                    <button onClick={() => setIsViewModalOpen(false)} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="mt-4 space-y-4 text-gray-700 dark:text-gray-300">
                    <p><strong>Name:</strong> {viewingDocument.name}</p>
                    <p><strong>Category:</strong> {viewingDocument.category}</p>
                    <p><strong>Type:</strong> {viewingDocument.type}</p>
                    {viewingDocument.category === 'Business' && <p><strong>Return Period:</strong> {viewingDocument.returnPeriod}</p>}
                    <p><strong>File:</strong> {viewingDocument.file ? viewingDocument.file.name : 'No file uploaded'}</p>
                </div>
            </div>
          </div>
        </div>
      )}


      {/* Filter and Search */}
       <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <label htmlFor="filterPeriod" className="text-sm font-medium text-gray-600 dark:text-gray-300">Filter:</label>
          <select
            id="filterPeriod"
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="All">All Periods</option>
            <option>1 Month</option>
            <option>3 Months</option>
            <option>Yearly</option>
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Search by name..."
          />
        </div>
        <button
            onClick={handleExport}
            className="w-full md:w-auto bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center"
        >
            <Download size={18} className="mr-2" />
            Export as CSV
        </button>
      </div>

      {/* Business Documents List */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Business Documents</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    <button onClick={() => handleSort('name')} className="flex items-center">
                      Document Name
                      {sortColumn === 'name' && (sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    <button onClick={() => handleSort('type')} className="flex items-center">
                      Type
                      {sortColumn === 'type' && (sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    <button onClick={() => handleSort('returnPeriod')} className="flex items-center">
                      Return Period
                      {sortColumn === 'returnPeriod' && (sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    File
                  </th>
                  <th scope="col" className="relative px-6 py-3 text-right">
                     <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {filteredBusinessDocuments.length > 0 ? (
                  filteredBusinessDocuments.map(doc => (
                    <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 animate-fade-in">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{doc.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{doc.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{doc.returnPeriod}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {doc.file ? doc.file.name : 'No file'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end items-center space-x-3">
                           <button onClick={() => handleView(doc)} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
                              <Eye size={18} className="mr-1" /> View
                           </button>
                           <button onClick={() => handleEdit(doc)} className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 flex items-center">
                              <Pencil size={18} className="mr-1"/> Edit
                           </button>
                           <button onClick={() => handleDeleteDocument(doc.id)} className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 flex items-center">
                              <Trash2 size={18} className="mr-1" /> Delete
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 dark:text-gray-400 py-8">
                      {documents.filter(d => d.category === 'Business').length === 0 ? "No business documents yet. Add one to get started." : "No documents match your filter/search criteria."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
      </div>
      
      {/* Personal Documents List */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Personal Documents</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    <button onClick={() => handleSort('name')} className="flex items-center">
                      Document Name
                      {sortColumn === 'name' && (sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    <button onClick={() => handleSort('type')} className="flex items-center">
                      Type
                      {sortColumn === 'type' && (sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />)}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    File
                  </th>
                  <th scope="col" className="relative px-6 py-3 text-right">
                     <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {filteredPersonalDocuments.length > 0 ? (
                  filteredPersonalDocuments.map(doc => (
                    <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 animate-fade-in">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{doc.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{doc.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {doc.file ? doc.file.name : 'No file'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end items-center space-x-3">
                           <button onClick={() => handleView(doc)} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
                              <Eye size={18} className="mr-1" /> View
                           </button>
                           <button onClick={() => handleEdit(doc)} className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 flex items-center">
                              <Pencil size={18} className="mr-1"/> Edit
                           </button>
                           <button onClick={() => handleDeleteDocument(doc.id)} className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 flex items-center">
                              <Trash2 size={18} className="mr-1" /> Delete
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-500 dark:text-gray-400 py-8">
                      {documents.filter(d => d.category === 'Personal').length === 0 ? "No personal documents yet. Add one to get started." : "No documents match your search criteria."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
};

export default IntegratedDocumentRepositoryPage;

// Simple fade-in animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
`;
document.head.appendChild(style);
