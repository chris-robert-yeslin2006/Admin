"use client"

import { useRef, useState } from "react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import ScoreReport from "./ScoreReport"
import "./PDFGeneration.css"

export default function ExportModal({ isOpen, onClose, testData }) {
  const modalRef = useRef(null)
  const contentRef = useRef(null)
  const [generating, setGenerating] = useState(false)

  if (!isOpen) return null

  const handleDownload = async () => {
    setGenerating(true)

    const loadingElement = document.createElement("div")
    loadingElement.className = "pdf-loading"
    loadingElement.innerText = "Generating PDF..."
    document.body.appendChild(loadingElement)

    try {
      const reportContainer = contentRef.current

      // Wait a moment to ensure all content is fully rendered
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Add a class to make the content more compact for PDF generation
      reportContainer.classList.add("pdf-compact-mode")

      // Make sure the container is visible during capture
      const originalStyle = reportContainer.style.cssText
      reportContainer.style.position = "fixed"
      reportContainer.style.top = "0"
      reportContainer.style.left = "0"
      reportContainer.style.width = "216mm" // Increased from 210mm to use more space
      reportContainer.style.height = "auto"
      reportContainer.style.backgroundColor = "#ffffff"
      reportContainer.style.zIndex = "-9999" // Hide from view but keep rendered
      reportContainer.style.transform = "none"
      reportContainer.style.opacity = "1"
      reportContainer.style.visibility = "visible"
      reportContainer.style.overflow = "visible"

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const margin = 2 // Reduced from 5mm to 2mm

      // Capture the entire report as a single canvas
      const canvas = await html2canvas(reportContainer, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: 794, // A4 width in pixels (approximately)
        onclone: (clonedDoc) => {
          // Force all elements to be visible in the clone
          const elements = clonedDoc.querySelectorAll("*")
          elements.forEach((el) => {
            const style = window.getComputedStyle(el)
            if (style.display === "none" || style.visibility === "hidden") {
              el.style.display = "block"
              el.style.visibility = "visible"
            }
          })

          // Apply compact mode to the clone
          clonedDoc.querySelector(".report-container").classList.add("pdf-compact-mode")
        },
      })

      const imgData = canvas.toDataURL("image/png", 1.0) // Full quality

      // Calculate dimensions to fit on a single page
      const imgWidth = pdfWidth - 2 * margin
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Scale to fit on a single page
      let finalImgWidth = imgWidth
      let finalImgHeight = imgHeight

      if (imgHeight > pdfHeight - 2 * margin) {
        // Scale down to fit on one page
        const scaleFactor = (pdfHeight - 2 * margin) / imgHeight
        finalImgWidth = imgWidth * scaleFactor
        finalImgHeight = imgHeight * scaleFactor

        // Center horizontally
        const horizontalMargin = (pdfWidth - finalImgWidth) / 2

        pdf.addImage(imgData, "PNG", horizontalMargin, margin, finalImgWidth, finalImgHeight)
      } else {
        // Content already fits on one page
        pdf.addImage(imgData, "PNG", margin, margin, finalImgWidth, finalImgHeight)
      }

      // Remove the compact mode class
      reportContainer.classList.remove("pdf-compact-mode")

      // Restore original styling
      reportContainer.style.cssText = originalStyle

      const fileName = `TestReport_${testData.candidateName || "Report"}_${new Date().toISOString().split("T")[0]}.pdf`
      pdf.save(fileName)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    } finally {
      setGenerating(false)
      document.body.removeChild(loadingElement)
    }
  }

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleClickOutside}>
      <div className="modal-container" ref={modalRef}>
        <div className="modal-header">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-content">
          <div className={`score-report-container ${generating ? "pdf-generating" : ""}`} ref={contentRef}>
            <ScoreReport data={testData} />
          </div>
        </div>

        <div className="modal-actions">
          <button className="action-button download-button" onClick={handleDownload} disabled={generating}>
            {generating ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </div>
    </div>
  )
}
