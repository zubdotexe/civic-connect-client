import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function useInvoiceDownload() {
    const download = async (invoiceRef, fileName = "invoice.pdf") => {
        if (!invoiceRef?.current) return;

        const canvas = await html2canvas(invoiceRef.current, {
            useCORS: true,
            scale: 2,
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "px", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(fileName);
    };

    return { download };
}
