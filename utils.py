import json

# Input and output file paths
input_geojson_path = "base-des-lieux-et-des-equipements-culturels.geojson"
output_geojson_path = "cleaned.geojson"

# List of fields to keep in the properties
fields_to_keep = ["type_equipement_ou_lieu", "nom", "adresse_postale", "code_insee_epci"]

try:
    # Load the GeoJSON file
    with open(input_geojson_path, "r", encoding="utf-8") as f:
        geojson_data = json.load(f)

    # Process each feature to remove unused fields
    for feature in geojson_data.get("features", []):
        if "properties" in feature:
            feature["properties"] = {
                key: value for key, value in feature["properties"].items() if key in fields_to_keep
            }

    # Save the cleaned GeoJSON to a new file
    with open(output_geojson_path, "w", encoding="utf-8") as f:
        json.dump(geojson_data, f, ensure_ascii=False, indent=4)

    print(f"Cleaned GeoJSON file has been created: {output_geojson_path}")

except FileNotFoundError:
    print(f"File not found: {input_geojson_path}")
except json.JSONDecodeError:
    print(f"Invalid JSON format in file: {input_geojson_path}")
except Exception as e:
    print(f"An error occurred: {e}")