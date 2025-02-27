#!/bin/bash

# Ensure we are in a git repository
if [ ! -d .git ]; then
    echo "This is not a git repository."
    exit 1
fi

# Create 75 commits with the same message
for i in {1..80}
do
    echo "Commit $i" > temp_file.txt
    git add temp_file.txt
    git commit -m "Final: App Working"
done

# Clean up temporary file
rm temp_file.txt

echo "75 commits created successfully."
