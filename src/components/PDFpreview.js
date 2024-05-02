import { Box } from "@mui/material";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import { useTheme } from "@mui/material/styles";

function PDFpreview({ pdfFile }) {
  const [numPages, setNumPages] = useState();

  const theme = useTheme();

  function onDocumentLoadSuccess(numPages) {
    setNumPages(numPages?._pdfInfo?.numPages);
  }

  return (
    <>
      <Box
        sx={{
          height: 450,
          overflow: "auto",
          background: theme.palette.primary.main,
          display: "flex",
          justifyContent: "center",
        }}
        p={2}
        m={2}
      >
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page) => {
              return (
                <Box key={page} mb={2} sx={{ width: "100%" }}>
                  <Page
                    key={page}
                    pageNumber={page}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Box>
              );
            })}
        </Document>
      </Box>
    </>
  );
}

export default PDFpreview;
