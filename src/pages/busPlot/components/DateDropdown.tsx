import React, { useState, useRef, useEffect } from "react";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const DateDropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "옵션을 선택하세요",
  value,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    onChange?.(optionValue);
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  return (
    <div
      style={{ position: "relative", width: "150px", margin: "10px" }}
      ref={dropdownRef}
    >
      {/* 드롭다운 버튼 */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        style={{
          width: "100%",
          padding: "12px 16px",
          textAlign: "left",
          backgroundColor: disabled ? "#f5f5f5" : "#ffffff",
          border: `2px solid ${isOpen ? "#007bff" : "#ddd"}`,
          borderRadius: "8px",
          fontSize: "14px",
          color: disabled ? "#999" : selectedOption ? "#333" : "#666",
          cursor: disabled ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          outline: "none",
          transition: "all 0.2s ease",
          boxShadow: isOpen ? "0 0 0 3px rgba(0, 123, 255, 0.25)" : "none",
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.borderColor = "#007bff";
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && !isOpen) {
            e.currentTarget.style.borderColor = "#ddd";
          }
        }}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span
          style={{
            display: "inline-block",
            width: "0",
            height: "0",
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "5px solid #666",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            marginLeft: "8px",
          }}
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            right: "0",
            marginTop: "4px",
            backgroundColor: "#ffffff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {options.length === 0 ? (
            <div
              style={{
                padding: "12px 16px",
                color: "#999",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              옵션이 없습니다
            </div>
          ) : (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  textAlign: "left",
                  backgroundColor:
                    selectedValue === option.value ? "#f0f8ff" : "transparent",
                  border: "none",
                  fontSize: "14px",
                  color: selectedValue === option.value ? "#007bff" : "#333",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "background-color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    selectedValue === option.value ? "#e6f3ff" : "#f5f5f5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    selectedValue === option.value ? "#f0f8ff" : "transparent";
                }}
              >
                <span>{option.label}</span>
                {selectedValue === option.value && (
                  <span style={{ color: "#007bff", fontWeight: "bold" }}>
                    ✓
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DateDropdown;
