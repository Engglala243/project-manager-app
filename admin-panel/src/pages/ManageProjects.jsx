"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PencilIcon, TrashIcon, PhotoIcon } from "@heroicons/react/24/outline";
import {
  createProject,
  updateProject,
  deleteProject,
  fetchProjects,
  clearError,
} from "../store/slices/projectsSlice";
import LoadingSpinner from "../components/Layout/common/LoadingSpinner";
import { useToast } from "../hooks/useToast";

const ManageProjects = () => {
  const dispatch = useDispatch();
  const {
    items: projects,
    loading,
    createLoading,
    updateLoading,
    deleteLoading,
    error,
  } = useSelector((state) => state.projects);

  const { success, error: showError } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
  });

  const [editingProject, setEditingProject] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
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
      // For demo purposes, we'll use a placeholder URL
      // In real app, you'd upload to a service and get the URL
      setFormData((prev) => ({
        ...prev,
        image_url: `https://example.com/uploads/${file.name}`,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description) {
      showError("Please fill in all required fields");
      return;
    }

    try {
      if (editingProject) {
        await dispatch(
          updateProject({
            id: editingProject.id,
            projectData: formData,
          })
        ).unwrap();
        success("Project updated successfully!");
        setEditingProject(null);
      } else {
        await dispatch(createProject(formData)).unwrap();
        success("Project created successfully!");
      }

      setFormData({ name: "", description: "", image_url: "" });
      setImageFile(null);
    } catch (error) {
      showError(error || "Operation failed");
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      image_url: project.image_url || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setFormData({ name: "", description: "", image_url: "" });
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await dispatch(deleteProject(id)).unwrap();
        success("Project deleted successfully!");
      } catch (error) {
        showError(error || "Failed to delete project");
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
        <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
        <p className="text-gray-600">Add and manage your projects</p>
      </div>

      {/* Add/Edit Project Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {editingProject ? "Edit Project" : "Add New Project"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter project name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter project description"
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
              Upload Project Image
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
              {editingProject ? "Update Project" : "Add Project"}
            </button>

            {editingProject && (
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

      {/* Projects Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            All Projects ({projects.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={
                        project.image_url ||
                        "/placeholder.svg?height=50&width=50"
                      }
                      alt={project.name}
                      className="h-12 w-12 rounded-lg object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=50&width=50";
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {project.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {project.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(project.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="text-indigo-600 hover:text-indigo-900"
                        disabled={updateLoading}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <TrashIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {projects.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProjects;
