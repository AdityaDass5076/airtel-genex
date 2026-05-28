from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import shutil
import os

from extractors.dwg_extractor import extract_dwg_data
from generators.excel_generator import generate_reports
import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "data", "generated_data.json")

DEFAULT_DATA = {
    "project": {},
    "extraction": {},
    "mwo": {},
    "osp_odn": {},
    "oh_accessories": {},
    "ftth_details": {},
    "verification": {},
    "reports": []
}


def read_generated_data():
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)

    if not os.path.exists(DATA_FILE):
        write_generated_data(DEFAULT_DATA)
        return DEFAULT_DATA

    with open(DATA_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def write_generated_data(data):
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)

    with open(DATA_FILE, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4)

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

@app.get("/mwo-data")
def get_mwo_data():
    data = read_generated_data()
    return data.get("mwo", {})


@app.get("/osp-data")
def get_osp_data():
    data = read_generated_data()
    return data.get("osp_odn", {})


@app.get("/oh-data")
def get_oh_data():
    data = read_generated_data()
    return data.get("oh_accessories", {})


@app.get("/ftth-data")
def get_ftth_data():
    data = read_generated_data()
    return data.get("ftth_details", {})


@app.get("/verification-data")
def get_verification_data():
    data = read_generated_data()
    return data.get("verification", {})


@app.get("/reports-data")
def get_reports_data():
    data = read_generated_data()
    return data.get("reports", [])

@app.get("/")
def home():
    return {"message": "Airtel GenEx Backend Running"}


@app.post("/upload-design")
async def upload_design(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        extracted_data = extract_dwg_data(file_path)

        print("EXTRACTED DATA:", extracted_data)

        data = read_generated_data()

        data["extraction"] = extracted_data
        data["mwo"] = extracted_data
        data["osp_odn"] = extracted_data
        data["oh_accessories"] = extracted_data
        data["ftth_details"] = extracted_data
        data["verification"] = extracted_data

        data["reports"] = [
            {"name": "MWO.xlsx", "status": "Ready"},
            {"name": "OSP_ODN.xlsx", "status": "Ready"},
            {"name": "OH_Accessories.xlsx", "status": "Ready"},
            {"name": "FTTH_Details.xlsx", "status": "Ready"},
            {"name": "Validation_Report.xlsx", "status": "Ready"}
        ]

        write_generated_data(data)

        return {
            "status": "success",
            "message": "Design processed successfully",
            "data": extracted_data
        }

    except Exception as e:
        print("UPLOAD ERROR:", str(e))
        return {"error": str(e)}
        
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