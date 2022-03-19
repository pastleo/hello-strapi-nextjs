import useSWR from 'swr';

import { announcementsQuery } from '../utils/queries';

function Announcements() {
  const { data } = useSWR(announcementsQuery);
  return (
    <ul>
      { data.announcements.data.map(announcement => (
        <li key={announcement.id}>
          📢 { announcement.attributes.content }
        </li>
      )) }
    </ul>
  );
}

export default Announcements;
