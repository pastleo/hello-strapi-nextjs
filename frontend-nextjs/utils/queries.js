export const announcementsQuery = `
{
  announcements {
    data {
      id
      attributes {
        content
        createdAt
      }
    }
  }
}
`;
