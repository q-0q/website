#!/bin/bash

# Check if input file is provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 input_file.mp4"
    exit 1
fi

INPUT="$1"
BASENAME=$(basename "$INPUT" .mp4)
PALETTE="${BASENAME}_palette.png"
OUTPUT="${BASENAME}.gif"

ffmpeg -y -i "$INPUT" -vf "fps=15,scale=320:-1:flags=lanczos,palettegen" "$PALETTE"

ffmpeg -y -i "$INPUT" -i "$PALETTE" -filter_complex "fps=15,scale=320:-1:flags=lanczos[x];[x][1:v]paletteuse" "$OUTPUT"

rm "$PALETTE"

echo "GIF created: $OUTPUT"
