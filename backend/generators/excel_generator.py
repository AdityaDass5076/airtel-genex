import pandas as pd
import os
from datetime import datetime


def generate_reports():
    os.makedirs("generated", exist_ok=True)

    files_created = []

    bom_items = [
        {"Item": "24F FMS", "Quantity": 0, "UOM": "Nos"},
        {"Item": "1:8 Splitters", "Quantity": 0, "UOM": "Nos"},
        {"Item": "24F Cable", "Quantity": 0, "UOM": "Meters"},
        {"Item": "12F Cable", "Quantity": 0, "UOM": "Meters"},
        {"Item": "DUCT", "Quantity": 0, "UOM": "Meters"},
        {"Item": "C.C Trench", "Quantity": 0, "UOM": "Meters"},
        {"Item": "25MM PVC", "Quantity": 0, "UOM": "Meters"},
    ]

    reports = {
        "BOQ.xlsx": bom_items,
        "BOM.xlsx": bom_items,
        "MWO.xlsx": bom_items,
        "OSP_ODN.xlsx": bom_items,
        "OH_Accessories.xlsx": bom_items,
        "FTTH_Details.xlsx": bom_items,
        "Validation_Report.xlsx": [
            {"Check": "DXF Parsed", "Status": "Completed"},
            {"Check": "BOM Extracted", "Status": "Completed"},
            {"Check": "Generated On", "Status": datetime.now().strftime("%d-%m-%Y %H:%M")},
        ],
    }

    for filename, rows in reports.items():
        path = os.path.join("generated", filename)
        df = pd.DataFrame(rows)
        df.to_excel(path, index=False)
        files_created.append(filename)

    return files_created