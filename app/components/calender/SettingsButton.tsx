"use client";
import { useState } from "react";
import { SettingsButtonWithModal } from "@/components/settings-button-with-modal";

function SettingsButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <SettingsButtonWithModal />
    </div>
  );
}

export default SettingsButton;
