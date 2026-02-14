-- Availability Engine: Calculate free slots based on rules, appointments, and blocks.

CREATE OR REPLACE FUNCTION get_available_slots(
  p_provider_id uuid,
  p_date date,
  p_service_duration int, -- minutes
  p_buffer_after int default 0 -- minutes
)
RETURNS TABLE (
  slot_start timestamptz,
  slot_end timestamptz
)
LANGUAGE plpgsql
AS $$
DECLARE
  work_day record;
  query_start timestamptz;
  query_end timestamptz;
  curr_time timestamptz;
  possible_end timestamptz;
  is_conflict boolean;
  day_int int;
BEGIN
  -- Get Day of Week (0=Sun, 6=Sat) - Postgres 'dow' is 0=Sun
  day_int := extract(dow from p_date);

  -- Loop through all Work Shifts for this provider on this day
  FOR work_day IN
    SELECT start_time, end_time 
    FROM availability 
    WHERE provider_id = p_provider_id 
      AND day_of_week = day_int 
      AND is_day_off = false
  LOOP
    -- Construct Full Timestamps for the Shift
    query_start := p_date + work_day.start_time;
    query_end := p_date + work_day.end_time;
    
    -- Start generating slots from Shift Start
    curr_time := query_start;

    WHILE curr_time + (p_service_duration * interval '1 minute') <= query_end LOOP
      possible_end := curr_time + (p_service_duration * interval '1 minute');

      -- CHECK FOR CONFLICTS
      -- 1. Appointments
      SELECT EXISTS (
        SELECT 1 FROM appointments a
        WHERE a.provider_id = p_provider_id
          AND a.status NOT IN ('cancelled', 'no_show')
          AND (
            (a.start_time, a.end_time) OVERLAPS (curr_time, possible_end + (p_buffer_after * interval '1 minute'))
          )
      ) INTO is_conflict;

      -- 2. Unavailability Blocks (if no appt conflict found yet)
      IF NOT is_conflict THEN
        SELECT EXISTS (
          SELECT 1 FROM unavailability u
          WHERE u.provider_id = p_provider_id
            AND (
              (u.start_time, u.end_time) OVERLAPS (curr_time, possible_end + (p_buffer_after * interval '1 minute'))
            )
        ) INTO is_conflict;
      END IF;

      -- IF NO CONFLICT, RETURN SLOT
      IF NOT is_conflict THEN
        slot_start := curr_time;
        slot_end := possible_end;
        RETURN NEXT;
        -- Advance by Service Duration (Standard blocking) 
        -- OR Advance by Interval (e.g. 15 mins) for more flexible start times?
        -- "Luxury" usually implies specific slots. Let's step by 30 mins or Service Duration?
        -- For robust systems, usually stepping by a common interval (like 15 or 30 mins) is best 
        -- to allow "10:00, 10:15, 10:30" options even if service is 45 mins.
        -- Let's hardcode a 30 min step for now, or match service duration? 
        -- User didn't specify interval. Let's use 30 mins as a safe default for now.
        curr_time := curr_time + interval '30 minutes'; 
      ELSE
        -- If conflict, simpler to just step forward by 15 mins and try again 
        -- (Calculating exact end of conflict is more efficient but complex)
        curr_time := curr_time + interval '15 minutes';
      END IF;
      
    END LOOP;
  END LOOP;
END;
$$;
