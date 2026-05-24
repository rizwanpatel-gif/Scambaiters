import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { IconX, IconBrain, IconAlignLeft } from "@tabler/icons-react";

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  originalContent?: string;
  summarizedContent?: string;
  isLoading?: boolean;
}

export default function SummaryModal({
  isOpen,
  onClose,
  originalContent = "",
  summarizedContent = "",
  isLoading = false,
}: SummaryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-xl border border-black/[0.06] w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06] flex-shrink-0">
            <DialogTitle className="flex items-center gap-2 text-base font-bold text-[#0A0A0A]">
              <div className="w-7 h-7 rounded-xl bg-[#CCE8FF] flex items-center justify-center">
                <IconBrain size={15} className="text-black/50" />
              </div>
              AI Summary
            </DialogTitle>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-xl bg-[#F2F2F2] hover:bg-black/10 flex items-center justify-center transition-colors"
            >
              <IconX size={14} className="text-black/40" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <div className="w-8 h-8 border-2 border-black/10 border-t-black/40 rounded-full animate-spin" />
                <p className="text-sm text-black/35 font-medium">Generating summary…</p>
              </div>
            ) : (
              <>
                {/* Summary */}
                <div>
                  <p className="text-[10px] font-semibold text-black/30 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <IconBrain size={11} /> Summary
                  </p>
                  <div className="bg-[#CCE8FF]/40 rounded-2xl p-4">
                    <p className="text-sm text-[#0A0A0A] leading-relaxed">
                      {summarizedContent || "No summary available."}
                    </p>
                  </div>
                </div>

                {/* Original */}
                <div>
                  <p className="text-[10px] font-semibold text-black/30 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <IconAlignLeft size={11} /> Original
                  </p>
                  <div className="bg-[#F2F2F2] rounded-2xl p-4 max-h-36 overflow-y-auto">
                    <p className="text-sm text-black/50 leading-relaxed">{originalContent}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          {!isLoading && (
            <div className="px-5 py-4 border-t border-black/[0.06] flex-shrink-0">
              <button
                onClick={onClose}
                className="w-full h-10 bg-[#0A0A0A] hover:bg-[#333] text-white text-sm font-bold rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
