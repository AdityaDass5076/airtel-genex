import ezdxf
import re
import math


def clean_text(text):
    if not text:
        return ""
    text = text.replace("\\P", " ")
    text = text.replace("\n", " ")
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


def find_quantity(text, item):
    pattern = rf"{item}.*?:\s*(\d+)\s*(NOS|NO|NUMBERS|METERS|METER|MTR|MTRS|M)?"
    match = re.search(pattern, text, re.IGNORECASE)
    return int(match.group(1)) if match else 0


def extract_dwg_data(file_path):
    data = {
        "odf_count": 0,
        "fat_count": 0,
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

                if "ODF" in upper:
                    data["odf_count"] += 1

                if "FAT" in upper or "FAT BOX" in upper or "FMS" in upper:
                    data["fat_count"] += 1

                if "OTB" in upper:
                    data["otb_count"] += 1

                if "CLOSURE" in upper:
                    data["closure_count"] += 1

                if "POLE" in upper:
                    data["pole_count"] += 1

                if "SPLITTER" in upper or "1:8" in upper or "1 : 8" in upper:
                    data["splitter_count"] += 1

                hp = re.search(r"(\d+)\s*HP", upper)
                if hp:
                    data["hp_count"] += int(hp.group(1))

            if dxftype == "INSERT":
                block = entity.dxf.name.upper()
                data["blocks_found"].append(block)

                if "ODF" in block:
                    data["odf_count"] += 1

                if "FAT" in block or "FMS" in block:
                    data["fat_count"] += 1

                if "OTB" in block:
                    data["otb_count"] += 1

                if "CLOSURE" in block:
                    data["closure_count"] += 1

                if "POLE" in block:
                    data["pole_count"] += 1

                if "SPLITTER" in block:
                    data["splitter_count"] += 1

            cable_keywords = ["96F", "48F", "24F", "12F", "6F", "CABLE", "FIBER"]

            if dxftype == "LINE" and any(k in layer for k in cable_keywords):
                length = distance(entity.dxf.start, entity.dxf.end)

                if "96F" in layer:
                    data["cable_96f"] += length
                elif "48F" in layer:
                    data["cable_48f"] += length
                elif "24F" in layer:
                    data["cable_24f"] += length
                elif "12F" in layer:
                    data["cable_12f"] += length
                elif "6F" in layer:
                    data["cable_6f"] += length
                else:
                    data["cable_length"] += length

            if dxftype == "LWPOLYLINE" and any(k in layer for k in cable_keywords):
                points = list(entity.get_points("xy"))
                length = 0

                for i in range(len(points) - 1):
                    length += distance(points[i], points[i + 1])

                if "96F" in layer:
                    data["cable_96f"] += length
                elif "48F" in layer:
                    data["cable_48f"] += length
                elif "24F" in layer:
                    data["cable_24f"] += length
                elif "12F" in layer:
                    data["cable_12f"] += length
                elif "6F" in layer:
                    data["cable_6f"] += length
                else:
                    data["cable_length"] += length

        full_text = clean_text(full_text)

        data["fat_count"] = max(data["fat_count"], find_quantity(full_text, r"24F\s*FMS"))
        data["splitter_count"] = max(data["splitter_count"], find_quantity(full_text, r"1\s*:\s*8.*?SPLITTERS?"))
        data["cable_24f"] = max(data["cable_24f"], find_quantity(full_text, r"24F\s*CABLE"))
        data["cable_12f"] = max(data["cable_12f"], find_quantity(full_text, r"12F\s*CABLE"))
        data["duct_length"] = max(data["duct_length"], find_quantity(full_text, r"DUCT"))
        data["cc_trench"] = max(data["cc_trench"], find_quantity(full_text, r"C\.?C\s*TRENCH"))
        data["pvc_25mm"] = max(data["pvc_25mm"], find_quantity(full_text, r"25MM\s*PVC"))

        data["cable_96f"] = round(data["cable_96f"], 2)
        data["cable_48f"] = round(data["cable_48f"], 2)
        data["cable_24f"] = round(data["cable_24f"], 2)
        data["cable_12f"] = round(data["cable_12f"], 2)
        data["cable_6f"] = round(data["cable_6f"], 2)

        data["cable_length"] = round(
            data["cable_96f"]
            + data["cable_48f"]
            + data["cable_24f"]
            + data["cable_12f"]
            + data["cable_6f"],
            2,
        )

        data["bom_items"] = [
            {"item": "24F FMS", "quantity": data["fat_count"], "uom": "Nos"},
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