"use client";
import { Modal, Input, message } from "antd";
import { useState } from "react";

interface FundsModalProps {
  visible: boolean;
  onClose: () => void;
  actionType: "Invest" | "Switch" | "Redeem" | null;
  fundName?: string;
}

// optional global suppression

export default function FundsModal({
    visible,
    onClose,
    actionType,
    fundName,
}: FundsModalProps) {
    const [messageApi, contextHolder] = message.useMessage();
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    // temporarily disable compatibility warnings
    console.warn = () => {};
    messageApi.success(`${actionType} successful for ${fundName}!`);
    setAmount("");
    onClose();
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={`${actionType} — ${fundName}`}
        open={visible}
        onCancel={onClose}
        onOk={handleSubmit}
        okText={actionType}
        centered
      >
        {actionType === "Redeem" ? (
          <p>
            Are you sure you want to redeem your investment from{" "}
            <b>{fundName}</b>?
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            <p>Enter the amount you want to {actionType?.toLowerCase()}:</p>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        )}
      </Modal>
    </>
  );
}
