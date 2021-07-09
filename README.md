# qrcode.menu

## Summary

With qrcode.menu you can easily create a restaurant menu which will be automatically translated from English to German, Spanish, Italian and French. You are able to assign different attributes to individual entries and therefore create e.g. headlines, descriptions, categories with different stylings. Menu entries can be deleted and rearranged which gives you the possibility to change your menu any time in the future.

Additionally, the qrcode editor allows you customize the colors and elements of a qrcode which is linked to your multi-lingual menu. Upon scanning the qrcode, the user will be redirected to your menu where he can choose between the different languages.

qrcode.menu allows you to quickly translate your menu into the 5 most common european languages and to make it easily accessible to your customers. As your menu is displayed on the users phone, there is no need for printing the menu or reprinting it, if you want to change it.

## Instructions

1. Clone this repository with: `https://github.com/stekeb/qrcode.menu.git` 
2. Run `npm install` in the `client` and `server` directory
3. Create an empty database (this project was created and tested with PostgreSQL)
4. Get your API keys from `https://www.deepl.com/` and `https://www.qr-code-generator.com/`
5. Create a `.env` file in the `client` and `server` folder and enter the necessary details. You can find blueprints in the `.env.example` files in the respective folders
6. Run `nodemon` from the `server` and `npm start` from the `client` directory

## Technologies used

This project was created with ReactJS, Express, Sequelize and PostgreSQL.

## TODO

-Complete CSS overhaul
-Add possibility to deactivate automatic translation for individual entries
-Authentication and general data security improvements

## Contact

Feel free to contact me at `https://github.com/stekeb`
