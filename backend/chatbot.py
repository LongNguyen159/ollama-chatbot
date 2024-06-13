from schemas import UserInput

def chatbot(input: UserInput):
    user_input = input.message.lower()
    
    # Passwort zurücksetzen
    if "passwort" in user_input or "reset" in user_input:
        return "Es scheint, als ob du dein Passwort zurücksetzen möchtest. Bitte besuche unsere Passwort-Reset-Seite und folge den Anweisungen."

    # Netzwerkverbindungsprobleme
    elif "netzwerk" in user_input or "internet" in user_input or "wlan" in user_input or "lan" in user_input:
        return "Wenn du Netzwerkverbindungsprobleme hast, starte bitte zuerst deinen Router neu. Wenn das nicht hilft, überprüfe die Kabelverbindungen und versuche es erneut."

    # Softwareinstallation und -aktualisierung
    elif "software" in user_input or "installation" in user_input or "update" in user_input:
        return "Für Softwareinstallationen oder -aktualisierungen, stelle sicher, dass du die neueste Version installiert hast und den Anweisungen auf dem Bildschirm folgst."

    # E-Mail-Probleme
    elif "e-mail" in user_input or "mail" in user_input or "email" in user_input:
        return "Bei E-Mail-Problemen überprüfe bitte deine Internetverbindung und die Einstellungen deines E-Mail-Clients. Stelle sicher, dass du die korrekten Serverinformationen eingetragen hast."

    # Druckerprobleme
    elif "drucker" in user_input or "drucken" in user_input:
        return "Wenn dein Drucker nicht funktioniert, überprüfe bitte, ob er richtig angeschlossen ist und genügend Papier und Tinte hat. Versuche, den Drucker neu zu starten."

    # Computer startet nicht oder stürzt ab
    elif "computer" in user_input or "startet nicht" in user_input or "absturz" in user_input:
        return "Wenn dein Computer nicht startet oder abstürzt, versuche ihn neu zu starten. Überprüfe, ob alle Kabel richtig angeschlossen sind und keine Hardwareprobleme vorliegen."

    # Virenscan 
    elif "virus" in user_input or "malware" in user_input or "scan" in user_input:
        return "Bei Verdacht auf Viren oder Malware, führe einen vollständigen Virenscan durch."
    # Hardwareprobleme
    elif "hardware" in user_input or "defekt" in user_input:
        return "Wenn du Hardwareprobleme hast, überprüfe bitte die Anschlüsse und stelle sicher, dass alle Geräte richtig angeschlossen sind. Versuche, die Hardware an einem anderen Computer zu testen."

    # Datensicherung und -wiederherstellung
    elif "backup" in user_input or "wiederherstellung" in user_input or "daten" in user_input:
        return "Für Datensicherung und -wiederherstellung, benutze bitte unser Backup-Tool und folge den Anweisungen zur Sicherung oder Wiederherstellung deiner Daten."

    # Benutzerrechte und Zugriffsprobleme
    elif "zugriff" in user_input or "rechte" in user_input or "benutzer" in user_input:
        return "Wenn du Probleme mit Benutzerrechten oder dem Zugriff auf Dateien hast, dann schreibe eine Mail an den Support,der dein Anliegen bewertet."
    
    else:
        return "Entschuldigung, ich konnte dein Anliegen nicht erkennen. Bitte versuche, dein Problem genauer zu beschreiben."