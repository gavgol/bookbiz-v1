import os
import datetime
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

def get_supabase_client():
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")
    if not url or not key:
        raise ValueError("Missing SUPABASE_URL or SUPABASE_KEY environment variables")
    return create_client(url, key)

def main():
    print("--- Starting DB Handshake Verification ---")
    try:
        supabase = get_supabase_client()
    except ValueError as e:
        print(f"Skipping due to missing config: {e}")
        return

    # 1. Insert Mock Service
    print("Inserting Mock Service...")
    mock_service = {
        "name": "Handshake Haircut",
        "description": "A test service to verify database write.",
        "duration_min": 30,
        "price": 50.00,
        "is_active": False # Don't show in real UI
    }
    
    # We use table().insert() 
    # NOTE: This requires RLS allowing insert. 
    # If using Service Role Key, it works. 
    # If using Anon Key + RLS, we need to be logged in. 
    # Since this is a backend script tool, we assume Service Role Key is used in .env for admin tasks.
    try:
        res = supabase.table("services").insert(mock_service).execute()
        service_id = res.data[0]['id']
        print(f"Service inserted. ID: {service_id}")
    except Exception as e:
        print(f"Error inserting service: {e}")
        return

    # 2. Insert Mock Client (Required for Appointment)
    print("Inserting Mock Client...")
    mock_client = {
        "full_name": "Test Client",
        "phone_number": "555-0000",
        "email": "test@example.com"
    }
    try:
        # Check if exists first to avoid unique constraint error
        check = supabase.table("clients").select("id").eq("phone_number", "555-0000").execute()
        if check.data:
            client_id = check.data[0]['id']
            print(f"Client already exists. ID: {client_id}")
        else:
            res = supabase.table("clients").insert(mock_client).execute()
            client_id = res.data[0]['id']
            print(f"Client inserted. ID: {client_id}")
    except Exception as e:
        print(f"Error inserting client: {e}")
        return

    # 3. Create Mock Appointment (Verifies FKs)
    print("Inserting Mock Appointment...")
    # We need a provider_id. We'll query profiles.
    # If no profile exists, we can't link.
    profiles = supabase.table("profiles").select("id").limit(1).execute()
    if not profiles.data:
        print("CRITICAL: No profiles found in DB. Cannot create appointment (FK constraint).")
        print("Please create a user in Supabase Auth first.")
        return
    
    provider_id = profiles.data[0]['id']
    
    start_time = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=1)
    end_time = start_time + datetime.timedelta(minutes=30)
    
    mock_appointment = {
        "client_id": client_id,
        "service_id": service_id,
        "provider_id": provider_id,
        "start_time": start_time.isoformat(),
        "end_time": end_time.isoformat(),
        "status": "pending",
        "payment_status": "unpaid"
    }
    
    try:
        res = supabase.table("appointments").insert(mock_appointment).execute()
        appt_id = res.data[0]['id']
        print(f"Appointment inserted successfully. ID: {appt_id}")
        print("✅ Handshake Verification Complete: FKs and Writes are working.")
    except Exception as e:
        print(f"Error inserting appointment: {e}")

if __name__ == "__main__":
    main()
