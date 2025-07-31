import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PDFGeneratorProps {
  content?: string;
  fileName?: string;
}

export function PDFGenerator({ content, fileName = "document" }: PDFGeneratorProps) {
  const generatePDF = () => {
    if (!content) {
      alert("No content available to download");
      return;
    }

    // Create a blob with the content
    const blob = new Blob([content], { type: 'text/plain' });
    
    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.txt`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={generatePDF}
      disabled={!content}
      variant="outline"
      className="border-gold-500 text-gold-700 hover:bg-gold-50"
    >
      <Download className="w-4 h-4 mr-2" />
      Download Document
    </Button>
  );
}
