import React from 'react';
import { useQuery } from '@apollo/client';
import { ME, ALL_BOOKS } from './Queries/queries';

function Recommend(props) {
  const { data } = useQuery(ME);

  let favoriteGenre;
  if (data) {
    favoriteGenre = data.me.favoriteGenre;
  }
  const filterBookOnrecommendation = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
  });
  if (!props.show) {
    return null;
  }

  console.log(filterBookOnrecommendation);

  return (
    <div>
      <div>
        <h1>Recommendations</h1>
        <p>Books in your favorite genre:</p>
        <table>
          <tbody>
            <tr>
              <th>title</th>
              <th>author</th>
              <th>published</th>
            </tr>
            {filterBookOnrecommendation.data.allBooks?.map((el) => (
              <tr key={el.title}>
                <td>{el.title}</td>
                <td>{el.author.name}</td>
                <td>{el.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Recommend;
