import { LoadingIndicator, IndicatorIconType } from "@/types";
import { motion } from "framer-motion";
import { Brain, FileStack, FileSearch, Scan, AlertCircle } from "lucide-react";

/**
 * This file contains the Loading component which is used to display
 * loading indicators during the chat process. It uses the framer-motion
 * library for animations and lucide-react for icons.
 *
 * @file components/chat/loading.tsx
 * @author Son Nguyen
 * @license MIT
 * @version 1.0.0
 * @date 2025-05-11
 */

/**
 * Loading indicator component that displays the status of the
 * loading process. It shows different icons based on the
 * loading state (thinking, searching, understanding,
 * documents, error).
 *
 * @param status - The status message to display
 * @param icon - The icon to display (thinking, searching, understanding,
 * @param isError - Whether the loading process is in error state
 * @param isDone - Whether the loading process is done
 */
export function Pill({
  status,
  icon,
  isError,
  isDone,
}: {
  status: string;
  icon: IndicatorIconType;
  isError: boolean;
  isDone: boolean;
}) {
  return (
    <div
      className={`flex flex-row gap-2 items-center ${
        isDone ? "text-gray-200" : "text-gray-400 animate-pulse"
      } ${isError ? "text-red-500" : ""}`}
    >
      {icon === "thinking" && <Brain className="w-4 h-4 animate-pulse" />}
      {icon === "searching" && <FileSearch className="w-4 h-4 animate-pulse" />}
      {icon === "understanding" && <Scan className="w-4 h-4 animate-pulse" />}
      {icon === "documents" && <FileStack className="w-4 h-4 animate-pulse" />}
      {icon === "error" && <AlertCircle className="w-4 h-4 animate-pulse" />}
      <p>{status}</p>
    </div>
  );
}

/**
 * Loading component that displays the loading indicators
 * based on the current state of the application. It shows
 * different icons and status messages based on the loading
 * process (thinking, searching, understanding, documents,
 * error).
 *
 * @param indicatorState - The current state of the loading indicators
 */
export default function Loading({
  indicatorState,
}: {
  indicatorState: LoadingIndicator[];
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="py-1 max-w-[60%] transition-shadow duration-300"
    >
      {indicatorState.map((indicator, index) => {
        return (
          <Pill
            key={indicator.status}
            status={indicator.status}
            icon={indicator.icon}
            isError={indicator.icon === "error"}
            isDone={index !== indicatorState.length - 1}
          />
        );
      })}
    </motion.div>
  );
}
