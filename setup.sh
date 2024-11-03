#!/bin/bash

# Create the virtual environment
python3 -m venv mlb

# Activate the virtual environment
source mlb/bin/activate

# Install dependencies
pip install -r requirements.txt

echo "Virtual environment 'mlb' created and dependencies installed!"
