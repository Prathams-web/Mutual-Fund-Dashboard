"use client";
import { useState } from "react";
import FundsModal from "./FundsModal";

interface FundsActionsProps {
  fundId: number;
  fundName: string;
}

export default function FundsActions({ fundId, fundName }: FundsActionsProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState<"Invest" | "Switch" | "Redeem" | null>(null);

  const openModal = (type: "Invest" | "Switch" | "Redeem") => {
    setActionType(type);
    setModalVisible(true);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <button onClick={() => openModal("Invest")} className="px-2 py-1 bg-green-500 text-white rounded text-xs">
        Invest
      </button>
      <button onClick={() => openModal("Switch")} className="px-2 py-1 bg-blue-500 text-white rounded text-xs">
        Switch
      </button>
      <button onClick={() => openModal("Redeem")} className="px-2 py-1 bg-red-500 text-white rounded text-xs">
        Redeem
      </button>

      <FundsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        actionType={actionType}
        fundName={fundName}
      />
    </div>
  );
}
