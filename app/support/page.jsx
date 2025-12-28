"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Tag,
  Spin,
  Input,
  Button,
  message as antdMessage,
  Modal,
} from "antd";
import Navbar from "../components/Navbar";
import { useTheme } from "next-themes";

export default function SupportPage() {
  const [messageApi, contextHolder] = antdMessage.useMessage();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalTicketId, setModalTicketId] = useState(null);

  // Fetch tickets from public folder
  useEffect(() => {
    fetch("/dummy/support.json")
      .then((res) => res.json())
      .then((data) => {
        // Add editableAI field for editing draft reply
        const enriched = data.map((t) => ({ ...t, editableAI: t.aiDraft }));
        setTickets(enriched);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  if (loading)
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          isDark ? "bg-[#0B0F1A]" : "bg-gray-100"
        }`}
      >
        <Spin size="large" />
      </div>
    );

  const priorityColorMap = {
    "LOW PRIORITY": "green",
    "MEDIUM PRIORITY": "orange",
    "HIGH PRIORITY": "red",
  };

  const handleApprove = (ticketId, text) => {
    // In real app, send to API
    messageApi.success(`AI response approved/sent for ${ticketId}`);
    setModalOpen(false);
  };

  const handleEdit = (ticketId, text) => {
    setModalTicketId(ticketId);
    setModalText(text);
    setModalOpen(true);
  };

  const handleModalOk = () => {
    setTickets((prev) =>
      prev.map((t) =>
        t.ticketId === modalTicketId ? { ...t, editableAI: modalText } : t
      )
    );
    handleApprove(modalTicketId, modalText);
  };

  const handleModalCancel = () => {
    setModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Navbar user={user} />
      <div
        className={`${
          isDark ? "bg-[#0B0F1A]" : "bg-gray-50"
        } min-h-screen px-8 py-10`}
      >
        <div className="mb-8">
          <h1
            className={
              isDark
                ? "text-3xl font-bold text-white"
                : "text-3xl font-bold text-gray-900"
            }
          >
            Customer Support
          </h1>
          <p className={isDark ? "text-gray-400 mt-1" : "text-gray-600 mt-1"}>
            AI-prioritized tickets with draft replies. Edit or approve/send AI
            response.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <Card
              key={ticket.ticketId}
              className={`rounded-xl p-6 shadow-md transition ${
                isDark
                  ? "bg-[#12172A] border border-white/10"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className={
                    isDark
                      ? "text-gray-300 font-semibold"
                      : "text-gray-800 font-semibold"
                  }
                >
                  {ticket.ticketId}
                </span>
                <Tag color={priorityColorMap[ticket.priority]}>
                  {ticket.priority}
                </Tag>
              </div>

              <div className="mb-1">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  LTV:{" "}
                </span>
                <span
                  className={
                    isDark
                      ? "text-white font-medium"
                      : "text-gray-800 font-medium"
                  }
                >
                  ${ticket.ltv}
                </span>
              </div>

              <div className="mb-1">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Subject:{" "}
                </span>
                <span
                  className={
                    isDark
                      ? "text-white font-medium"
                      : "text-gray-800 font-medium"
                  }
                >
                  {ticket.subject}
                </span>
              </div>

              <div className="mb-1">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Customer:{" "}
                </span>
                <span
                  className={
                    isDark
                      ? "text-white font-medium"
                      : "text-gray-800 font-medium"
                  }
                >
                  {ticket.customer}
                </span>
                <span
                  className={
                    isDark ? "text-gray-400 ml-1" : "text-gray-600 ml-1"
                  }
                >
                  • {ticket.email}
                </span>
              </div>

              <div className="mb-2">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Date:{" "}
                </span>
                <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                  {ticket.date}
                </span>
              </div>

              <div className="mb-4">
                <span
                  className={
                    isDark ? "text-gray-400" : "text-gray-600 font-semibold"
                  }
                >
                  AI-Generated Draft Reply:
                </span>

                <div
                  className={`rounded-xl flex flex-col gap-4 transition-all`}
                >
                  {/* AI Reply Box */}
                  <pre
                    className={`w-full p-3 rounded-lg border ${
                      isDark
                        ? "bg-[#12172A] text-gray-200 border-gray-600"
                        : "bg-white text-gray-800 border-gray-300"
                    } font-mono text-sm whitespace-pre-wrap break-words`}
                    style={{ minHeight: "100px" }}
                  >
                    {ticket.editableAI}
                  </pre>

                  {/* Action Buttons */}
                  <div className="flex gap-2 justify-end flex-wrap">
                    <Button
                      onClick={() =>
                        handleEdit(ticket.ticketId, ticket.editableAI)
                      }
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition"
                    >
                      Edit & Send
                    </Button>
                    <Button
                      type="primary"
                      onClick={() =>
                        handleApprove(ticket.ticketId, ticket.editableAI)
                      }
                      className="bg-green-500 hover:bg-green-600 text-white font-medium transition"
                    >
                      Approve & Send
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Modal
          title="Edit AI Draft Reply"
          open={modalOpen}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText="Approve & Send"
          cancelText="Cancel"
        >
          <Input.TextArea
            value={modalText}
            onChange={(e) => setModalText(e.target.value)}
            rows={6}
          />
        </Modal>
      </div>
    </>
  );
}
