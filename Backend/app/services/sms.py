import os
from twilio.rest import Client

# You get these from your Twilio Dashboard (twilio.com)
# I'm reading them from environment variables for security
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

def send_sms(phone_number: str, message: str):
    """
    Sends a REAL SMS using Twilio.
    Automatically formats Tunisian numbers to start with +216.
    """
    # 0. Format for Tunisia (Orange/Ooredoo/Telecom)
    # If it starts with '2', '5', '9', '4' (Tunisian prefixes) and length is 8, add +216
    clean_num = phone_number.replace(" ", "").replace("-", "")
    if len(clean_num) == 8 and clean_num.isdigit():
        phone_number = f"+216{clean_num}"
    elif clean_num.startswith("216") and len(clean_num) == 11:
        phone_number = f"+{clean_num}"

    # 1. Check if we have the keys. If not, just print (Simulate)
    if not TWILIO_ACCOUNT_SID or not TWILIO_AUTH_TOKEN:
        print(f"\n[SIMULATION] SMS to {phone_number} (Tunisia): {message}\n")
        return

    try:
        # 2. Connect to Twilio
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

        # 3. Send the message
        message = client.messages.create(
            body=message,
            from_=TWILIO_PHONE_NUMBER,
            to=phone_number
        )
        
        print(f"[Info] SMS Sent! ID: {message.sid}")
        
    except Exception as e:
        print(f"[Error] Failed to send SMS: {e}")
