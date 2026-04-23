import { Plus, CreditCard as Edit, Trash2, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  getAllForms,
  createForm,
  activateForm,
  deleteForm,
  Form,
} from '../lib/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Toast } from '../components/ui/Toast';
import { useToast } from '../hooks/useToast';

export function FormManagement() {
  const { setCurrentPage, isAdmin } = useApp();
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
  });

  const [newForm, setNewForm] = useState({
    form_name: '',
    form_slug: '',
    description: '',
    base_amount: 0,
    enable_kkc_discount: false,
    kkc_discount_amount: 0,
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-login');
      return;
    }
    fetchForms();
  }, [isAdmin, navigate]);

  const fetchForms = async () => {
    try {
      const data = await getAllForms();
      setForms(data);
    } catch (err) {
      console.error('Failed to fetch forms', err);
      showToast('Failed to fetch forms', 'error');
    }
  };

  const handleCreateForm = async () => {
    if (!newForm.form_name || !newForm.form_slug || !newForm.base_amount) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      const result = await createForm({
        ...newForm,
        status: 'draft',
      });

      if (result.success) {
        showToast('Form created successfully', 'success');
        setShowCreateModal(false);
        setNewForm({
          form_name: '',
          form_slug: '',
          description: '',
          base_amount: 0,
          enable_kkc_discount: false,
          kkc_discount_amount: 0,
          start_date: '',
          end_date: '',
        });
        fetchForms();
      } else {
        showToast('Failed to create form', 'error');
      }
    } catch (err) {
      console.error('Error creating form', err);
      showToast('Failed to create form', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleActivateForm = async (id: number) => {
    try {
      const result = await activateForm(id);
      if (result.success) {
        showToast('Form activated successfully', 'success');
        fetchForms();
      } else {
        showToast('Failed to activate form', 'error');
      }
    } catch (err) {
      console.error('Error activating form', err);
      showToast('Failed to activate form', 'error');
    }
  };

  const handleDeleteForm = async (id: number) => {
    if (!confirm('Are you sure you want to delete this form? This action cannot be undone.')) return;

    try {
      const result = await deleteForm(id);
      if (result.success) {
        showToast('Form deleted successfully', 'success');
        fetchForms();
      } else {
        showToast('Failed to delete form', 'error');
      }
    } catch (err) {
      console.error('Error deleting form', err);
      showToast('Failed to delete form', 'error');
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-24">
      {toast.isOpen && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Form <span className="text-amber-500">Management</span>
            </h1>
            <p className="text-gray-400">Create and manage dynamic registration forms</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2"
            >
              <Plus size={20} />
              Create Form
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/admin-dashboard')}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {forms.map((form) => (
            <Card key={form.id} hover className={form.is_active ? 'border-2 border-amber-500' : ''}>
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-white">{form.form_name}</h3>
                    {form.is_active && (
                      <span className="px-3 py-1 bg-amber-500/20 text-amber-500 text-sm font-semibold rounded-full flex items-center gap-1">
                        <CheckCircle size={16} />
                        Active
                      </span>
                    )}
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      form.status === 'active' ? 'bg-green-500/20 text-green-500' :
                      form.status === 'draft' ? 'bg-gray-500/20 text-gray-400' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {form.status}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-3">{form.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Base Amount</p>
                      <p className="text-white font-semibold">₹{form.base_amount}</p>
                    </div>
                    {form.enable_kkc_discount && (
                      <div>
                        <p className="text-gray-500">KKC Discount</p>
                        <p className="text-green-500 font-semibold">₹{form.kkc_discount_amount}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-500">Start Date</p>
                      <p className="text-white">{form.start_date ? new Date(form.start_date).toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">End Date</p>
                      <p className="text-white">{form.end_date ? new Date(form.end_date).toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full md:w-auto">
                  {!form.is_active && (
                    <Button
                      size="sm"
                      onClick={() => handleActivateForm(form.id)}
                      className="flex items-center gap-2"
                    >
                      <Eye size={16} />
                      Activate
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      // Navigate to field editor
                      setCurrentPage('form-fields-editor');
                      sessionStorage.setItem('current_form_id', form.id.toString());
                    }}
                    className="flex items-center gap-2"
                  >
                    <Edit size={16} />
                    Edit Fields
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500 flex items-center gap-2"
                    onClick={() => handleDeleteForm(form.id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {forms.length === 0 && (
            <Card className="text-center py-12">
              <p className="text-gray-400 mb-4">No forms created yet</p>
              <Button onClick={() => setShowCreateModal(true)}>
                Create Your First Form
              </Button>
            </Card>
          )}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Form</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Form Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newForm.form_name}
                  onChange={(e) => {
                    setNewForm({
                      ...newForm,
                      form_name: e.target.value,
                      form_slug: generateSlug(e.target.value),
                    });
                  }}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  placeholder="e.g., Summer Workshop 2026"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Form Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newForm.form_slug}
                  onChange={(e) => setNewForm({ ...newForm, form_slug: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  placeholder="summer-workshop-2026"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newForm.description}
                  onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  placeholder="Brief description of the form"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Base Amount (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={newForm.base_amount}
                  onChange={(e) => setNewForm({ ...newForm, base_amount: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  placeholder="499"
                />
              </div>

              <div className="border-t border-gray-700 pt-4">
                <label className="flex items-center gap-3 cursor-pointer mb-4">
                  <input
                    type="checkbox"
                    checked={newForm.enable_kkc_discount}
                    onChange={(e) => setNewForm({ ...newForm, enable_kkc_discount: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span className="text-white">Enable KKC Member Discount</span>
                </label>

                {newForm.enable_kkc_discount && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Discount Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={newForm.kkc_discount_amount}
                      onChange={(e) => setNewForm({ ...newForm, kkc_discount_amount: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                      placeholder="500"
                    />
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="datetime-local"
                    value={newForm.start_date}
                    onChange={(e) => setNewForm({ ...newForm, start_date: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    value={newForm.end_date}
                    onChange={(e) => setNewForm({ ...newForm, end_date: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleCreateForm}
                isLoading={loading}
                className="flex-1"
              >
                Create Form
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
