import ezdxf
import re
import math


def clean_text(text):
    if not text:
        return ""

    text = str(text)
    text = text.replace("\\P", " ")
    text = text.replace("\n", " ")
    text = text.replace("^I", " ")
    text = text.replace("\\t", " ")

    # Remove AutoCAD MTEXT formatting
    text = re.sub(r"\{\\[^;]*;", " ", text)
    text = text.replace("{", " ")
    text = text.replace("}", " ")

    text = re.sub(r"\s+", " ", text)
    return text.strip()


def distance(p1, p2):
    return math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2)


def get_text(entity):
    if entity.dxftype() == "TEXT":
        return clean_text(entity.dxf.text)

    if entity.dxftype() == "MTEXT":
        return clean_text(entity.text)

    return ""


def get_bom_quantity(text, item_pattern):
    text = clean_text(text)

    pattern = (
        rf"{item_pattern}"
        rf"\s*[:\-]?\s*"
        rf"(\d+(?:\.\d+)?)"
        rf"\s*(NOS|NO|METERS|METER|MTR|MTRS|M)?"
    )

    match = re.search(pattern, text, re.IGNORECASE)

    if match:
        return float(match.group(1))

    return 0


def extract_dwg_data(file_path):
    data = {
        "odf_count": 0,
        "fat_count": 0,
        "fms_count": 0,
        "otb_count": 0,
        "closure_count": 0,
        "pole_count": 0,
        "splitter_count": 0,

        "cable_96f": 0,
        "cable_48f": 0,
        "cable_24f": 0,
        "cable_12f": 0,
        "cable_6f": 0,
        "duct_length": 0,
        "cc_trench": 0,
        "pvc_25mm": 0,
        "cable_length": 0,
        "hp_count": 0,

        "bom_items": [],
        "texts_found": [],
        "layers_found": [],
        "blocks_found": [],
    }

    try:
        doc = ezdxf.readfile(file_path)
        msp = doc.modelspace()
        full_text = ""

        for entity in msp:
            dxftype = entity.dxftype()
            layer = entity.dxf.layer.upper() if hasattr(entity.dxf, "layer") else ""

            if layer and layer not in data["layers_found"]:
                data["layers_found"].append(layer)

            if dxftype in ["TEXT", "MTEXT"]:
                text = get_text(entity)
                upper = text.upper()
                full_text += " " + text

                if text:
                    data["texts_found"].append(text)

                actual_hp = re.search(r"ACTUAL\s*HP\s*[-:]?\s*(\d+)", upper)
                if actual_hp:
                    data["hp_count"] = int(actual_hp.group(1))

            if dxftype == "INSERT":
                block = entity.dxf.name.upper()
                if block and block not in data["blocks_found"]:
                    data["blocks_found"].append(block)

        text = clean_text(full_text)

        data["fms_count"] = get_bom_quantity(
            text,
            r"24F\s*FMS"
        )

        data["splitter_count"] = get_bom_quantity(
            text,
            r"1\s*:\s*8\s*\*\s*1\s*Splitters?"
        )

        data["fat_count"] = data["splitter_count"]

        data["cable_24f"] = get_bom_quantity(
            text,
            r"24F\s*Cable"
        )

        data["cable_12f"] = get_bom_quantity(
            text,
            r"12F\s*Cable"
        )

        data["duct_length"] = get_bom_quantity(
            text,
            r"DUCT"
        )

        data["cc_trench"] = get_bom_quantity(
            text,
            r"C\.?\s*C\.?\s*Trench"
        )

        data["pvc_25mm"] = get_bom_quantity(
            text,
            r"25MM\s*PVC"
        )

        data["cable_length"] = round(
            data["cable_24f"] + data["cable_12f"], 2
        )

        data["bom_items"] = [
            {"item": "FAT Box", "quantity": data["fat_count"], "uom": "Nos"},
            {"item": "24F FMS", "quantity": data["fms_count"], "uom": "Nos"},
            {"item": "1:8 Splitters", "quantity": data["splitter_count"], "uom": "Nos"},
            {"item": "96F Cable", "quantity": data["cable_96f"], "uom": "Meters"},
            {"item": "48F Cable", "quantity": data["cable_48f"], "uom": "Meters"},
            {"item": "24F Cable", "quantity": data["cable_24f"], "uom": "Meters"},
            {"item": "12F Cable", "quantity": data["cable_12f"], "uom": "Meters"},
            {"item": "6F Cable", "quantity": data["cable_6f"], "uom": "Meters"},
            {"item": "DUCT", "quantity": data["duct_length"], "uom": "Meters"},
            {"item": "C.C Trench", "quantity": data["cc_trench"], "uom": "Meters"},
            {"item": "25MM PVC", "quantity": data["pvc_25mm"], "uom": "Meters"},
            {"item": "ODF", "quantity": data["odf_count"], "uom": "Nos"},
            {"item": "OTB", "quantity": data["otb_count"], "uom": "Nos"},
            {"item": "Closure", "quantity": data["closure_count"], "uom": "Nos"},
            {"item": "Pole", "quantity": data["pole_count"], "uom": "Nos"},
        ]

        data["texts_found"] = data["texts_found"][:50]
        data["layers_found"] = data["layers_found"][:50]
        data["blocks_found"] = data["blocks_found"][:50]

        return data

    except Exception as e:
        return {"error": str(e)}