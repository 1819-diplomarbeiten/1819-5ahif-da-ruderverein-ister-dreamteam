# 1819-5ahif-da-ister-ruderverein
Turnierverwaltung für Ruderverein Ister Linz

## Relevante Informationen

### overview-selector.js Z23 Festlegen der Administrator Email



## Datenbankstruktur einrichten und mit Daten der vorherigen Saisonen befüllen
Einfach das backup.sql file auf der Datenbank ausführen, Datenbankstruktur wird erstellt und befüllt mit Daten.


## Datenbankverbindung in PHP herstellen
Im File php/htdocs/restApi/config/Database.php den Hostnamen, Datenbanknamen, Username und Passwort ändern, um eine Verbindung zur Datenbank herzustellen.


## Adminrechte im Frontend erlangen
Im File Query.php Zeile 305, die E-Mail auf die gewünschte Adminmail ändern.(Muss E-Mail eines Google-Kontos sein)
