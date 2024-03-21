import dayjs from 'dayjs';
import { google } from 'googleapis';

import { Event } from '@/interface';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const {
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_PROJECT_NUMBER,
  GOOGLE_CLIENT_ID,
  GOOGLE_PRIVATE_KEY_ID,
  GOOGLE_CALENDAR_ID,
  GOOGLE_UNIVERSE_DOMAIN,
} = process.env;

const jwtClient = new google.auth.GoogleAuth({
  credentials: {
    client_email: GOOGLE_CLIENT_EMAIL,
    client_id: GOOGLE_CLIENT_ID,
    projectId: GOOGLE_PROJECT_NUMBER,
    private_key: GOOGLE_PRIVATE_KEY,
    private_key_id: GOOGLE_PRIVATE_KEY_ID,
    universeDomain: GOOGLE_UNIVERSE_DOMAIN,
  },
  scopes: SCOPES,
});

export const createCalendarEvent = async (
  event: Event
): Promise<string | null> => {
  let UTCStartTime = Number(event.startTime.split(':')[0]) + 3;
  let UTCEndTime = Number(event.endTime.split(':')[0]) + 3;

  if (UTCStartTime > 24) UTCStartTime -= 24;
  if (UTCEndTime > 24) UTCEndTime -= 24;

  const formattedStartTime = `${UTCStartTime.toString().padStart(2, '0')}:${event.startTime.split(':')[1]}:00.000`;
  const formattedEndTime = `${UTCEndTime.toString().padStart(2, '0')}:${event.endTime.split(':')[1]}:00.000`;

  let isNextDay = false;
  if (formattedEndTime < formattedStartTime) {
    isNextDay = true;
  }

  const day = dayjs(event.date).add(1, 'day').format('YYYY-MM-DD');
  const nextDay = dayjs(event.date).add(2, 'day').format('YYYY-MM-DD');

  const start = `${day}T${formattedStartTime}Z`;
  const end = `${isNextDay ? nextDay : day}T${formattedEndTime}Z`;

  const eventData = {
    summary: `Evento: ${event.title}`,
    location: event.location,
    description: `Cliente: ${event.client.name} - https://wa.me/${event.client.phone}`,
    start: {
      dateTime: start,
      timeZone: 'America/Argentina/Tucuman',
    },
    end: {
      dateTime: end,
      timeZone: 'America/Argentina/Tucuman',
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'popup', minutes: 1440 }, // 1 day
        { method: 'popup', minutes: 240 }, // 4 hours
      ],
    },
  };

  // GOOGLE CALENDAR ------------------------------------------

  const calendar = google.calendar({
    version: 'v3',
    auth: jwtClient,
  });

  try {
    // @ts-expect-error - this is a valid call
    const data = await calendar.events.insert({
      calendarId: GOOGLE_CALENDAR_ID,
      resource: eventData,
    });
    // @ts-expect-error - this is a valid call
    return data.data.id;
  } catch (e) {
    console.error('ERROR INSERTING EVENT', e);
    return null;
  }
};

export const deleteCalendarEvent = async (eventId: string) => {
  const calendar = google.calendar({
    version: 'v3',
    auth: jwtClient,
  });

  try {
    calendar.events.delete({
      calendarId: GOOGLE_CALENDAR_ID,
      eventId,
    });
  } catch (e) {
    console.error('ERROR DELETING EVENT', e);
  }
};
