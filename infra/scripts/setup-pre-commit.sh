#!/bin/sh

# Define the pre-commit script content
PRE_COMMIT_CONTENT='#!/bin/sh

echo "Running pre-commit checks..."

# Example pre-commit commands
echo "Running linter..."
npm run lint:prettier:fix

if [ $? -ne 0 ]; then
  echo "Linter failed. Aborting commit."
  exit 1
fi

# Add more commands as needed
# echo "Running some other checks..."
# ./some-other-check-script.sh
# if [ $? -ne 0 ]; then
#   echo "Some other checks failed. Aborting commit."
#   exit 1
# fi

echo "Pre-commit checks passed. Proceeding with commit."
'

# Create the pre-commit hook file
echo "$PRE_COMMIT_CONTENT" > .git/hooks/pre-commit

# Make the pre-commit hook executable
chmod +x .git/hooks/pre-commit

echo "Pre-commit hook has been set up successfully."
