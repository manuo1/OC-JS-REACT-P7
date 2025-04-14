npm init -y

npm install eslint --save-dev

npm install tailwindcss @tailwindcss/cli

Ajouter dans package.json

    "scripts": {
    "build:css": "tailwindcss -i ./src/css/style.css -o ./src/css/tailwind.css --watch"
    },

Et donc pour lancer la compile css :
    
    npm run build:css   