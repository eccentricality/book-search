import { gql } from "@apollo/client";

export const userQuery = gql`
  {
    user {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        image
        link
        title
      }
    }
  }
`;
