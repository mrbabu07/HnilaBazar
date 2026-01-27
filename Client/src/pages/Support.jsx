import { useState, useEffect } from "react";
import {
  MessageSquare,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react";
import { toast } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Input from "../components/Input";
import Loading from "../components/Loading";

const Support = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [createForm, setCreateForm] = useState({
    subject: "",
    description: "",
    priority: "medium",
    category: "general",
  });

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "order", label: "Order Issue" },
    { value: "payment", label: "Payment Problem" },
    { value: "product", label: "Product Question" },
    { value: "shipping", label: "Shipping Issue" },
    { value: "return", label: "Return/Refund" },
    { value: "technical", label: "Technical Support" },
  ];

  const priorities = [
    { value: "low", label: "Low", color: "bg-blue-100 text-blue-800" },
    {
      value: "medium",
      label: "Medium",
      color: "bg-yellow-100 text-yellow-800",
    },
    { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
    { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-800" },
  ];

  const statuses = [
    {
      value: "open",
      label: "Open",
      color: "bg-red-100 text-red-800",
      icon: AlertCircle,
    },
    {
      value: "in_progress",
      label: "In Progress",
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
    },
    {
      value: "resolved",
      label: "Resolved",
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
    },
    {
      value: "closed",
      label: "Closed",
      color: "bg-gray-100 text-gray-800",
      icon: CheckCircle,
    },
  ];

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/support/tickets/my-tickets`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setTickets(data.tickets);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast.error("Failed to fetch support tickets");
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async () => {
    if (!createForm.subject.trim() || !createForm.description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const token = await user.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/support/tickets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(createForm),
        },
      );

      if (response.ok) {
        toast.success("Support ticket created successfully");
        setShowCreateModal(false);
        setCreateForm({
          subject: "",
          description: "",
          priority: "medium",
          category: "general",
        });
        fetchTickets();
      } else {
        toast.error("Failed to create support ticket");
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.error("Failed to create support ticket");
    }
  };

  const addMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const token = await user.getIdToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/support/tickets/${selectedTicket._id}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: newMessage }),
        },
      );

      if (response.ok) {
        toast.success("Message sent successfully");
        setNewMessage("");
        // Refresh tickets to get updated messages
        fetchTickets();
        // Update selected ticket
        const updatedTicket = tickets.find((t) => t._id === selectedTicket._id);
        if (updatedTicket) {
          setSelectedTicket(updatedTicket);
        }
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  const getStatusInfo = (status) => {
    return statuses.find((s) => s.value === status) || statuses[0];
  };

  const getPriorityColor = (priority) => {
    const priorityObj = priorities.find((p) => p.value === priority);
    return priorityObj?.color || "bg-gray-100 text-gray-800";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please Sign In
          </h2>
          <p className="text-gray-600">
            You need to be signed in to access support tickets.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Support Center
              </h1>
              <p className="text-gray-600 mt-2">
                Get help with your orders and account
              </p>
            </div>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </div>

        {/* Tickets List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No support tickets yet
              </h3>
              <p className="text-gray-600 mb-4">
                Create your first support ticket to get help from our team.
              </p>
              <Button onClick={() => setShowCreateModal(true)}>
                Create Support Ticket
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tickets.map((ticket) => {
                    const statusInfo = getStatusInfo(ticket.status);
                    const StatusIcon = statusInfo.icon;
                    return (
                      <tr key={ticket._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {ticket.ticketId}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {ticket.subject}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}
                          >
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(ticket.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(ticket.updatedAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setShowTicketModal(true);
                            }}
                            variant="outline"
                            size="sm"
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Create Ticket Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Create Support Ticket"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <Input
                type="text"
                placeholder="Brief description of your issue"
                value={createForm.subject}
                onChange={(e) =>
                  setCreateForm({ ...createForm, subject: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={createForm.category}
                onChange={(e) =>
                  setCreateForm({ ...createForm, category: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={createForm.priority}
                onChange={(e) =>
                  setCreateForm({ ...createForm, priority: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {priorities.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                rows={4}
                placeholder="Please provide detailed information about your issue"
                value={createForm.description}
                onChange={(e) =>
                  setCreateForm({ ...createForm, description: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                onClick={() => setShowCreateModal(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={createTicket}>Create Ticket</Button>
            </div>
          </div>
        </Modal>

        {/* Ticket Details Modal */}
        <Modal
          isOpen={showTicketModal}
          onClose={() => setShowTicketModal(false)}
          title={`Ticket ${selectedTicket?.ticketId}`}
          size="lg"
        >
          {selectedTicket && (
            <div className="space-y-6">
              {/* Ticket Header */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedTicket.subject}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedTicket.description}
                </p>
                <div className="flex items-center space-x-4 mt-3">
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusInfo(selectedTicket.status).color}`}
                  >
                    {getStatusInfo(selectedTicket.status).label}
                  </span>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedTicket.priority)}`}
                  >
                    {selectedTicket.priority} priority
                  </span>
                  <span className="text-xs text-gray-500">
                    Created {formatDate(selectedTicket.createdAt)}
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Conversation</h4>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {selectedTicket.messages?.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.senderType === "customer" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderType === "customer"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <div className="text-sm font-medium mb-1">
                          {message.senderName} (
                          {message.senderType === "customer"
                            ? "You"
                            : "Support"}
                          )
                        </div>
                        <div className="text-sm">{message.message}</div>
                        <div className="text-xs mt-1 opacity-75">
                          {formatDate(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply (only if ticket is not closed) */}
              {selectedTicket.status !== "closed" && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Add Message
                  </h4>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addMessage()}
                      className="flex-1"
                    />
                    <Button onClick={addMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Support;
