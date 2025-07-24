import {useState} from "react";
import {useDropzone} from "react-dropzone";
// @ts-ignore
import Papa from "papaparse";
import {Box, Button, Typography} from "@mui/material";
import LayoutContainer from "../common/LayoutContainer.tsx";
import config from "../../config.ts";
import {PAGE_CREATE_SUCCESS} from "../PathConstants.tsx";
import {useNavigate} from "react-router-dom";

export default function MassImportPage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<any[]>([]);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();


    const onDrop = (acceptedFiles: File[]) => {
        const f = acceptedFiles[0];
        if (!f) return;

        if (!f.name.endsWith(".csv")) {
            setError("Only CSV files are supported");
            return;
        }

        setError("");
        setFile(f);

        // Parse CSV for preview
        Papa.parse(f, {
            header: true,
            skipEmptyLines: true,
            complete: (results: any) => {
                setPreview(results.data.slice(0, 10)); // Preview first 10 rows
            },
        });
    };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {"text/csv": [".csv"]},
        multiple: false,
    });


    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await fetch(`${config.apiBaseUrl}/import`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to import");
            }

            const result = await response.json();

            if (result.failureCount === 0) {
                navigate(PAGE_CREATE_SUCCESS);
            } else {
                // Handle failures
                console.log("Failures:", result.failures);
                alert(
                    `${result.successCount} imported successfully, ${result.failureCount} failed.`
                );
            }
        } catch (err) {
            console.error(err);
            alert("Import failed");
        }
    };

    return (
        <LayoutContainer>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 800,
                    textAlign: "center",
                    color: "white",
                    ml: '240px',

                }}
            >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Mass Import Activities
                </Typography>
                <Typography variant="body1" gutterBottom sx={{mb: 4}}>
                    Drag and drop your CSV file below or click to select. Ensure it matches
                    the template format.
                </Typography>

                {/* Drag and Drop Zone */}
                <Box
                    {...getRootProps()}
                    sx={{
                        p: 6,
                        border: "2px dashed rgba(255,255,255,0.6)",
                        borderRadius: 3,
                        backgroundColor: isDragActive
                            ? "rgba(255,255,255,0.2)"
                            : "rgba(255,255,255,0.08)",
                        cursor: "pointer",
                        mb: 4,
                    }}
                >
                    <input {...getInputProps()} />
                    <Typography>
                        {isDragActive
                            ? "Drop your file here..."
                            : "Drag & drop CSV file or click to browse"}
                    </Typography>
                </Box>

                {error && (
                    <Typography color="error" sx={{mb: 2}}>
                        {error}
                    </Typography>
                )}

                {/* Preview Table */}
                {preview.length > 0 && (
                    <Box
                        sx={{
                            maxHeight: 300,
                            overflowY: "auto",
                            mb: 2,
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: 2,
                            backgroundColor: "rgba(255,255,255,0.05)",
                        }}
                    >
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                color: "white",
                            }}
                        >
                            <thead>
                            <tr>
                                {Object.keys(preview[0]).map((col) => (
                                    <th
                                        key={col}
                                        style={{
                                            borderBottom: "1px solid rgba(255,255,255,0.2)",
                                            padding: "8px",
                                            textAlign: "left",
                                        }}
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {preview.map((row, i) => (
                                <tr key={i}>
                                    {Object.values(row).map((val, j) => (
                                        <td
                                            key={j}
                                            style={{
                                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                                                padding: "8px",
                                            }}
                                        >
                                            {val as string}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Box>
                )}

                {/* Upload Button */}
                {file && (
                    <Button
                        variant="contained"
                        onClick={handleUpload}
                        sx={{
                            backgroundColor: "#4ca1af",
                            "&:hover": {backgroundColor: "#357f89"},
                        }}
                    >
                        Import
                    </Button>
                )}
            </Box>
        </LayoutContainer>
    );
}