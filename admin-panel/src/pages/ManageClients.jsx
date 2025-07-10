"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PencilIcon, TrashIcon, PhotoIcon } from "@heroicons/react/24/outline";
import {
  createClient,
  updateClient,
  deleteClient,
  fetchClients,
  clearError,
} from "../store/slices/clientsSlice";
import LoadingSpinner from "../components/Layout/common/LoadingSpinner";
import { useToast } from "../hooks/useToast";

const ManageClients = () => {
  const dispatch = useDispatch();
  const {
    items: clients,
    loading,
    createLoading,
    updateLoading,
    deleteLoading,
    error,
  } = useSelector((state) => state.clients);

  const { success, error: showError } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
    image_url: "",
  });

  const [editingClient, setEditingClient] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      showError(error);
      dispatch(clearError());
    }
  }, [error, showError, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData((prev) => ({
        ...prev,
        image_url: `https://example.com/uploads/${file.name}`,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.designation || !formData.description) {
      showError("Please fill in all required fields");
      return;
    }

    try {
      if (editingClient) {
        await dispatch(
          updateClient({
            id: editingClient.id,
            clientData: formData,
          })
        ).unwrap();
        success("Client updated successfully!");
        setEditingClient(null);
      } else {
        await dispatch(createClient(formData)).unwrap();
        success("Client created successfully!");
      }

      setFormData({
        name: "",
        designation: "",
        description: "",
        image_url: "",
      });
      setImageFile(null);
    } catch (error) {
      showError(error || "Operation failed");
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      designation: client.designation,
      description: client.description,
      image_url: client.image_url || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingClient(null);
    setFormData({ name: "", designation: "", description: "", image_url: "" });
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await dispatch(deleteClient(id)).unwrap();
        success("Client deleted successfully!");
      } catch (error) {
        showError(error || "Failed to delete client");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
        <p className="text-gray-600">Add and manage your clients</p>
      </div>

      {/* Add/Edit Client Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {editingClient ? "Edit Client" : "Add New Client"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter client name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Designation *
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., CEO, Web Developer, Designer"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter client description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter image URL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Client Image
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                <PhotoIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Choose File</span>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
              {imageFile && (
                <span className="text-sm text-gray-600">{imageFile.name}</span>
              )}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={createLoading || updateLoading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {(createLoading || updateLoading) && (
                <LoadingSpinner size="sm" className="mr-2" />
              )}
              {editingClient ? "Update Client" : "Add Client"}
            </button>

            {editingClient && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Clients Grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            All Clients ({clients.length})
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={
                    client.image_url || "/placeholder.svg?height=64&width=64"
                  }
                  alt={client.name}
                  className="h-16 w-16 rounded-full object-cover mr-4"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=64&width=64";
                  }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {client.name}
                  </h3>
                  <p className="text-sm text-indigo-600">
                    {client.designation}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {client.description}
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(client)}
                  className="text-indigo-600 hover:text-indigo-900 p-1"
                  disabled={updateLoading}
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="text-red-600 hover:text-red-900 p-1 disabled:opacity-50"
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <TrashIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {clients.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No clients found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageClients;
