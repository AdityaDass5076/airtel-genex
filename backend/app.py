from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import shutil
import os

from extractors.dwg_extractor import extract_dwg_data
from generators.excel_generator import generate_reports

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
GENERATED_FOLDER = "generated"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(GENERATED_FOLDER, exist_ok=True)


@app.get("/")
def home():
    return {"message": "Airtel GenEx Backend Running"}


@app.post("/upload-design")
async def upload_design(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_data = extract_dwg_data(file_path)

    return {
        "status": "success",
        "filename": file.filename,
        "data": extracted_data,
    }


@app.post("/generate-reports")
def generate_excel_reports():
    output_files = generate_reports()

    return {
        "status": "generated",
        "files": output_files,
    }


@app.get("/download/{filename}")
def download_file(filename: str):
    path = os.path.join(GENERATED_FOLDER, filename)

    if not os.path.exists(path):
        return {"error": "File not found"}

    return FileResponse(
        path,
        media_type="application/octet-stream",
        filename=filename,
    )