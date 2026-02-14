import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY") # Service Role Key for Admin access

if not url or not key:
    print("❌ Error: Missing Supabase credentials in .env")
    exit(1)

supabase: Client = create_client(url, key)

def run_e2e_test():
    print("[START] Starting E2E Appointment Flow Test...")

    # 1. Fetch Services (Service Selector)
    print("\n[SEARCH] Step 1: Fetching Services...")
    services_res = supabase.table("services").select("*").execute()
    if not services_res.data:
        print("[ERROR] Failed: No services found.")
        return
    
    service = services_res.data[0]
    print(f"[OK] Selected Service: {service['name']} (ID: {service['id']})")

    # 2. Simulate Slot Selection (Next Monday 10:00 AM)
    print("\n[SEARCH] Step 2: Selecting Time Slot...")
    # Calculate next Monday
    today = datetime.now()
    days_ahead = 7 - today.weekday() if today.weekday() != 0 else 7
    next_monday = today + timedelta(days=days_ahead)
    start_time = next_monday.replace(hour=10, minute=0, second=0, microsecond=0)
    end_time = start_time + timedelta(minutes=service['duration_min'])

    print(f"[OK] Selected Slot: {start_time.isoformat()} - {end_time.isoformat()}")

    # 3. Insert Appointment (Save Logic)
    print("\n[SAVE] Step 3: Booking Appointment...")
    
    # We need a provider ID (Orel) and a dummy client
    # Fetch provider
    provider_res = supabase.table("profiles").select("id").eq("role", "provider").limit(1).execute()
    if not provider_res.data:
         print("[ERROR] Failed: No provider found.")
         return
    provider_id = provider_res.data[0]['id']

    # Fetch/Create dummy client
    client_res = supabase.table("clients").select("id").limit(1).execute()
    client_id = client_res.data[0]['id'] if client_res.data else None
    
    if not client_id:
        print("[WARN] No clients validation skipped (Demo Mode)")
        # In real test we would create one, but let's assume one exists from previous steps
        # Attempting to fetch or create
        new_client = supabase.table("clients").insert({
            "full_name": "Test Bot", 
            "phone_number": "0500000000"
        }).execute()
        client_id = new_client.data[0]['id']

    appointment_payload = {
        "client_id": client_id,
        "service_id": service['id'],
        "provider_id": provider_id,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "status": "confirmed"
    }

    try:
        apt_res = supabase.table("appointments").insert(appointment_payload).execute()
        appointment = apt_res.data[0]
        print(f"[OK] Appointment Created! ID: {appointment['id']}")
    except Exception as e:
        print(f"[ERROR] Failed to create appointment: {e}")
        return

    # 4. WhatsApp Trigger (Logic Check)
    print("\n[MSG] Step 4: Generating WhatsApp Link...")
    client_phone = "050-0000000" # Mock from our bot
    formatted_phone = client_phone.replace("-", "").replace("0", "972", 1)
    
    message = f"היי Test Bot, תור נקבע ל-{service['name']} בתאריך {start_time.strftime('%d/%m %H:%M')}"
    wa_link = f"https://wa.me/{formatted_phone}?text={message.replace(' ', '%20')}"
    
    print(f"[OK] WhatsApp Link Generated: {wa_link}")

    print("\n[DONE] E2E Test Completed Successfully!")

if __name__ == "__main__":
    run_e2e_test()
